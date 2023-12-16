import { } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
 // Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhfyfSB3SY5lraLVu_mi-qmOc3AuDhK6w",
  authDomain: "to-do-list-10ba8.firebaseapp.com",
  projectId: "to-do-list-10ba8",
  storageBucket: "to-do-list-10ba8.appspot.com",
  messagingSenderId: "986353980508",
  appId: "1:986353980508:web:609f258511a6d09c414299"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var addtaskbtn = document.getElementById("addtask");
addtaskbtn.addEventListener("click", addtask);

const inputBox= document.getElementById("input-box");
const listContainer= document.getElementById("list-container");

function addtask()
{
    if(inputBox.value === '')
    {
        alert("Please enter a task");
    }
    else{
        let li= document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span= document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputBox.value = '';
    savedata();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        savedata();

    }
    else if(e.target.tagName === "SPAN")
    {
        let div= e.target.parentNode;
        div.remove();
        savedata(); 
    }
}, false);

function savedata()
{
    //adding to firebase firestore
    let listitems= listContainer.innerHTML;

    addDoc(collection(db, "listitems"), {
        listitems: listitems
    });

    //adding to local storage
    localStorage.setItem("listContainer", listContainer.innerHTML);

}
async function getData()
{
    const querySnapshot = await getDocs(collection(db, "listitems"));
    querySnapshot.forEach(function(doc)
    {
        listContainer.innerHTML= doc.data().listitems;

    })
}

getData();
// function showtasks()
// {
    
//     listContainer.innerHTML= localStorage.getItem("listContainer");
// }
// showtasks();



