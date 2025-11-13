// Replace with your Pipedream URL
const PIPE_URL = "https://eoavk17d73eop4g.m.pipedream.net";

// Smooth scroll to Apply section
document.getElementById("applyBtn").addEventListener("click", () => {
  document.getElementById("applySection").scrollIntoView({
    behavior: "smooth"
  });
});

// Show/Hide Dropdown
const dropdown = document.getElementById("courseDropdown");
document.getElementById("popularBtn").addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Select courses from dropdown
document.getElementById("selectCoursesBtn").addEventListener("click", () => {
  const checked = Array.from(dropdown.querySelectorAll("input[type='checkbox']:checked"))
                       .map(cb => cb.value);
  document.getElementById("selectedCourses").value = checked.join(", ");
  dropdown.classList.add("hidden");
});

// Handle Form Submission
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
