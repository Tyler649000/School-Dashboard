const homeworkItems = document.querySelectorAll('.homework');
const homeworkContainer = document.querySelector('#homework-container');

homeworkContainer.addEventListener('dragover', (event) => {
    const draggingElement = homeworkContainer.querySelector('.dragging');
    const siblings = [...homeworkContainer.querySelectorAll('.homework:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return event.clientY + document.getElementById('homework-container').scrollTop <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    homeworkContainer.insertBefore(draggingElement, nextSibling);
    event.preventDefault();
})

const linkItems = document.querySelectorAll('.link');
const linksContainer = document.querySelector('#links-container');

linksContainer.addEventListener('dragover', (event) => {
    const draggingElement = linksContainer.querySelector('.dragging');
    const siblings = [...linksContainer.querySelectorAll('.link:not(.dragging)')];
    const nextSibling = siblings.find(sibling => {
        return event.clientY + document.getElementById('links-container').scrollTop <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    linksContainer.insertBefore(draggingElement, nextSibling);
    event.preventDefault();
})