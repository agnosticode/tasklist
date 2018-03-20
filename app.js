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
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter task event
    filter.addEventListener('keyup',filterTasks);
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
    //Clear input
    taskInput.value='';
};

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    if(confirm("Are You Sure?")){
        e.target.parentElement.parentElement.remove();
    }
};

//Clear Tasks
function clearTasks(){
    //taskList.innerHTML='';
    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };
    //https://jsperf.com/innerhtml-vs-removechild
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