const submit = document.querySelector('.addTaskBtn');

function addTask(){
    const taskToAdd = document.querySelector('.newTask').value.trim();
    fetch('/api/v1/tasks/', {
        method:'POST',
        headers:{'Content-Type':'application/json',},
        body:JSON.stringify({name:taskToAdd}),
    });
    taskToAdd.value='';
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});
