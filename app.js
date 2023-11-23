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
    localStorage.setItem("listContainer", listContainer.innerHTML);
}
function showtasks()
{
    listContainer.innerHTML= localStorage.getItem("listContainer");
}
showtasks();