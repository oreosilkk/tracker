let sidebarTimeout;

function toggleSlider() {
    const slider = document.getElementById("slider-bar");
    const menuIcon = document.querySelector(".menu-icon");
    const trackers = document.querySelector(".trackers");

    // Toggle sidebar open/close
    slider.classList.toggle("open");
    menuIcon.classList.toggle("active");

    if (slider.classList.contains("open")) {
        trackers.style.marginLeft = "250px"; // Push content to right
        trackers.style.maxWidth = "calc(100% - 250px)"; // Adjust width dynamically
    } else {
        trackers.style.marginLeft = "0"; // Reset trackers position
        trackers.style.maxWidth = "100%"; // Ensure it returns to full width
    }
}


    //  // Toggle sidebar open/close
    //  if (sidebar.classList.contains("open")) {
    //     sidebar.classList.remove("open");
    //     trackers.style.marginLeft = "0"; // Reset trackers position
    // } else {
    //     sidebar.classList.add("open");
    //     trackers.style.marginLeft = "250px"; // Move trackers when sidebar is open
    // }



document.getElementById("slider-bar").addEventListener("mouseleave", function () {
    closeSidebar();
});

function resetSidebarTimer() {
    clearTimeout(sidebarTimeout);
    sidebarTimeout = setTimeout(closeSidebar, 10000);
}

function closeSidebar() {
    const slider = document.getElementById("slider-bar");
    const menuIcon = document.querySelector(".menu-icon");
    const trackers = document.querySelector(".trackers");

    slider.classList.remove("open");
    menuIcon.classList.remove("active");

      // Ensure the tracker boxes go back to full width when sidebar closes
      setTimeout(() => {
        trackers.style.marginLeft = "0"; // Reset position when sidebar closes
        trackers.style.maxWidth = "100%"; 
    }, 30); // Small delay for smooth transition
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const dateTime = document.getElementById("date-time");
    dateTime.textContent = now.toLocaleString();
}

// Update Date and Time Every Second
setInterval(updateDateTime, 1000);
updateDateTime();

let timeoutId; // Variable to track the timeout

// Function to show options and hide main circle
function showOptions() {
    const bottomCircle = document.getElementById("bottom-circle");
    const options = document.getElementById("options");

    bottomCircle.style.display = "none"; // Hide main circle
    options.style.display = "flex"; // Show options

    // Clear any previous timeout
    clearTimeout(timeoutId);

    // Set a timeout to reset after 10 seconds
    timeoutId = setTimeout(resetOptions, 10000);
}

// Function to reset to original position
function resetOptions() {
    const bottomCircle = document.getElementById("bottom-circle");
    const options = document.getElementById("options");

    bottomCircle.style.display = "flex"; // Show main circle
    options.style.display = "none"; // Hide options
}

// Add event listeners for hover effect
document.getElementById("bottom-circle").addEventListener("mouseenter", showOptions);
document.getElementById("options").addEventListener("mouseleave", resetOptions);
document.getElementById("slider-bar").addEventListener("mouseleave", function () {
    closeSidebar();
});

// Event listener for menu button
document.getElementById("menu-toggle").addEventListener("click", toggleSlider);

document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const sliderBar = document.getElementById("slider-bar");
    const trackers = document.querySelector(".trackers");

    function toggleSlider() {
        const isOpen = sliderBar.classList.toggle("open"); // Toggle 'open' class
        menuIcon.classList.toggle("active", isOpen);

        if (isOpen) {
            trackers.style.marginLeft = "260px"; // Adjust spacing when sidebar opens
        } else {
            trackers.style.marginLeft = "0"; // Reset when sidebar closes
        }
    }
    menuIcon.addEventListener("click", toggleSlider);
});
// Function to reset sidebar timer (prevents closing too soon)
function resetSidebarTimer() {
    clearTimeout(sidebarTimeout);
    sidebarTimeout = setTimeout(closeSidebar, 5000); // Auto-close after 5 sec of inactivity
}


/////////////

// document.addEventListener("DOMContentLoaded", function () {
//     // Check if the user is logged in
//     if (window.location.pathname.includes("dashboard.html") && !localStorage.getItem("loggedInUser")) {
//         window.location.href = "login.html"; // Redirect if not logged in
//     }

    // // Login functionality
    // const loginForm = document.getElementById("login-form");
    // if (loginForm) {
    //     loginForm.addEventListener("submit", function (e) {
    //         e.preventDefault();
    //         const username = document.getElementById("username").value;
    //         const password = document.getElementById("password").value;
    //         const errorMessage = document.getElementById("error-message");

    //         // Dummy credentials (replace with backend authentication later)
    //         if (username === "user" && password === "1234") {
    //             localStorage.setItem("loggedInUser", username); // Store user session
    //             window.location.href = "dashboard.html"; // Redirect to dashboard
    //         } else {
    //             errorMessage.style.display = "block"; // Show error message
    //         }
    //     });
    // }

    // document.addEventListener("DOMContentLoaded", function () {
    //     // Check if the user is logged in
    //     if (window.location.pathname.includes("dashboard.html") && !localStorage.getItem("loggedInUser")) {
    //         window.location.href = "login.html"; // Redirect if not logged in
    //     }
    
    //     // Login functionality
    //     const loginForm = document.getElementById("login-form");
    //     if (loginForm) {
    //         loginForm.addEventListener("submit", function (e) {
    //             e.preventDefault();
    //             const username = document.getElementById("username").value;
    //             const password = document.getElementById("password").value;
    //             const errorMessage = document.getElementById("error-message");
    
    //             // Dummy credentials (replace with backend authentication later)
    //             if (username === "user" && password === "1234") {
    //                 localStorage.setItem("loggedInUser", username); // Store user session
    //                 window.location.href = "dashboard.html"; // Redirect to dashboard
    //             } else {
    //                 errorMessage.style.display = "block"; // Show error message
    //             }
    //         });
    //     }
    
    //     // **Fixed Logout Functionality**
    //     setTimeout(() => {
    //         const logoutButton = document.getElementById("logout");
    //         if (logoutButton) {
    //             logoutButton.addEventListener("click", function (e) {
    //                 e.preventDefault(); // Prevents default redirection
    //                 localStorage.removeItem("loggedInUser");
    //                 window.location.href = "{{ url_for('login') }}"; // Redirect to Flask login
    //             });
    //         }
    //     }, 500); // Small delay to ensure the button exists in the DOM
    // });
    






