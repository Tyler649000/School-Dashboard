const homeworkItems = document.querySelectorAll('.homework');
const homeworkContainer = document.querySelector('#homework-container');

document.addEventListener('dragover', (event) => {
    const draggingElement = homeworkContainer.querySelector('.dragging');
    const siblings = [...homeworkContainer.querySelectorAll('.homework:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return event.clientY + document.getElementById('homework-container').scrollTop <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    homeworkContainer.insertBefore(draggingElement, nextSibling);
    event.preventDefault();
})
