//Define UI variables
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//Load all Event Listener
LoadEventListeners();

//Load all Event Listener
function LoadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter task event
    filter.addEventListener('keyup',filterTasks);
};

//Get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    };
    tasks.forEach(function(task){
     //Creare li element
        const li=document.createElement('li');
        //Add class
        li.className='collection-item';
        //Create text node and append to the li
        //li.innerText=taskInput.value;
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link=document.createElement('a');
        //Add class
        link.className='delete-item secondary-content';
        //Add icon html
        link.innerHTML='<i class="fa fa-remove"></i>';
        //Append the link to the li
        li.appendChild(link);

        //Append the li to the ul
        taskList.appendChild(li);   
    });
};

//Add Task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a Task');
    }
    //Creare li element
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create text node and append to the li
    //li.innerText=taskInput.value;
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link=document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append the link to the li
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value='';
};

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
};



//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    if(confirm("Are You Sure?")){
        e.target.parentElement.parentElement.remove();

        //Remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
};

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    };
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        };
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

//Clear Tasks
function clearTasks(){
    //taskList.innerHTML='';
    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };
    //https://jsperf.com/innerhtml-vs-removechild

    //Clear from local storage
    localStorage.clear();
};

//Filter tasks***************IMPORTANT
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display="block";
        }else{
            task.style.display="none";
        };
    });
};