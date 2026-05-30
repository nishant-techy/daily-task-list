// import everything necessary from files and official website
import { auth, db } from "./firebase-config.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const userEmailSpan = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("myUL");
const inputBox = document.getElementById("myInput");

let currentUser = null;

// authentication check of mail and password
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    userEmailSpan.textContent = user.email;
    document.getElementById("date").value = getToday();
    loadTasks(getToday());
  } else {
    window.location.href = "index.html"; // if not logged in
  }
});

// make the user logOut from their dashboard
logoutBtn.onclick = async () => {
  await signOut(auth);
  window.location.href = "index.html";
};

// it will check the current date and later show on website
function getToday() {
  return new Date().toISOString().split("T")[0];
}

// loading the task (according to date)
// async function loadTasks(date) {
//   if (!currentUser) return;
//   taskList.innerHTML = "";

//   const ref = doc(db, "users", currentUser.uid, "tasks", date);
//   const snap = await getDoc(ref);

//   if (snap.exists()) {
//     const data = snap.data().items || [];
//     data.forEach((task) => addTask(task.text, task.done));
//   }
// }

// new thing (loading the task according to date but with special case)
// loading the task (according to date)
async function loadTasks(date) {
  if (!currentUser) return;
  taskList.innerHTML = "";

  // Special case for demo user
  if (currentUser.email === "random@gmail.com") {
    const demoTasks = [
      { text: "Go for a run", done: true },
      { text: "Read a book", done: false },
      { text: "Drink 4 litre water", done: false },
      { text: "Practice coding", done: false },
    ];
    demoTasks.forEach((task) => addTask(task.text, task.done));
    return; // stop (don't fetch Firestore)
  }

  // Normal users then it must be load from Firestore
  const ref = doc(db, "users", currentUser.uid, "tasks", date);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data().items || [];
    data.forEach((task) => addTask(task.text, task.done));
  }
}

// saving the task
async function saveTasks(date) {
  if (!currentUser) return;
  const items = [];
  document.querySelectorAll("#myUL li").forEach((li) => {
    items.push({
      text: li.textContent.replace("×", ""),
      done: li.classList.contains("checked"),
    });
  });

  const ref = doc(db, "users", currentUser.uid, "tasks", date);
  await setDoc(ref, { items });
}

// Create a new list item
// function newElement() {
//   let inputValue = document.getElementById("myInput").value.trim();
//   if (inputValue === "") {
//     alert("Please enter a task.");
//     return;
//   }

// new one with date and update with server
window.newElement = async function () {
  let text = inputBox.value.trim();
  if (text === "") {
    alert("Please enter a task.");
    return;
  }
  addTask(text, false);
  inputBox.value = "";
  await saveTasks(document.getElementById("date").value);
};

// add task to container below (myUL list)
function addTask(text, done) {
  let li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("checked");

  // close button
  let span = document.createElement("span");
  span.textContent = "×";
  span.className = "close";
  li.appendChild(span);

  // mark done (line-throguh)
  li.onclick = async () => {
    li.classList.toggle("checked");
    await saveTasks(document.getElementById("date").value);
  };

  // remove
  span.onclick = async (e) => {
    e.stopPropagation(); // don’t trigger li.onclick
    li.remove();
    await saveTasks(document.getElementById("date").value);
  };

  taskList.appendChild(li);
}

// it will load all the tasks of to-do list of that specific date
loadTasksBtn.onclick = () => {
  let date = document.getElementById("date").value;
  loadTasks(date);
};

// pressing enter can also add the tasks
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    newElement();
  }
});

// Get today's date
// const today = new Date();
// Format to YYYY-MM-DD
// const formattedDate = today.toISOString().split("T")[0];
// Set the value of the date input
// document.getElementById("date").value = formattedDate;
