// Replace with your actual Pipedream endpoint
const PIPE_URL = "https://eoavk17d73eop4g.m.pipedream.net";

// Load University Info dynamically
fetch("api/university.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("uniName").textContent = data.name;
    document.getElementById("uniTagline").textContent = data.tagline;
    document.getElementById("uniOverview").textContent = data.overview;
    document.getElementById("contactInfo").textContent =
      `📞 ${data.contact.phone} | ✉️ ${data.contact.email}`;
  });

// Load Courses dynamically into dropdown
fetch("api/courses.json")
  .then(res => res.json())
  .then(data => {
    const courseListDiv = document.getElementById("courseList");
    courseListDiv.innerHTML = data.courses
      .map(course => `<label><input type="checkbox" value="${course}"> ${course}</label>`)
      .join("");
  });

// Smooth scroll to Apply section
document.getElementById("applyBtn").addEventListener("click", () => {
  document.getElementById("applySection").scrollIntoView({ behavior: "smooth" });
});

// Show/Hide Dropdown
const dropdown = document.getElementById("courseDropdown");
document.getElementById("popularBtn").addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Select Courses and auto-fill form field
document.getElementById("selectCoursesBtn").addEventListener("click", () => {
  const selected = Array.from(document.querySelectorAll("#courseDropdown input[type='checkbox']:checked"))
    .map(cb => cb.value);
  document.getElementById("selectedCourses").value = selected.join(", ");
  dropdown.classList.add("hidden");
});

// Form submission
document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const msg = document.getElementById("formMessage");

  try {
    const res = await fetch(PIPE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      msg.textContent = "🎉 Form submitted successfully!";
      msg.style.color = "green";
      e.target.reset();
    } else {
      msg.textContent = "⚠️ Error submitting form.";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "❌ Network error. Try again.";
    msg.style.color = "red";
  }
});
