import { signIrWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
const auth = getAuth();
console.log(auth);
const provider = new GoogleAuthProvider();
const btnLogin = document.querySelector(".login");
btnLogin.addEventListener("click", async function (e) {
  await signIrWithPopup(auth, provider);
});
auth.onAuthstateChanged((data) => {
  if (data && data.uid) {
    console.log(data);
    window.location.href = "/";
  }
});
