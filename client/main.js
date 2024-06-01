document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todoForm');
    const input = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevents the default form submission

        const todoText = input.value.trim(); // Trim whitespace from input

        if (todoText) {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: todoText })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Task added:', result); // Debugging: Check the result object

                    // Create a new task element with the task ID
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('todo-item');
                    todoItem.innerHTML = `<span class="bullet">&#8226;</span> ${todoText}`;
                    todoItem.dataset.id = result._id; // Store the task ID
                    console.log('todoItem.dataset.id:', todoItem.dataset.id); // Debugging: Verify data-id

                    // Create a container for the buttons
                    const buttons = document.createElement('div');
                    buttons.classList.add('buttons-container');

                    // Create and append edit button
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.classList.add('edit-button');
                    buttons.appendChild(editButton);

                    // Create and append delete button
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.classList.add('delete-button');
                    buttons.appendChild(deleteButton);

                    // Append the buttons container and todo item to the toDoBox
                    const toDoBox = document.createElement('div');
                    toDoBox.classList.add('todo-box'); // Add a CSS class for styling
                    toDoBox.style.display = 'flex'; // Set display to flex

                    toDoBox.appendChild(todoItem);
                    toDoBox.appendChild(buttons);
                    todoList.appendChild(toDoBox);

                    // Add event listeners for the edit and delete buttons
                    editButton.addEventListener('click', () => {
                        editTask(todoItem);
                    });

                    deleteButton.addEventListener('click', () => {
                        deleteTask(toDoBox, todoItem);
                    });

                    input.value = ''; // Clear the input
                } else {
                    console.error('Failed to add task:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    async function editTask(todoItem) {
        console.log('Editing task with ID:', todoItem.dataset.id); // Debugging: Verify task ID
        const taskText = todoItem.textContent.trim();
        const newTaskText = prompt('Edit your task:', taskText);

        if (newTaskText !== null && newTaskText.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${todoItem.dataset.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: newTaskText })
                });
                console.log(response);

                if (response.ok) {
                    const updatedTask = await response.json();
                    todoItem.innerHTML = `<span class="bullet">&#8226;</span> ${updatedTask.task}`;
                } else {
                    console.error('Failed to update task:', response.statusText);
                }
            } catch (error) {
                console.error('Error: int the frontend', error);
            }
        }
    }
    // Function to handle deleting a task
    async function deleteTask(toDoBox, todoItem) {
        console.log('Deleting task with ID:', todoItem.dataset.id); // Debugging: Verify task ID
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${todoItem.dataset.id}`, {
                method: 'DELETE',
            });
            console.log(response);
            if (response.ok) {
                toDoBox.remove();
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});



