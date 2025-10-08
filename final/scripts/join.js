// Handles join form submission and redirects to thank you page

document.getElementById('join-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // You could add validation or save data here if needed
    window.location.href = 'thankyou.html';
});
