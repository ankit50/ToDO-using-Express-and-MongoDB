import { addSingleTaskToHTMLList } from "./function.js";

const submit = document.querySelector('.addTaskBtn');
async function addTask() {
    const taskToAdd = document.querySelector('.newTask').value.trim();
    if (!taskToAdd) {
        alert("Task Cannot be Empty!");
        return;
    }
    await fetch('/api/v1/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ name: taskToAdd }),
    })
        .then(async response => {
            if (response.status === 201) {
                const data = await response.json();
                addSingleTaskToHTMLList(data.newTask);
            } else {
                alert("Could not add the task!");
            }
        })
        .catch((error) => { alert("Could not add the task!") });
}
window.onload = async () => {
    try {
        const response = await fetch('/api/v1/tasks', {
            method: 'GET'
        });
        const allTask = await response.json();
        allTask.allTasks.forEach(element => {
            addSingleTaskToHTMLList(element);
        });
    } catch (error) {
        alert('Error loading the tasks........');
    }
}
// document.body.addEventListener('click', (e) => {
//     if(e.target.classList.contains('fa-trash')){
//         console.log('delte clicked...');
//     }
// });
submit.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});
