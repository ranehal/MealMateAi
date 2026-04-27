document.addEventListener('keydown', function(event) {
    const pages = [
        'index.html',
        '1.html',
        '2.html',
        '2.1.html',
        '3.html',
        '4.html',
        '5.html',
        '6.html',
        '7.html',
        '7.1.html',
        '7.3.html',
        '7.4.html',
        '8.html',
        '9.html',
        '10.html',
        '11.html',
        '12.html',
        '13.html',
        '14.html',
        '15.html',
        '16.html',
        '17.html',
        '18.html',
        '19.html',
        '20.html',
        '25.html'
    ];
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
    
    let currentIndex = pages.indexOf(currentPage);
    
    if (currentIndex === -1) {
        // Try to match partial or handle cases where index.html is implicit
        currentIndex = 0;
    }

    if (event.key === 'ArrowRight' || event.key === ' ') {
        if (currentIndex < pages.length - 1) {
            window.location.href = pages[currentIndex + 1];
        }
    } else if (event.key === 'ArrowLeft') {
        if (currentIndex > 0) {
            window.location.href = pages[currentIndex - 1];
        }
    }
});
