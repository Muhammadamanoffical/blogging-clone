// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGpUwJTr9BpW6TNwax6I2xPnpw1Ccq8Jc",
  authDomain: "mini-heckaton.firebaseapp.com",
  projectId: "mini-heckaton",
  storageBucket: "mini-heckaton.appspot.com",
  messagingSenderId: "859462406669",
  appId: "1:859462406669:web:8c9782ba596d611ac63b44",
  measurementId: "G-STEYGF8W99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

let addblog = document.getElementById("addblog");
let loginlink = document.getElementById("loginlink");
let signlink = document.getElementById("signlink");
let logoutlink = document.getElementById("logoutlink");

function init() {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);

  if (userObj) {
    loginlink.style.display = "none";
    signlink.style.display = "none";
    if (userObj.status === "user") {
      addblog.style.display = "none";
    }
    addblog.className = "text-gray-800 hover:text-gray-600 mx-4";
    logoutlink.className = "text-white mx-4 inline-block bg-blue-500 p-2 rounded";
  }
}
init();

logoutlink.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
      window.location.reload();
      init();
    })
    .catch((err) => {
      alert(err.message);
    });
});

             

async function getProducts() {
  const productContainer = document.getElementById('product-container');
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const productDiv = document.createElement('div');
      productDiv.className = "bg-white shadow-md rounded p-4 mb-4";
      productDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${product.blogName}</h2>
        <p class="text-gray-600 mb-4">${product.blogDescription}</p>
        <a href="#" class="text-blue-500 hover:underline">Read More</a>
      `;
      productContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error getting products:", error);
  }
}

// Call the function to get and display products
getProducts();


