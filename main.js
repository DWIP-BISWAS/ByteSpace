document.addEventListener('DOMContentLoaded', () => {
  console.log("Main.js loaded ✅");

  // ✅ Hamburger Menu Animation
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger) {
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
  }

  // ✅ Smooth Scroll for Navigation Links
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

  // ✅ Blog Post Hover Effect
  const blogPosts = document.querySelectorAll('.blog-post');
  blogPosts.forEach((post, index) => {
    post.style.animationDelay = `${index * 0.2}s`;
  });

  // ✅ Blog Rendering Logic (Only if #blog-grid Exists)
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    console.log("Blog section detected. Rendering blogs...");
    renderBlogPosts();
  }
});

// ✅ Smooth Parallax Effect on Scroll
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

// ✅ Function to Render Blog Posts
function renderBlogPosts() {
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

  const blogGrid = document.getElementById("blog-grid");
  blogGrid.innerHTML = blogPosts.map(post => `
    <div class="blog-post" data-topics="${post.topics.join(',')}" data-tags="${post.tags.join(',')}">
      <div class="post-content">
        <h2><a href="${post.url}">${post.title}</a></h2>
        <p>${post.excerpt}</p>
        <span class="post-date">${post.date}</span>
        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}
