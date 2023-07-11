function changePage(pageNumber) {
    const pages = document.getElementsByClassName('page');

    for(let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    document.getElementById(`page${pageNumber}`).style.display = 'flex';
}