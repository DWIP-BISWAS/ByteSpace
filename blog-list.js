// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalism",
    excerpt: "Exploring the beauty of less in modern design and lifestyle.",
    date: "March 11, 2025",
    topics: ["design", "minimalism"],
    tags: ["ui-ux", "trends"]
  },
  {
    id: 2,
    title: "Digital Renaissance",
    excerpt: "How technology is reshaping creative expression in the 21st century.",
    date: "March 10, 2025",
    topics: ["technology", "design"],
    tags: ["web-design", "trends"]
  },
  {
    id: 3,
    title: "Future of Web Design",
    excerpt: "Predictions and trends shaping the next decade of digital interfaces.",
    date: "March 9, 2025",
    topics: ["design", "technology"],
    tags: ["ui-ux", "web-design"]
  }
];

// DOM Elements
const searchInput = document.getElementById('blog-search');
const blogGrid = document.getElementById('blog-grid');
const topicCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

// Debounce function for search optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Render blog posts with loading animation
function renderBlogPosts(posts) {
  if (posts.length === 0) {
    blogGrid.innerHTML = `
      <div class="no-results">
        No posts found matching your search criteria
      </div>
    `;
    return;
  }

  blogGrid.innerHTML = posts.map(post => `
    <div class="blog-post" data-topics="${post.topics.join(',')}" data-tags="${post.tags.join(',')}">
      <div class="post-image"></div>
      <div class="post-content">
        <h2>${highlightSearchTerm(post.title, searchInput.value)}</h2>
        <p class="post-excerpt">${highlightSearchTerm(post.excerpt, searchInput.value)}</p>
        <span class="post-date">${post.date}</span>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Add animation delay to each post
  document.querySelectorAll('.blog-post').forEach((post, index) => {
    post.style.animationDelay = `${index * 0.2}s`;
  });
}

// Highlight search terms in text
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Filter posts based on search and filters
const filterPosts = debounce(() => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTopics = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);
  const selectedTags = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = (
      post.title.toLowerCase().includes(searchTerm) || 
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.topics.some(topic => topic.toLowerCase().includes(searchTerm))
    );

    const matchesTopics = selectedTopics.length === 0 || 
                         post.topics.some(topic => selectedTopics.includes(topic));

    const matchesTags = selectedTags.length === 0 || 
                       post.tags.some(tag => selectedTags.includes(tag));

    return matchesSearch && matchesTopics && matchesTags;
  });

  renderBlogPosts(filteredPosts);
}, 300);

// Event listeners
searchInput.addEventListener('input', filterPosts);
topicCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterPosts);
});

// Initial render with rotating borders
document.addEventListener('DOMContentLoaded', () => {
  renderBlogPosts(blogPosts);

  // Add rotating borders dynamically
  const searchContainer = document.querySelector('.search-container');

  if (searchContainer) {
    const borderElement = document.createElement('div');
    borderElement.classList.add('search-border');

    // Append rotating border to the search container
    searchContainer.appendChild(borderElement);
  }

  // Add search input animations
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('focus', () => {
    searchInput.parentElement.classList.add('focused');
  });
  searchInput.addEventListener('blur', () => {
    searchInput.parentElement.classList.remove('focused');
  });
});
