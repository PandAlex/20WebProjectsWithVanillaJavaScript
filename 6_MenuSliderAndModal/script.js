/* DOM Elements */
const btnToggle = document.getElementById('toggle');
const btnClose = document.getElementById('close');
const btnOpen = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle nav
btnToggle.addEventListener('click', _ => {
    document.body.classList.toggle('show-nav');
});

// Show modal
btnOpen.addEventListener('click', _ => modal.classList.add('show-modal'));

// Hide Modal
btnClose.addEventListener('click', _ => modal.classList.remove('show-modal'));

// Hide Modal on outside click
window.addEventListener('click', event => event.target === modal ? modal.classList.remove('show-modal') : false);