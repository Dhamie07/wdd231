// scripts/explore.js

document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedElement = document.getElementById('lastModified');

    // Functionality for recipe "View Recipe" links (if needed later)
    const recipeLinks = document.querySelectorAll('.view-recipe');
    recipeLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const recipeTitle = link.parentNode.querySelector('h3').textContent;
            // Here you could add logic to display recipe details
            // Perhaps fetch from a recipes.json file or navigate to a dedicated page
            alert(`View recipe for: ${recipeTitle} (Functionality to be implemented)`);
        });
    });

    // Functionality for "Learn More" links in science section (if needed later)
    const learnMoreLinks = document.querySelectorAll('.learn-more');
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const topicTitle = link.parentNode.querySelector('h3').textContent;
            // Here you could add logic to display more science details
            alert(`Learn more about: ${topicTitle} (Functionality to be implemented)`);
        });
    });

    // Display last modified date
    function displayLastModified() {
        const lastModifiedDate = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString('en-US', options)}`;
    }

    // Call the function to display the last modified date
    displayLastModified();
});