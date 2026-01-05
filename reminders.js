let reminders = [];

const days = [
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
    'monday',
    'tuesday'
]

const addReminder = (date, content) => {
    document.querySelector('#reminder-adder #add-reminder-date').dataset.invalidInput = 'false';
    document.querySelector('#reminder-adder #add-reminder-content').dataset.invalidInput = 'false';
    date = new Date(date);
    if (date == 'Invalid Date') document.querySelector('#reminder-adder #add-reminder-date').dataset.invalidInput = 'true';
    if (!content) document.querySelector('#reminder-adder #add-reminder-content').dataset.invalidInput = 'true';
    if (date != 'Invalid Date' && content) {
        date.setFullYear(new Date().getFullYear());
        reminders.push({date: date, content: content});
        document.querySelector('#reminder-controls #add-reminder').dispatchEvent(new Event('click'));
        saveReminders();
    }
}

const loadReminders = () => {
    if (JSON.parse(localStorage.getItem('reminders'))) reminders = JSON.parse(localStorage.getItem('reminders'));
    document.getElementById('reminders-container').innerHTML = '';

    reminders.forEach((reminder) => {
        const date = new Date(reminder.date).toLocaleDateString(undefined, { day: '2-digit', month: 'long'}).toUpperCase();
        const day = days[new Date(date).getDay()].toUpperCase();
        const content = reminder.content;
        let daysUntilDate = Math.ceil((new Date(reminder.date) - new Date()) / 1000 / 60 / 60 / 24);
        daysUntilDate = daysUntilDate == 0 ? 'TODAY'
        : daysUntilDate == 1 ? `TOMORROW`
        : daysUntilDate == -1 ? `YESTERDAY`
        : daysUntilDate > 0 ? `IN ${daysUntilDate} DAYS`
        : `${Math.abs(daysUntilDate)} DAYS AGO`;

        const dayContainer = document.createElement('span');
        dayContainer.innerHTML = ` -- ${day}`;
        const dateContainer = document.createElement('h1');
        dateContainer.innerHTML = date;
        dateContainer.appendChild(dayContainer);
        const daysUntilDateContainer = document.createElement('h1');
        daysUntilDateContainer.innerHTML = daysUntilDate;
        daysUntilDateContainer.classList += 'days-until-date';
        const contentContainer = document.createElement('p');
        contentContainer.innerHTML = content;
        const reminderContainer = document.createElement('div');
        reminderContainer.classList += 'reminder';
        reminderContainer.appendChild(dateContainer);
        reminderContainer.appendChild(daysUntilDateContainer);
        reminderContainer.appendChild(contentContainer);
        reminderContainer.addEventListener('click', () => {
            if (reminderContainer.dataset.deleting == 'true') {
                removeReminder(reminderContainer);
                removeReminderButton.dispatchEvent(new Event('click'));
                removeReminderButton.dispatchEvent(new Event('click'));
            }
        })
        reminderContainer.addEventListener('mouseenter', () => {
            if (editReminderButton.dataset.selected !== 'true') reminderContainer.classList.add('hovering');
        })
        reminderContainer.addEventListener('mouseleave', () => reminderContainer.classList.remove('hovering'));
        document.getElementById('reminders-container').appendChild(reminderContainer);
    })
    
    changeVisibility();
}
loadReminders();

const saveReminders = () => {
    reminders.sort(function(dateA, dateB) {
        dateA = new Date(dateA.date);
        dateB = new Date(dateB.date);
       return dateA - dateB;
    })
    localStorage.setItem('reminders',JSON.stringify(reminders));
    loadReminders();
}
saveReminders()

const removeReminder = (element) => {
    const reminderElements = [];
    for (let i of document.getElementsByClassName('reminder')) {
        reminderElements.push(i);
    }
    const index = reminderElements.findIndex(function (reminder) {
        return reminder == element;
    })
    if (index != -1) reminders.splice(index, 1);
    saveReminders();
}
