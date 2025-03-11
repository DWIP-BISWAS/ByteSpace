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

// Render blog posts
function renderBlogPosts(posts) {
  blogGrid.innerHTML = posts.map(post => `
    <div class="blog-post" data-topics="${post.topics.join(',')}" data-tags="${post.tags.join(',')}">
      <div class="post-image"></div>
      <div class="post-content">
        <h2>${post.title}</h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <span class="post-date">${post.date}</span>
      </div>
    </div>
  `).join('');

  // Add animation delay to each post
  document.querySelectorAll('.blog-post').forEach((post, index) => {
    post.style.animationDelay = `${index * 0.2}s`;
  });
}

// Filter posts based on search and filters
function filterPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTopics = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.value);
  const selectedTags = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
