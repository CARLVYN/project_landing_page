document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the form and the confirmation message element
    const form = document.getElementById('inquiryForm');
    const confirmationMessage = document.getElementById('confirmationMessage'); 

    // Add a listener for the form submission
    form.addEventListener('submit', function(event) {  
        // Prevent the default form submission behavior (which would reload the page) 
        event.preventDefault();

        // Clear any previous messages
        confirmationMessage.textContent = '';
        confirmationMessage.style.color = 'green'; // Reset to green for success

        // 2. Validate Inputs  
        if (!form.checkValidity()) {
            // Built-in browser validation handles the 'required' attribute,
            // but we can add an extra message for clarity if needed.
            // Note: The browser will typically show error messages on invalid fields.
            confirmationMessage.textContent = 'Please fill out all required fields correctly.';
            confirmationMessage.style.color = 'red';
            return; // Stop execution if validation fails 
        }

        // 3. Collect form data
        const inquiryData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value, 
            timestamp: new Date().toISOString()
        };

        // 4. Generate a random ticket ID
        const ticketId = generateTicketId();  
        inquiryData.ticketId = ticketId;

        // 5. Save inquiry to localStorage
        saveInquiry(inquiryData);

        // 6. Show confirmation with ticket ID
        confirmationMessage.textContent = `✅ Success! Your inquiry has been submitted.
        Your ticket ID is: ${ticketId} Thank You;`
        form.reset();
    });

    /**
     * Generates a random ticket ID in the format TCK-XXXXX.
     * @returns {string} The generated ticket ID.
     */
    function generateTicketId() {
        // Generate a random number up to 99999 and pad with leading zeros
        const min = 0;
        const max = 99999;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Pad the number with leading zeros to ensure it is 5 digits long
        const paddedNum = String(randomNum).padStart(5, '0');
        
        return `GIKACE-${paddedNum}`;
    }

    /**
     * Saves a new inquiry to localStorage under the key 'inquiries'.
     * @param {object} newInquiry - The inquiry data to save.
     */
    function saveInquiry(newInquiry) {
        // Get existing inquiries from localStorage (or an empty array if none exist)
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        
        // Add the new inquiry to the array
        inquiries.push(newInquiry);
        
        // Save the updated array back to localStorage
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the menu icon (your breadcrumbs element)
    const menuIcon = document.querySelector('.breadcrumbs');
    // Get the navigation element
    const navMenu = document.querySelector('nav');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', () => {
            // Toggle the 'active' class on the nav element
            navMenu.classList.toggle('active');

            // Optional: Change the icon from bars to 'x' when active
            const icon = menuIcon.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // 'x' icon
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close the menu when a link is clicked (good practice for single-page sites)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Reset icon
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

