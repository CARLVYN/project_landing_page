document.addEventListener('DOMContentLoaded', () => {

    /* ============================
       HERO SLIDESHOW
    ============================ */
    const hera = document.querySelector('.hera');
    const images = [
        './imgs/slide12.jpg',
        './imgs/pic7.jpg',
        './imgs/pic6.jpg',
        './imgs/pic8.jpg',
        './imgs/pic7.jpg',
        './imgs/pic5.jpg',
    ];

    let index = 0;
    hera.style.backgroundImage = `url(${images[index]})`;

    setInterval(() => {
        index = (index + 1) % images.length;
        hera.style.backgroundImage = `url(${images[index]})`;
    }, 3000);


    /* ============================
       FORM VALIDATION
    ============================ */

    const form = document.getElementById('inquiryForm');
    const confirmationMessage = document.getElementById('confirmationMessage'); 

    const nameField = document.getElementById('name');
    const nameError = document.getElementById('nameError');

    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    const subjectField = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');

    const messageField = document.getElementById('message');
    const messageError = document.getElementById('messageError');


    /* ============================
       LIVE NAME VALIDATION
    ============================ */
    nameField.addEventListener('input', function () {
        if (/\d/.test(this.value)) {
            showError(this, nameError, "Name cannot contain numbers.");
        } else if (this.value.trim() === "") {
            showError(this, nameError, "Full Name can't be blank.");
        } else {
            clearError(this, nameError);
        }
    });


    /* ============================
       LIVE EMAIL VALIDATION
    ============================ */
    emailField.addEventListener('input', function () {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validEmail.test(this.value)) {
            showError(this, emailError, "Please enter a valid email address.");
        } else {
            clearError(this, emailError);
        }
    });


    /* ============================
       LIVE PHONE VALIDATION
    ============================ */
    phoneField.addEventListener('input', function () {
        if (!/^\d+$/.test(this.value)) {
            showError(this, phoneError, "Phone must contain only numbers.");
        } else if (this.value.trim() === "") {
            showError(this, phoneError, "Phone Number can't be blank.");
        } else {
            clearError(this, phoneError);
        }
    });


    /* ============================
       LIVE SUBJECT & MESSAGE VALIDATION
    ============================ */
    subjectField.addEventListener('input', () => {
        if (subjectField.value.trim() === "") {
            showError(subjectField, subjectError, "Subject can't be blank.");
        } else {
            clearError(subjectField, subjectError);
        }
    });

    messageField.addEventListener('input', () => {
        if (messageField.value.trim() === "") {
            showError(messageField, messageError, "Message can't be blank.");
        } else {
            clearError(messageField, messageError);
        }
    });


    /* ============================
       FORM SUBMISSION
    ============================ */
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        confirmationMessage.textContent = '';

        let isValid = true;

        // Name validation
        if (nameField.value.trim() === "" || /\d/.test(nameField.value)) {
            showError(nameField, nameError, "Name cannot contain numbers.");
            isValid = false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
            showError(emailField, emailError, "Please enter a valid email address.");
            isValid = false;
        }

        // Phone validation
        if (!/^\d+$/.test(phoneField.value.trim())) {
            showError(phoneField, phoneError, "Phone must contain only numbers.");
            isValid = false;
        }

        // Subject validation
        if (subjectField.value.trim() === "") {
            showError(subjectField, subjectError, "Subject can't be blank.");
            isValid = false;
        }

        // Message validation
        if (messageField.value.trim() === "") {
            showError(messageField, messageError, "Message can't be blank.");
            isValid = false;
        }

        if (!isValid) return;

        // Collect Data
        const inquiryData = {
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value,
            subject: subjectField.value,
            message: messageField.value,
            timestamp: new Date().toISOString(),
            ticketId: generateTicketId()
        };

        saveInquiry(inquiryData);

        confirmationMessage.style.color = 'green';
        confirmationMessage.textContent =
            `Success! Your inquiry has been submitted. Your ticket ID is: ${inquiryData.ticketId}`;

        form.reset();
        document.querySelectorAll('input, textarea')
            .forEach(f => f.classList.remove('input-success'));
    });


    /* ============================
       ERROR HANDLING FUNCTIONS
    ============================ */
    function showError(field, errorElement, message) {
        field.classList.add('input-error', 'shake');
        field.classList.remove('input-success');
        errorElement.textContent = message;

        setTimeout(() => field.classList.remove('shake'), 300);
    }

    function clearError(field, errorElement) {
        field.classList.remove('input-error');
        field.classList.add('input-success');
        errorElement.textContent = "";
    }


    /* ============================
       TICKET ID GENERATOR
    ============================ */
    function generateTicketId() {
        const randomNum = Math.floor(Math.random() * 999999);
        const padded = String(randomNum).padStart(5, '0');
        return `GIKACE-${padded}`;
    }


    /* ============================
       SAVE TO LOCAL STORAGE
    ============================ */
    function saveInquiry(newInquiry) {
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries.push(newInquiry);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    }
});

/* ============================
   MOBILE NAV
============================ */
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.breadcrumbs');
    const navMenu = document.querySelector('nav');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = menuIcon.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

/* ============================
   SCROLL-SPY NAV HIGHLIGHT
============================ */
document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // adjust for fixed header
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => { 
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

});
