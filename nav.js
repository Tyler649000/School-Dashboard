function navTo(navDirection) {
    const remindersPage = document.querySelector('.page#reminders');
    const homeworkPage = document.querySelector('.page#homework');
    const linkPage = document.querySelector('.page#links');
    const currentPage = document.querySelector('.page[data-selected="true"]');
    let newPage;

    if (navDirection === 'next') {
        newPage = (remindersPage === currentPage) ? homeworkPage : (homeworkPage === currentPage) ? linkPage : remindersPage;
    } else {
        newPage = (remindersPage === currentPage) ? linkPage : (linkPage === currentPage) ? homeworkPage : remindersPage;
    }
    newPage.dataset.selected = 'true';
    currentPage.dataset.selected = 'false';
}

// all buttons

const addHomeworkButton = document.querySelector('#homework-controls #add-homework');
const editHomeworkButton = document.querySelector('#homework-controls #edit-homework');
const removeHomeworkButton = document.querySelector('#homework-controls #remove-homework');
const addReminderButton = document.querySelector('#reminder-controls #add-reminder');
const editReminderButton = document.querySelector('#reminder-controls #edit-reminder');
const removeReminderButton = document.querySelector('#reminder-controls #remove-reminder');

function disableAllButtons(buttonClicked) {
    if (buttonClicked != addHomeworkButton && addHomeworkButton.dataset.selected == 'true') addHomeworkButton.dispatchEvent(new Event('click'));
    if (buttonClicked != editHomeworkButton && editHomeworkButton.dataset.selected == 'true') editHomeworkButton.dispatchEvent(new Event('click'));
    if (buttonClicked != removeHomeworkButton && removeHomeworkButton.dataset.selected == 'true') removeHomeworkButton.dispatchEvent(new Event('click'));
    if (buttonClicked != addReminderButton && addReminderButton.dataset.selected == 'true') addReminderButton.dispatchEvent(new Event('click'));
    if (buttonClicked != editReminderButton && editReminderButton.dataset.selected == 'true') editReminderButton.dispatchEvent(new Event('click'));
    if (buttonClicked != removeReminderButton && removeReminderButton.dataset.selected == 'true') removeReminderButton.dispatchEvent(new Event('click'));
}

// reminder buttons

addReminderButton.addEventListener('click', () => {
    disableAllButtons(addReminderButton);

    const reminderAdder = document.querySelector('#reminder-adder');
    if (addReminderButton.dataset.selected == 'true') {
        addReminderButton.dataset.selected = 'false';
        reminderAdder.style.display = 'none';
        document.querySelector('#reminder-adder #add-reminder-date').dataset.invalidInput = 'false';
        document.querySelector('#reminder-adder #add-reminder-content').dataset.invalidInput = 'false';
        document.querySelector('#reminder-adder #add-reminder-date').value = '';
        document.querySelector('#reminder-adder #add-reminder-content').value = '';
    } else {
        addReminderButton.dataset.selected = 'true';
        reminderAdder.style.display = 'grid';
        document.querySelector('#add-reminder-date').focus();
    }
})

editReminderButton.addEventListener('click', () => {
    disableAllButtons(editReminderButton);

    if (editReminderButton.dataset.selected == 'true') {
        editReminderButton.dataset.selected = 'false';
        reminders = [];
        for (const element of document.querySelectorAll('.reminder div, .reminder > p:not(:first-of-type)')) element.remove();
        for (const element of document.getElementsByClassName('reminder')) {
            element.querySelectorAll(':first-child, p').forEach((editableElement) => editableElement.setAttribute('contenteditable', 'false'));
            const date = new Date(element.firstElementChild.innerHTML.split('<span')[0]).setFullYear(new Date().getFullYear());
            reminders.push({date: date, content: element.children[2].innerHTML});
        }
        saveReminders();
    } else {
        editReminderButton.dataset.selected = 'true';
        for (const element of document.getElementsByClassName('reminder')) {
            element.querySelectorAll(':first-child, p').forEach((editableElement) => editableElement.setAttribute('contenteditable', 'true'));
            element.classList.remove('hovering');
        }
    }
})

removeReminderButton.addEventListener('click', () => {
    disableAllButtons(removeReminderButton);

    if (removeReminderButton.dataset.selected == 'true') {
        removeReminderButton.dataset.selected = 'false';
        for (const element of document.getElementsByClassName('reminder')) {element.dataset.deleting = 'false'};
        document.querySelector('#reminder-adder div :first-child').value = '';
        document.querySelector('#reminder-adder div :nth-child(2)').value = '';
    } else {
        removeReminderButton.dataset.selected = 'true';
        for (const element of document.getElementsByClassName('reminder')) {element.dataset.deleting = 'true'};
    }
})

// homework buttons

addHomeworkButton.addEventListener('click', () => {
    disableAllButtons(addHomeworkButton);

    const homeworkAdder = document.querySelector('#homework-adder');
    if (addHomeworkButton.dataset.selected == 'true') {
        addHomeworkButton.dataset.selected = 'false';
        homeworkAdder.style.display = 'none';
        document.querySelector('#homework-adder #add-homework-content').dataset.invalidInput = 'false';
        document.querySelector('#homework-adder div :first-Child').value = '';
        document.querySelector('#homework-adder div #subheading').checked = false;
    } else {
        addHomeworkButton.dataset.selected = 'true';
        homeworkAdder.style.display = 'grid';
        document.querySelector('#add-homework-content').focus();
    }
})

editHomeworkButton.addEventListener('click', () => {
    disableAllButtons(editHomeworkButton);

    if (editHomeworkButton.dataset.selected == 'true') {
        editHomeworkButton.dataset.selected = 'false';
        homework = [];
        for (const element of document.getElementsByClassName('homework')) {
            element.setAttribute('contenteditable', 'false');
            if (element.classList.contains('subheading')) element.firstChild.innerHTML = element.firstChild.innerHTML.toUpperCase();
            homework.push({'content': element.firstElementChild.innerHTML, 'subheading': element.classList.contains('subheading')});
        }
        saveHomework();
    } else {
        editHomeworkButton.dataset.selected = 'true';
        for (const element of document.getElementsByClassName('homework')) {
            element.setAttribute('contenteditable', 'true');
        }
    }
})

removeHomeworkButton.addEventListener('click', () => {
    disableAllButtons(removeHomeworkButton);

    if (removeHomeworkButton.dataset.selected == 'true') {
        removeHomeworkButton.dataset.selected = 'false';
        for (const element of document.getElementsByClassName('homework')) {element.dataset.deleting = 'false'};
    } else {
        removeHomeworkButton.dataset.selected = 'true';
        for (const element of document.getElementsByClassName('homework')) {element.dataset.deleting = 'true'};
    }
})