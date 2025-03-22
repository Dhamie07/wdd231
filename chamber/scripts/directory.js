// Toggle Mobile Navigation
document.getElementById("menu-toggle").addEventListener("click", function () {
    const navMenu = document.getElementById("nav-menu");
    navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
});

// Update Footer Year & Last Modified Date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch & Display Members from JSON
async function fetchMembers() {
    const container = document.getElementById("members-container");

    if (!container) {
        console.error("Error: #members-container not found in HTML.");
        return;
    }

    try {
        console.log("Fetching members...");
        const response = await fetch("data/members.json");

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        console.log("Members data:", members);
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        container.innerHTML = `<p style="color: red;">Failed to load members. Check console for details.</p>`;
    }
}

function displayMembers(members) {
    const container = document.getElementById("members-container");

    container.innerHTML = members.map(member => `
        <div class="member-card">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership Level:</strong> ${member.level}</p>
        </div>
    `).join("");

    console.log("Members displayed successfully.");
}

// Toggle View Mode
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, initializing script...");

    const toggleButton = document.querySelector("#toggle-view");
    const membersContainer = document.querySelector("#members-container");

    if (toggleButton && membersContainer) {
        toggleButton.addEventListener("click", () => {
            membersContainer.classList.toggle("grid-view");
        });
    }

    // Fetch members when page loads
    fetchMembers();
});
