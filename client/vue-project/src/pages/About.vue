<template>
  <div class="about-container">
    <!-- About Header Section -->
    <section class="about-header">
      <h1>About Us</h1>
      <p>Welcome to our website! We are passionate about building amazing products and solutions that make a difference.</p>
    </section>

    <!-- Our Mission Section -->
    <section class="mission">
      <h2>Our Mission</h2>
      <p>Our mission is to innovate and deliver high-quality, customer-centric products that create long-lasting value. We are committed to excellence, continuous improvement, and integrity.</p>
    </section>

    <!-- Team Section -->
    <section class="start-now">
      <div class="start-now-content">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of happy users today and begin your journey with us!</p>
        <button @click="startNow">Start Now</button>
      </div>
  </section>
    <section class="team">
      <h2>Our Team</h2>
      <div class="team-members">
        <div class="team-member">
          <img src="#" alt="Team Member 1">
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </div>
        <div class="team-member">
          <img src="#" alt="Team Member 2">
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </div>
        <div class="team-member">
          <img src="#" alt="Team Member 3">
          <h3>Michael Brown</h3>
          <p>Designer</p>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
.about-container {
  font-family: 'Arial', sans-serif;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Section */
.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.about-header p {
  font-size: 1.25rem;
  color: #666;
}

/* Mission Section */
.mission {
  background-color: #f4f4f9;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
}

.mission h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 1rem;
}

.mission p {
  font-size: 1.25rem;
  color: #555;
  text-align: center;
  line-height: 1.6;
}

.start-now {
  background-color: #007bff; /* 高级蓝色 */
  padding: 4rem 2rem;
  text-align: center;
  color: #fff;
  border-radius: 10px;
  margin: 4rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.start-now-content h2 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.start-now-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.start-now-content button {
  background-color: #fff;
  color: #007bff;
  font-size: 1.25rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.start-now-content button:hover {
  background-color: #0056b3; /* 鼠标悬停时按钮变为蓝色 */
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Team Section */
.team {
  padding: 3rem 2rem;
  margin-bottom: 3rem;
}

.team h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 2rem;
}

.team-members {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
}

.team-member {
  text-align: center;
  width: 250px;
}

.team-member img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.team-member h3 {
  font-size: 1.5rem;
  color: #333;
}

.team-member p {
  font-size: 1rem;
  color: #777;
}

/* Contact Section */
.contact {
  text-align: center;
  padding: 3rem 2rem;
  background-color: #f4f4f9;
}

.contact h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.contact p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.contact button {
  font-size: 1rem;
  padding: 1rem 2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact button:hover {
  background-color: #0056b3;
}
</style>

<script>
export default {
  name: 'About'
};
</script>
