
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 
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


const input = document.getElementById('input');
const list_cont = document.getElementById('list-cont');
const addbutton = document.getElementById('add').addEventListener('click', addtask);


function applyFadeInAnimation() {
    var bodyElement = document.body;
    bodyElement.style.animation = "fadeInUpAnimation ease 1s";
    bodyElement.style.animationIterationCount = "1";
    bodyElement.style.animationFillMode = "forwards";
}
window.onload = applyFadeInAnimation;
list_cont.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        var editButton = e.target.nextElementSibling.querySelector(".editbtn");
        editButton.disabled = e.target.classList.contains("checked");
    }
}, false);

async function addtask() {
    if (input.value === '') {
        alert("Please enter a task");
    }
    else {
        var todoObj={todo:input.value};
        var docRef=await addDoc(collection(db,"todos"),todoObj);
        var UI=createdata(input.value,docRef.id);
        list_cont.innerHTML+=UI;
        console.log(docRef.id);
    }
    input.value = "";
}
window.addEventListener("load", pageLoad);

async function pageLoad() {
    list_cont.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        var UI = createdata(doc.data().todo, doc.id);
        list_cont.innerHTML += UI;
    });
    applyFadeInAnimation();
}


function createdata(inputvalue, id) {
    var listui = `
    <ul id="list-cont">
    <span id="list-inner">
       <li class="flip-card__input-task list-item">${inputvalue}</li>
       <span class="bts-s">
          <button class="editbtn" id='${id}' onclick="editbtn(this)"><i
                class="fa-solid fa-pen"></i></button>
          <button class="dltbtn" id='${id}' onclick="dltbtn(this)"><i class="fa-solid fa-square-xmark"></i></i></button>
       </span>
    </span>
 </ul>`;
    return listui;
}



async function dltbtn(e) {
    var id = e.id;
    await deleteDoc(doc(db, "todos", id));
    e.parentNode.parentNode.parentNode.remove();
    pageLoad();
}
window.dltbtn = dltbtn;

async function editbtn(e) {
        // var id = e.id;
    // var editInput = document.createElement("input");
    // editInput.type = "text";
    // editInput.value = e.parentNode.parentNode.firstChild.nodeValue;
    // e.parentNode.parentNode.firstChild.replaceWith(editInput);
    
    // var saveButton = document.createElement("button");
    // saveButton.innerHTML = "Save";
    // saveButton.onclick = async function() {
    //     var editValue = editInput.value;
    //     var todoObj = { todo: editValue };
    //     await updateDoc(doc(db, "todos", id), todoObj);
    //     pageLoad();
    // };
    
    // e.parentNode.replaceWith(saveButton);
    var id = e.id;
    var editvalue = prompt("Enter your edit", e.parentNode.parentNode.firstChild.nodeValue);
    var todoObj={todo:editvalue};
    await updateDoc(doc(db, "todos", id),todoObj);
    pageLoad();
}
window.editbtn = editbtn;
