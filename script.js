import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const signupBtn = document.querySelector("#signupBtn");
const loginBtn = document.querySelector("#loginBtn");
const demoBtn = document.querySelector("#demoBtn");

const signupPopup = document.querySelector("#signupPopup");
const loginPopup = document.querySelector("#loginPopup");
const closeBtns = document.querySelectorAll(".close_pop_up");

// Open/Close Popups
signupBtn.onclick = () => openPopup(signupPopup);
loginBtn.onclick = () => openPopup(loginPopup);

document.querySelector("#openLoginFromSignup").onclick = () => {
  closePopup(signupPopup);
  openPopup(loginPopup);
};

document.querySelector("#openSignupFromLogin").onclick = () => {
  closePopup(loginPopup);
  openPopup(signupPopup);
};

closeBtns.forEach((btn) => {
  btn.onclick = () => {
    closePopup(signupPopup);
    closePopup(loginPopup);
  };
});

function openPopup(popup) {
  popup.style.display = "block";
}
function closePopup(popup) {
  popup.style.display = "none";
}

// 🔹 SIGNUP
document.querySelector("#doSignup").onclick = async () => {
  const email = document.querySelector("#signupEmail").value;
  const password = document.querySelector("#signupPassword").value;

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Signed up:", userCred.user.uid);

    // Create empty task list for new user
    await setDoc(doc(db, "users", userCred.user.uid), { tasks: [] });

    alert("Sign-up successful! Redirecting...");
    window.location.href = "to-do-list.html";
  } catch (err) {
    alert(err.message);
  }
};

// 🔹 LOGIN
document.querySelector("#doLogin").onclick = async () => {
  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCred.user.uid);

    window.location.href = "to-do-list.html";
  } catch (err) {
    alert(err.message);
  }
};

// 🔹 DEMO
demoBtn.onclick = async () => {
  const demoEmail = "random@gmail.com";
  const demoPassword = "random@gmail.com";

  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      demoEmail,
      demoPassword
    );
    console.log("Demo login success:", userCred.user.uid);

    window.location.href = "to-do-list.html";
  } catch (err) {
    alert("Demo account not found. Please create it first in Firebase Auth.");
  }
};
