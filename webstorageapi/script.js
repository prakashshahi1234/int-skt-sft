document.addEventListener("DOMContentLoaded", function () {
    // Load preferences from localStorage
    const savedName = localStorage.getItem("name");
    const savedTheme = localStorage.getItem("theme");

    // Load session message from sessionStorage
    const sessionMessage = sessionStorage.getItem("sessionMessage");

    // Load user information from cookies
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        acc[name] = value;
        return acc;
    }, {});

    // Apply saved preferences
    if (savedName) {
        document.getElementById("username").textContent = savedName;
        document.getElementById("name").value = savedName;
    }

    if (savedTheme) {
        document.getElementById("theme").textContent = savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1);
        document.body.classList.toggle('dark', savedTheme === 'dark');
        document.getElementById("theme-select").value = savedTheme;
    }

    if (sessionMessage) {
        alert(`Session Message: ${sessionMessage}`);
        document.getElementById("session-message").value = sessionMessage;
    }

    // Form submission handler
    document.getElementById("preferences-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const theme = document.getElementById("theme-select").value;
        const sessionMsg = document.getElementById("session-message").value;

        // Save preferences in localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("theme", theme);

        // Save session-specific message in sessionStorage
        sessionStorage.setItem("sessionMessage", sessionMsg);

        // Save name in a cookie
        document.cookie = `username=${name};path=/;max-age=86400`; // 1-day expiration

        // Update UI
        document.getElementById("username").textContent = name;
        document.getElementById("theme").textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        document.body.classList.toggle('dark', theme === 'dark');

        alert("Preferences saved!");
    });
});
