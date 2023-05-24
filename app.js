const bookmarkBtn = document.querySelector('#bookmark-btn');

bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.classList.toggle('bookmarked');
})