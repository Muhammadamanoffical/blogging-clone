 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
 import { getAuth,
    createUserWithEmailAndPassword
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { getFirestore,
    collection,
     addDoc
     
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
 const auth = getAuth(app);
 const db = getFirestore(app);


let Username=document.getElementById("Username")
let email=document.getElementById("email")
let password=document.getElementById("password")
let usercollection=collection(db,"users")
window.sign=()=>{
    let obj={
        Username:Username.value,
        email:email.value,
        password:password.value
         
    }
    obj.status="user"
    console.log(obj);
    createUserWithEmailAndPassword(auth,obj.email,obj.password)
    .then(async ()=>{alert('signed in successfully')
     await addDoc(usercollection,obj)
      .then(()=>{alert('save successfully')
        const userObj = JSON.stringify(obj);
        localStorage.setItem("user", userObj);
        window.location.replace("../index.html")
      })
        // 
    })
    .catch((err)=>{console.log(err);
       alert('Error'+err.message)
    })
   
    

}

