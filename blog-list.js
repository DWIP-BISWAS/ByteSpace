document.addEventListener('DOMContentLoaded', () => {
// Hamburger Menu Animation
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Blog post hover effect
  const blogPosts = document.querySelectorAll('.blog-post');
  blogPosts.forEach((post, index) => {
    post.style.animationDelay = `${index * 0.2}s`;
  });
});

// Smooth parallax effect on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const direction = scrollTop > lastScrollTop ? 'down' : 'up';
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero && scrollTop < window.innerHeight) {
    hero.style.transform = `translateY(${scrollTop * 0.4}px)`;
    hero.style.opacity = 1 - (scrollTop / window.innerHeight);
  }

  lastScrollTop = scrollTop;
});

// Sample blog data with URLs
const blogPosts = [
{
    "id": 1,
    "title": "Dark Web vs. Deep Web: What’s the Difference?",
    "excerpt": "Unraveling the myths: What really lies beneath the surface web?",
    "date": "March 11, 2025",
    "topics": ["cybersecurity", "internet"],
    "tags": ["dark-web", "deep-web", "privacy"],
    "url": "blog1.html"
}
];

// DOM Elements
const blogGrid = document.getElementById('blog-grid');
const searchInput = document.getElementById('blog-search');
const topicCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

// ✅ Function to Render Blog Posts
function renderBlogPosts(posts) {
  if (posts.length === 0) {
    blogGrid.innerHTML = `<div class="no-results">No posts found.</div>`;
    return;
  }

  blogGrid.innerHTML = posts.map(post => `
    <div class="blog-post" data-topics="${post.topics.join(',')}" data-tags="${post.tags.join(',')}">
      <div class="post-content">
        <h2><a href="${post.url}">${highlightSearchTerm(post.title, searchInput.value)}</a></h2>
        <p>${highlightSearchTerm(post.excerpt, searchInput.value)}</p>
        <span class="post-date">${post.date}</span>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ✅ Function to Highlight Search Terms
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// ✅ Debounce Function for Performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ✅ Function to Filter Posts Based on Search & Filters
const filterPosts = debounce(() => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedTopics = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
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

    return matchesSearch && matchesTopics;
  });

  renderBlogPosts(filteredPosts);
}, 300);

// ✅ Event Listeners
searchInput.addEventListener('input', filterPosts);
topicCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterPosts));

// ✅ Initial Render
document.addEventListener('DOMContentLoaded', () => {
  renderBlogPosts(blogPosts);
});
