let links = [
    {'title': 'School', 'url': ''},
    {'title': 'LMS', 'url': 'https://nndsb.elearningontario.ca/d2l/home'},
    {'title': 'Edsby', 'url': 'https://nndsb.edsby.com/p/BaseStudent/'},
    {'title': 'NNDSB', 'url': 'https://www.nearnorthschools.ca/'},
    {'title': 'Mail', 'url': 'https://outlook.office.com/mail/'},
    {'title': 'Sign in', 'url': 'https://mynndsb.nearnorthschools.ca/register/user/login/'},
    {'title': 'Translation', 'url': ''},
    {'title': 'WordReference', 'url': 'https://www.wordreference.com/'},
    {'title': 'BonPatron', 'url': 'https://bonpatron.com/en/'},
    {'title': 'Google Translate', 'url': 'https://www.google.com/search?q=Google+Translate'},
    {'title': 'YouTube', 'url': ''},
    {'title': 'Music', 'url': 'https://music.youtube.com/playlist?list=LM/'},
    {'title': 'YouTube', 'url': 'https://www.youtube.com/'},
    {'title': 'Download', 'url': 'https://en1.y2mate.is/'},
    {'title': 'Other', 'url': ''},
    {'title': 'Pixabay', 'url': 'https://pixabay.com/'}
];

const addLink = (title, url) => {
    if (!title) {
        document.querySelector('#link-adder #add-link-title').dataset.invalidInput = 'true';
        return;
    }
    
    if (url && !(url.startsWith("http://") || url.startsWith("https://"))) url = "https://" + url

    links.push({'title': title, 'url': url});
    document.querySelector('#link-controls #add-link').dispatchEvent(new Event('click'));
    saveLinks();
}

const loadLinks = () => {
    if (JSON.parse(localStorage.getItem('links'))) links = JSON.parse(localStorage.getItem('links'));
    document.getElementById('links-container').innerHTML = '';

    links.forEach((item) => {
        const linkContainer = item.url ? document.createElement('a') : document.createElement('h2');
        linkContainer.innerHTML = item.title;
        linkContainer.classList.add('link');
        linkContainer.draggable = false;
        if (item.url) {
            linkContainer.href = item.url;
            linkContainer.target = "_blank";
        }

        linkContainer.addEventListener('click', (event) => {
            if (linkContainer.dataset.deleting == 'true' || linkContainer.draggable) event.preventDefault();

            if (linkContainer.dataset.deleting == 'true') {
                removeLink(linkContainer);
                removeLinkButton.dispatchEvent(new Event('click'));
                removeLinkButton.dispatchEvent(new Event('click'));
            }
        })

        linkContainer.addEventListener('dragstart', (event) => {
            linkContainer.classList.add('dragging');
            event.dataTransfer.effectAllowed = "move";
        });
        
        linkContainer.addEventListener('dragend', () => {
            linkContainer.classList.remove('dragging');
            setTimeout(() => {
                editLinkButton.dispatchEvent(new Event('click'));
                editLinkButton.dispatchEvent(new Event('click'));
            }, 250)
        });

        document.getElementById('links-container').appendChild(linkContainer);
    })
    
    changeVisibility();
}
loadLinks();

const saveLinks = () => {
    localStorage.setItem('links', JSON.stringify(links));
    loadLinks();
}
saveLinks();

const removeLink = (element) => {
    const index = links.findIndex(function (item) {
        return item.title == element.innerHTML && ( item.url == element.href || item.url + '/' == element.href || (!item.url && !element.href) );
    })
    if (index != -1) links.splice(index, 1);
    saveLinks();
}
