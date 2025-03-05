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
    checkBox.onclick = () => {
        changeStatusFromHTMLList(task._id);
    }
    editIcon.onclick = () => {
        editTaskFromHTMLList(task._id);
    }
}
async function deleteTaskFromHTMLList(id) {
    const taskId = document.querySelector(`[data-id="${id}"]`);
    const response = await fetch(`/api/v1/tasks/${id}`, {
        method: 'DELETE',
    });
    taskId.remove();
}
async function changeStatusFromHTMLList(id) {
    const taskId = document.querySelector(`[data-id="${id}"]`);
    const checkBox = taskId.querySelector("input[type='checkbox'");
    const para = taskId.querySelector("p");
    try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ completed: checkBox.checked }),
        });
        if (checkBox.checked) {
            para.style.textDecoration = 'line-through';
            para.style.textDecorationColor = 'red';
            para.style.textDecorationThickness = '3px';
        } else {
            para.style.textDecoration = 'none';
        }
    } catch (error) {
        alert(error);
    }
}

async function editTaskFromHTMLList(id) {
    const taskId = document.querySelector(`[data-id="${id}"]`);
    const para = taskId.querySelector("p");
    const checkBox = taskId.querySelector("input[type='checkbox'");
    const dialog = document.createElement('dialog');
    dialog.setAttribute('id', 'dialog');
    dialog.innerHTML = `
        <p>Edit Task</p>
        <input type="text" id="dynamicInput" value="${para.textContent}">
        <input type="checkbox" id="check">
        <button id="saveBtn">Save</button>
        <button id="closeBtn">Cancel</button>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
    const save = document.getElementById('saveBtn');
    const check = document.getElementById('check');
    document.getElementById('closeBtn').addEventListener('click', () => {
        dialog.remove();
    });
    save.addEventListener('click', async (e)=>{
        const newTask = document.getElementById('dynamicInput').value.trim();
        try {
            const response = await fetch(`/api/v1/tasks/${id}`, {
             method: 'PATCH',
             headers: { 'Content-Type': 'application/json', },
             body: JSON.stringify({ name:newTask, completed: check.checked }),
            });
            const data = await response.json();
            console.log(data);

        } catch (error) {
            alert(error);
        }
        if(check.checked){
            checkBox.checked=true;
            para.style.textDecoration = 'line-through';
            para.style.textDecorationColor = 'red';
            para.style.textDecorationThickness = '3px';
        } else {
            checkBox.checked=false;
            para.style.textDecoration = 'none';
        }
        para.textContent=newTask;
        dialog.remove();
    });
}
