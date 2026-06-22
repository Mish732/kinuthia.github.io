// ============================================================
//  PERSONAL PROFILE PROGRAM
//  Student Profile Object
// ============================================================

const studentProfile = {
  // ── Core personal data ──────────────────────────────────
  fullName: "Michelle Wangari Kinuthia",
  age: 21,
  country: "Kenya",
  courseEnrolled: "Bachelor of Science in Information Technology",
  hobbies: ["Hiking", "Photography", "Chess", "Reading Sci-Fi"],
  favoriteProgrammingLanguage: "JavaScript",
  yearStarted: 2024,
  totalCourseYears: 4,

  // ── Calculations ─────────────────────────────────────────
  get ageInDays() {
    return this.age * 365;
  },

  get ageInHours() {
    return this.ageInDays * 24;
  },

  get currentYear() {
    return new Date().getFullYear();
  },

  get yearsOfStudyCompleted() {
    return this.currentYear - this.yearStarted;
  },

  get yearsOfStudyLeft() {
    const left = this.totalCourseYears - this.yearsOfStudyCompleted;
    return left > 0 ? left : 0;
  },

  get graduationYear() {
    return this.yearStarted + this.totalCourseYears;
  },

  get progressPercent() {
    const pct = (this.yearsOfStudyCompleted / this.totalCourseYears) * 100;
    return Math.min(Math.round(pct), 100);
  },

  // ── Summary method ───────────────────────────────────────
  displaySummary() {
    const summary = `
========================================
        STUDENT PROFILE SUMMARY
========================================
Name    : ${this.fullName}
Age     : ${this.age} years (≈ ${this.ageInDays.toLocaleString()} days)
Country : ${this.country}
Course  : ${this.courseEnrolled}
Hobbies : ${this.hobbies.join(", ")}
Fav Lang: ${this.favoriteProgrammingLanguage}
----------------------------------------
Started : ${this.yearStarted}
Grad Yr : ${this.graduationYear}
Done    : ${this.yearsOfStudyCompleted} yr(s) completed
Left    : ${this.yearsOfStudyLeft} yr(s) remaining
Progress: ${this.progressPercent}%
========================================`;
    console.log(summary);
    return summary;
  },
};

// ============================================================
//  1. console.log() — full summary
// ============================================================
studentProfile.displaySummary();

// ============================================================
//  2. console.table() — flat data snapshot
// ============================================================
console.table({
  "Full Name": studentProfile.fullName,
  "Age (years)": studentProfile.age,
  "Age (days)": studentProfile.ageInDays.toLocaleString(),
  "Age (hours)": studentProfile.ageInHours.toLocaleString(),
  Country: studentProfile.country,
  Course: studentProfile.courseEnrolled,
  Hobbies: studentProfile.hobbies.join(", "),
  "Favourite Language": studentProfile.favoriteProgrammingLanguage,
  "Year Started": studentProfile.yearStarted,
  "Graduation Year": studentProfile.graduationYear,
  "Years Completed": studentProfile.yearsOfStudyCompleted,
  "Years Remaining": studentProfile.yearsOfStudyLeft,
  "Progress (%)": studentProfile.progressPercent,
});

// ============================================================
//  3. Render card on the page
// ============================================================
function renderCard() {
  // Header text
  document.getElementById("card-name").textContent = studentProfile.fullName;
  document.getElementById("card-course").textContent =
    studentProfile.courseEnrolled;
  document.getElementById("card-country").textContent =
    `📍 ${studentProfile.country}`;

  // Stats grid
  const stats = [
    { label: "Age", value: `${studentProfile.age} yrs` },
    { label: "Age in Days", value: studentProfile.ageInDays.toLocaleString() },
    { label: "Fav Language", value: studentProfile.favoriteProgrammingLanguage },
    { label: "Year Started", value: studentProfile.yearStarted },
    { label: "Graduation", value: studentProfile.graduationYear },
    { label: "Yrs Left", value: studentProfile.yearsOfStudyLeft },
  ];

  const grid = document.getElementById("stats-grid");
  grid.innerHTML = "";
  stats.forEach(({ label, value }) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="stat-value">${value}</span><span class="stat-label">${label}</span>`;
    grid.appendChild(card);
  });

  // Progress bar
  document.getElementById("progress-bar-fill").style.width =
    `${studentProfile.progressPercent}%`;
  document.getElementById("progress-label").textContent =
    `${studentProfile.progressPercent}% complete · ${studentProfile.yearsOfStudyLeft} yr(s) remaining`;

  // Hobbies
  const hobbyList = document.getElementById("hobby-list");
  hobbyList.innerHTML = "";
  studentProfile.hobbies.forEach((h) => {
    const tag = document.createElement("span");
    tag.className = "hobby-tag";
    tag.textContent = h;
    hobbyList.appendChild(tag);
  });
}

// ============================================================
//  4. Alert / Confirm dialogs (triggered by buttons)
// ============================================================
function showAlertSummary() {
  alert(
    `👋 Hello! I'm ${studentProfile.fullName}.\n\n` +
      `🎓 Studying: ${studentProfile.courseEnrolled}\n` +
      `📍 Country : ${studentProfile.country}\n` +
      `💻 Fav Lang: ${studentProfile.favoriteProgrammingLanguage}\n` +
      `🗓️ Graduating in ${studentProfile.graduationYear} ` +
      `(${studentProfile.yearsOfStudyLeft} yr(s) to go!)`
  );
}

function showConfirmAge() {
  const confirmed = confirm(
    `Did you know ${studentProfile.fullName} is ${studentProfile.age} years old?\n\n` +
      `That's roughly ${studentProfile.ageInDays.toLocaleString()} days, ` +
      `or ${studentProfile.ageInHours.toLocaleString()} hours!\n\n` +
      `Click OK to see the full profile, or Cancel to dismiss.`
  );
  if (confirmed) {
    document.getElementById("profile-section").scrollIntoView({
      behavior: "smooth",
    });
  }
}

// ============================================================
//  Boot
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCard();

  document
    .getElementById("btn-alert")
    .addEventListener("click", showAlertSummary);
  document
    .getElementById("btn-confirm")
    .addEventListener("click", showConfirmAge);
});

