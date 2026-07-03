// --- STATE MANAGEMENT SYSTEM VIA ARRAYS ---
let taskListArray = [
    { id: 1, text: "Build the Interactive JS Quiz application prototype", completed: true },
    { id: 2, text: "Perform code reviews on system validation frameworks", completed: false },
    { id: 3, text: "Review global log topologies regarding the SolarWinds threat profile", completed: false }
];

// --- DOM ELEMENTS REFERENCE NODES ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListContainer = document.getElementById('task-list');

const contactForm = document.getElementById('contact-form');
const successBox = document.getElementById('form-success');

const navLinks = document.querySelectorAll('.nav-links a');

// --- EVENT HANDLERS & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupNavigationTracking();
});

// --- TASK MANAGEMENT ENGINE ---
function renderTasks() {
    taskListContainer.innerHTML = '';
    
    taskListArray.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="task-btn complete-btn" onclick="toggleTask(${task.id})" title="Mark Complete">
                    <i class="fas ${task.completed ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
                </button>
                <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                    <i class="fas fa-trash-can"></i>
                </button>
            </div>
        `;
        taskListContainer.appendChild(li);
    });
}

// Function to Create and Push Tasks
addTaskBtn.addEventListener('click', () => {
    const textVal = taskInput.value.trim();
    if (textVal === '') {
        alert('Please specify an objective milestone metric before insertion.');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: textVal,
        completed: false
    };
    
    taskListArray.push(newTask);
    taskInput.value = '';
    renderTasks();
});

// Allow hitting "Enter" key inside input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
});

// Function to Update Task Completion State
window.toggleTask = function(id) {
    taskListArray = taskListArray.map(task => {
        if(task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
};

// Function to Delete Items Completely
window.deleteTask = function(id) {
    taskListArray = taskListArray.filter(task => task.id !== id);
    renderTasks();
};


// --- SECURE CONTACT VALIDATION MECHANICS ---
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Grab Form Input Elements
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const phoneInput = document.getElementById('user-phone');
    const messageInput = document.getElementById('user-message');

    let isValid = true;

    // Helper validation utility
    function validateField(element, errorElementId, condition) {
        const errorElement = document.getElementById(errorElementId);
        if (condition) {
            errorElement.style.display = 'none';
            element.style.borderColor = '#334155';
        } else {
            errorElement.style.display = 'block';
            element.style.borderColor = '#ef4444';
            isValid = false;
        }
    }

    // 1. Mandatory Field Check
    validateField(nameInput, 'name-error', nameInput.value.trim() !== '');
    validateField(messageInput, 'message-error', messageInput.value.trim() !== '');

    // 2. Email Regular Expression Validation
    const emailRegex = /^[^\s@]+辨[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, 'email-error', emailRegex.test(emailInput.value.trim()));

    // 3. Phone Number Digit Check (No strings allowed)
    const digitsOnlyRegex = /^\d+$/;
    validateField(phoneInput, 'phone-error', digitsOnlyRegex.test(phoneInput.value.trim()));

    // Evaluation Assessment
    if (isValid) {
        successBox.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            successBox.style.display = 'none';
        }, 5000);
    }
});


// --- INTERACTIVE NAVIGATION HIGHLIGHTS ---
function setupNavigationTracking() {
    window.addEventListener('scroll', () => {
        let currentSection = 'home';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}