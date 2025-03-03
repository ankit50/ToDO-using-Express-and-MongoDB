export function addSingleTaskToHTMLList(task) {
    const singleTask = document.createElement('div');
    singleTask.classList.add('singleTask');
    singleTask.dataset.id = task._id;
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkBox');
    checkBox.checked = task.completed;
    const para = document.createElement('p');
    para.textContent = task.name;
    if (task.completed === true) {
        para.style.textDecoration = 'line-through';
        para.style.textDecorationColor = 'red';
        para.style.textDecorationThickness = '3px';
    }
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('iconContainer');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);
    singleTask.appendChild(checkBox);
    singleTask.appendChild(para);
    singleTask.appendChild(iconContainer);
    document.body.appendChild(singleTask);
    deleteIcon.onclick = () => {
        deleteTaskFromHTMLList(task._id);
    }
    // editIcon.onclick = () => {
    //     editTaskFromHTMLList(task._id);
    // }
}
async function deleteTaskFromHTMLList(id) {
        const taskId = document.querySelector(`[data-id="${id}"]`);
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method:'DELETE',
        });
        taskId.remove();

}
