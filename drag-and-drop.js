const homeworkItems = document.querySelectorAll('.homework');
const homeworkContainer = document.querySelector('#homework-container');

document.addEventListener('dragover', (event) => {
    console.log(document.getElementById('homework-container').scrollHeight);
    const draggingElement = homeworkContainer.querySelector('.dragging');
    const siblings = [...homeworkContainer.querySelectorAll('.homework:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    homeworkContainer.insertBefore(draggingElement, nextSibling);
    event.preventDefault();
})