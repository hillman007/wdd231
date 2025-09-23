// chamber/scripts/join.js
// Modal and card animation support for join.html


document.addEventListener('DOMContentLoaded', function () {
    // Animate membership cards on load (opacity, transform, color, margin)
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, i) => {
        card.classList.remove('animated');
        setTimeout(() => {
            card.classList.add('animated');
        }, 200 + i * 180);
    });


    // Modal open/close logic
    const modalLinks = document.querySelectorAll('.modal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    modalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                // Focus first focusable element in modal for accessibility
                setTimeout(() => {
                    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    if (focusable) focusable.focus();
                    else modal.focus();
                }, 50);
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
        // Trap focus inside modal
        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    });

    // Set timestamp hidden field
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        const now = new Date();
        timestamp.value = now.toISOString();
    }
});
