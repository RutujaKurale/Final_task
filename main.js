// add new task
document.getElementById("new").onclick = function () {
    document.getElementById("popup_add").style.display = "block";
  }
  
document.getElementById("closePopup").onclick = function(){
    document.getElementById("popup_add").style.display = "none";
}

// edit task
document.getElementById("edit").onclick = function(){
    document.getElementById("popup_add").style.display = "block";
}
    
document.getElementById("closePopup").onclick = function(){
      document.getElementById("popup_add").style.display = "none";
}

// cancel task 
document.getElementById("cancel_btn").onclick = function(){
      document.getElementById("popup_add").style.display = "none";
}

// add sub task
document.getElementById("subtask").onclick = function(){
    document.getElementById("popup_add").style.display = "block";
  }
  
document.getElementById("closePopup").onclick = function(){
    document.getElementById("popup_add").style.display = "none";
}

let form = document.getElementById("new_form");
let idInput = document.getElementById("idInput");
let textInput = document.getElementById("textInput");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let statusMsg = document.getElementById("status")
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");
let tasks = document.getElementById("posts");
let add = document.getElementById("add_btn");
let taskData = [{}];
taskData.length = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});


let formValidation = () => {
  console.log(idInput.value);
  if (idInput.value === "") {
    msg1.innerHTML = "*Id can't be empty!"
  }
  if (textInput.value === "") {
    msg2.innerHTML = "Task cannot be blank";
  }
  else if (taskData.includes(idInput.value)) {
    msg1.innerHTML = "Id is not available, try another.";
  }
  else {
    msg1.innerHTML = "";
    msg2.innerHTML = "";
    acceptData();
    add.click();
  };
  
}
function checkDuplicateId() {
  const userId = idInput.value.trim();
  if (userId !== '' && !taskData.includes(userId)) {
    acceptData();
  }
  else {
    msg1.innerHTML = "Id is not available, try another.";
  }
}

  let acceptData = () => {
    taskData.push({
      id: idInput.value,
      text: textInput.value,
      startingDate: startDate.value,
      endingDate: endDate.value,
      status: statusMsg.value,
    });

    createTasks();
  };

  let createTasks = () => {
    tasks.innerHTML = ""
    taskData.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
          <p>${x.id}</p>
          <p>${x.text}</p>
          <span>${x.startingDate}</span>
          <span>${x.endingDate}</span>
          <span id="status">${x.status}</span>
          <button id="subtask" onclick="addSubTask()">Add Subtask</button>
          <span class="options">
              <i id="edit" onClick="editTask(this)" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
      </div>`
      );
      console.log(taskData);
    });
  
    resetForm();
  };

  
  let resetForm = () => {
    idInput.value = "";
    textInput.value = "";
    startDate.value = "";
    endDate.value = "";
    statusMsg.value = "In Progress";
  };


  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    taskData.splice(e.parentElement.parentElement.id, 1);
    console.log(taskData);
  
  };

let editTask = (e) => {
    document.getElementById("popup_add").style.display = "block";
    
    document.getElementById("closePopup").onclick = function(){
      document.getElementById("popup_add").style.display = "none";
    }
    let selectedTask = e.parentElement.parentElement;

    idInput.value = selectedTask.children[0].innerHTML;
    textInput.value = selectedTask.children[1].innerHTML;
    startDate.value = selectedTask.children[2].innerHTML;
    endDate.value = selectedTask.children[3].innerHTML;
  statusMsg.value = selectedTask.children[4].innerHTML;
  
    deleteTask(e);
  };


  (() => {
    console.log(taskData);
    createTasks();
  })();

  