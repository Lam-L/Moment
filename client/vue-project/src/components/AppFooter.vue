<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Section 1: Brand or Logo -->
      <div class="footer-section">
        <h1 class="brand-logo">YourBrand</h1>
        <p class="tagline">Tagline goes here. Simplify your life.</p>
      </div>

      <!-- Section 2: Quick Links -->
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Section 3: Contact Information -->
      <div class="footer-section">
        <h3>Contact</h3>
        <p>Email: info@yourbrand.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 1234 Your Street, City, Country</p>
      </div>

      <!-- Section 4: Social Media Links -->
      <div class="footer-section">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="#" class="icon facebook" aria-label="Facebook"></a>
          <a href="#" class="icon twitter" aria-label="Twitter"></a>
          <a href="#" class="icon instagram" aria-label="Instagram"></a>
          <a href="#" class="icon linkedin" aria-label="LinkedIn"></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 YourBrand. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background: #1a1a1a; /* Dark, elegant background */
  color: #ffffff; /* White text for contrast */
  padding: 2rem 1rem;
  font-family: 'Arial', sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin: 0.5rem 1rem;
}

.brand-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e0e0e0; /* Subtle off-white */
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 0.875rem;
  color: #b3b3b3; /* Softer grey for tagline */
}

.footer-section h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: #f0f0f0; /* Bright white for headers */
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  text-decoration: none;
  color: #e0e0e0;
  font-size: 0.875rem;
}

.footer-section ul li a:hover {
  color: #ffffff; /* Bright white on hover */
}

.social-icons {
  display: flex;
  gap: 0.75rem;
}

.icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  background: #333333;
  border-radius: 50%;
  transition: background 0.3s;
}

.icon.facebook:hover {
  background: #3b5998; /* Facebook blue */
}

.icon.twitter:hover {
  background: #1da1f2; /* Twitter blue */
}

.icon.instagram:hover {
  background: #e1306c; /* Instagram pink */
}

.icon.linkedin:hover {
  background: #0077b5; /* LinkedIn blue */
}

.footer-bottom {
  text-align: center;
  margin-top: 1rem;
  border-top: 1px solid #333333;
  padding-top: 1rem;
  font-size: 0.875rem;
  color: #b3b3b3; /* Light grey */
}
</style>
