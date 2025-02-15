const submit = document.querySelector('.addTaskBtn');
function addTask(){
    const taskToAdd = document.querySelector('.newTask').value.trim();
    console.log(taskToAdd);
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});
