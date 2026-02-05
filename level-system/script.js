// ===== LEVEL DATA (simplified example) =====
const totalXP = [0, 50,120, 200, 300, 450, 600, 900, 1200, 1600, 1900, 2250, 2600, 2950, 3000, 3500, 4000, 4500, 4800, 5000, 5600, 6200, 6800, 7400, 8000, 8300, 8600, 8900, 8950, 9000, 9800, 10600, 11400, 12200, 13000, 13800, 14600, 15400, 16200, 17000, 17800, 18600, 19400, 20200, 21000, 21800, 22600, 23400, 24200, 25000, 30000, 34000, 38000, 42000, 45000, 47000, 48500, 49500, 49900, 50000];
const titles = ["Beginner", "Starter", "Learner", "Disciplined", "Focused", "Strong Will", "Consistent", "Warrior", "Alpha Mind", "High Discipline", "Calm Focus", "Stability", "Inner Control", "Sharp Mind", "Mental Beast", "Mental Steel", "Pressure-Proof", "Silent Power", "Commanding", "Strong Personality", "Unshakeable", "Focus Machine", "Discipline Pro", "Inner Leader", "Iron Will", "Fearless Calm", "High Energy", "Solid Presence", "Near Elite", "👑 Rare Man", "Elite Start", "Consistency King", "Focused Elite", "Controlled Power", "Elite Mind", "Emotional Master", "Habit Authority", "Stable Fire", "High Respect", "Elite Warrior", "Deep Control", "Laser Focus", "Mental General", "Strong Presence", "Iron Discipline", "Peak Control", "No-Excuses", "Rare Focus", "Near Master", "👑Self Master", "Elite Human", "Inner Commander", "Discipline Monk", "Supreme Control", "Grand Master", "Ultra Focus", "Timeless Calm", "Absolute Control", "Near Legend", "⚡LEGEND"];

const levels = totalXP.map((xp, i) => ({
  level: i + 1,
  xpRequired: xp,
  title: titles[i]
}));

// ===== PLAYER DATA =====
let playerXP = Number(localStorage.getItem("playerXP")) || 0;

// ===== ELEMENTS =====
const xpEl = document.getElementById("xp");
const levelEl = document.getElementById("level");
const titleEl = document.getElementById("title");

// ===== DATE CHECK =====
const today = new Date().toDateString();
const lastDay = localStorage.getItem("lastDay");

if (lastDay !== today) {
  localStorage.removeItem("completedTasks");
  localStorage.setItem("lastDay", today);
}

// ===== TASK HANDLING =====
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// ===== UPDATE UI =====
function updateUI() {
  xpEl.textContent = playerXP;

  let currentLevel = levels[0];

  for (let lvl of levels) {
    if (playerXP >= lvl.xpRequired) {
      currentLevel = lvl;
    }
  }

  levelEl.textContent = currentLevel.level;
  titleEl.textContent = currentLevel.title;
}

// ===== TASK BUTTONS =====
document.querySelectorAll(".task button").forEach(btn => {
  const taskId = btn.id;
  const xpGain = Number(btn.dataset.xp);

  if (completedTasks.includes(taskId)) {
    btn.disabled = true;
  }

  btn.addEventListener("click", () => {
    playerXP += xpGain;
    completedTasks.push(taskId);

    localStorage.setItem("playerXP", playerXP);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    btn.disabled = true;
    updateUI();
  });
});

// INIT
updateUI();

// function resetXP() {
//   playerXP = 0;
//   localStorage.setItem("playerXP", 0);
//   updateUI();
// }