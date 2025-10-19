let homework = [];
const addHomework = (content, subheading) => {
    if (!content) {
        document.querySelector('#homework-adder #add-homework-content').dataset.invalidInput = 'true';
        return;
    }
    if (subheading) content = content.toUpperCase();
    homework.push({'content': content, 'subheading': subheading});
    document.querySelector('#homework-controls #add-homework').dispatchEvent(new Event('click'));
    saveHomework();
}

const loadHomework = () => {
    if (JSON.parse(localStorage.getItem('homework'))) homework = JSON.parse(localStorage.getItem('homework'));
    document.getElementById('homework-container').innerHTML = '';

    homework.forEach((item) => {
        content = item.content;
        const homeworkContent = document.createElement('p');
        homeworkContent.innerHTML = content;
        const homeworkContainer = document.createElement('span');
        homeworkContainer.classList.add('homework');
        homeworkContainer.appendChild(homeworkContent);
        
        homeworkContainer.addEventListener('click', () => {
            if (homeworkContainer.dataset.deleting == 'true') {
                removeHomework(homeworkContainer);
                removeHomeworkButton.dispatchEvent(new Event('click'));
                removeHomeworkButton.dispatchEvent(new Event('click'));
            }
        })

        homeworkContainer.addEventListener('dragstart', (event) => {
            homeworkContainer.classList.add('dragging');
            event.dataTransfer.effectAllowed = "move";
        });

        homeworkContainer.addEventListener('dragend', () => {
            homeworkContainer.classList.remove('dragging');
            setTimeout(() => {
                editHomeworkButton.dispatchEvent(new Event('click'));
                editHomeworkButton.dispatchEvent(new Event('click'));
            }, 250)
        });

        homeworkContainer.draggable = 'true';
        if (item.subheading) homeworkContainer.classList.add('subheading');
        document.getElementById('homework-container').appendChild(homeworkContainer);
    })

    document.getElementById('accent-color').dispatchEvent(new Event('input'));
    changeVisibility();
}
loadHomework();

const saveHomework = () => {
    localStorage.setItem('homework',JSON.stringify(homework));
    loadHomework();
}
saveHomework();

const removeHomework = (element) => {
    const index = homework.findIndex(function (item) {
        return item.content == element.firstElementChild.innerHTML && item.subheading == element.classList.contains('subheading');
    })
    if (index != -1) homework.splice(index, 1);
    saveHomework();
}
