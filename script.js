document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark/Light Mode Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Dynamic Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Interactive Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages and states
        clearErrors();

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'nameError', 'Please enter your name.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'emailError', 'Please enter your email address.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'emailError', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'messageError', 'Please write a message.');
            isValid = false;
        }

        // If form is valid, simulate successful submission
        if (isValid) {
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });

    function showError(inputElement, errorElementId, message) {
        inputElement.classList.add('error');
        const errorElement = document.getElementById(errorElementId);
        errorElement.textContent = message;
    }

    function clearErrors() {
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        formSuccess.classList.add('hidden');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});