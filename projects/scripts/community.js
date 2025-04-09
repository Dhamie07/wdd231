document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedElement = document.getElementById('lastModified');
    const favoriteChocolateForm = document.getElementById('favoriteChocolateForm');
    const favoritesList = document.getElementById('favoritesList');
    const chocolatePollForm = document.getElementById('chocolatePollForm');
    const pollResultsDiv = document.getElementById('pollResults');
    const resultsList = document.getElementById('resultsList');
    const otherOptionInput = document.getElementById('other-text');
    const blogPostsContainer = document.getElementById('blogPosts');

    let userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    let pollVotes = JSON.parse(localStorage.getItem('pollVotes')) || {};

    // Function to display user favorites
    function renderFavorites() {
        favoritesList.innerHTML = '';
        userFavorites.forEach(fav => {
            const listItem = document.createElement('li');
            listItem.textContent = `${fav.name}: ${fav.brand}`;
            favoritesList.appendChild(listItem);
        });
    }

    // Event listener for submitting favorite chocolate
    favoriteChocolateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const brandInput = document.getElementById('brand');
        const name = nameInput.value.trim();
        const brand = brandInput.value.trim();

        if (name && brand) {
            userFavorites.push({ name, brand });
            localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
            renderFavorites();
            nameInput.value = '';
            brandInput.value = '';
        }
    });

    // Render initial favorites
    renderFavorites();

    // Event listener for the "Other" poll option
    const otherRadio = document.getElementById('other');
    otherRadio.addEventListener('change', () => {
        otherOptionInput.style.display = otherRadio.checked ? 'inline-block' : 'none';
        if (!otherRadio.checked) {
            otherOptionInput.value = '';
        }
    });
    otherOptionInput.style.display = otherRadio.checked ? 'inline-block' : 'none'; // Initially hidden

    // Event listener for submitting poll vote
    chocolatePollForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="favoriteType"]:checked');
        let voteValue = '';

        if (selectedOption) {
            voteValue = selectedOption.value === 'other' ? document.getElementById('other-text').value.trim() : selectedOption.value;

            if (voteValue) {
                pollVotes[voteValue] = (pollVotes[voteValue] || 0) + 1;
                localStorage.setItem('pollVotes', JSON.stringify(pollVotes));
                renderPollResults();
                chocolatePollForm.reset();
                otherOptionInput.style.display = 'none';
                pollResultsDiv.classList.remove('hidden');
            } else if (selectedOption.value === 'other' && !document.getElementById('other-text').value.trim()) {
                alert('Please specify your favorite type of chocolate.');
            }
        } else {
            alert('Please select your favorite type of chocolate.');
        }
    });

    // Function to render poll results
    function renderPollResults() {
        resultsList.innerHTML = '';
        const sortedVotes = Object.entries(pollVotes).sort(([, a], [, b]) => b - a);
        sortedVotes.forEach(([option, count]) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${option}: ${count} votes`;
            resultsList.appendChild(listItem);
        });
    }

    // Render initial poll results if there are any votes
    if (Object.keys(pollVotes).length > 0) {
        renderPollResults();
        pollResultsDiv.classList.remove('hidden');
    }

    // Function to fetch and display blog posts
    async function loadBlogPosts() {
        try {
            const response = await fetch('data/blog.json');
            const blogData = await response.json();

            blogPostsContainer.innerHTML = ''; // Clear loading message

            if (blogData && blogData.length > 0) {
                blogData.forEach(post => {
                    const article = document.createElement('article');
                    article.classList.add('blog-post');
                    article.innerHTML = `
                        <h3>${post.title}</h3>
                        <p class="date">${post.date}</p>
                        <p>${post.summary}</p>
                        <a href="#">Read More</a>
                    `;
                    blogPostsContainer.appendChild(article);
                });
            } else {
                blogPostsContainer.innerHTML = '<p>No blog posts available yet.</p>';
            }

        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogPostsContainer.innerHTML = '<p>Failed to load blog posts.</p>';
        }
    }

    // Call the function to load blog posts
    loadBlogPosts();

    // Display last modified date
    function displayLastModified() {
        const lastModifiedDate = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate.toLocaleDateString('en-US', options)}`;
    }

    // Call the function to display the last modified date
    displayLastModified();
});