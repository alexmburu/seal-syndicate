// ===============================
// SCORE CALCULATION ENGINE
// ===============================

function calculateScore(pick) {
  let xg_diff = pick.xg - pick.xga;

  let score =
    xg_diff * 0.3 +
    pick.goal_diff * 0.2 +
    pick.motivation * 0.2 -
    pick.injury_score * 0.1;

  return parseFloat(score.toFixed(2));
}

// ===============================
// COUNTDOWN TIMER (DAILY RESET)
// ===============================

function startCountdown() {
  function updateCountdown() {
    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    let diff = tomorrow - now;

    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let el = document.getElementById("countdown");

    if (el) {
      el.innerText =
        `Next Model Release In: ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  setInterval(updateCountdown, 1000);
}

// ===============================
// TIER CLASSIFICATION
// ===============================

function classifyTier(score, odds) {

  // Anchor must be low odds AND strong score
  if (odds <= 1.60 && score >= 1.3) return "Anchor";

  // Medium odds
  if (odds > 1.60 && odds <= 2.00) return "Medium";

  // High odds
  return "Volatility";
}
// ===============================
// FORM RENDERING (COLORED BOXES)
// ===============================

function renderForm(formArray) {
  if (!formArray) return "";

  return `
    <div class="form-row">
      ${formArray.map(result => {
        let cls = "";

        if (result === "W") cls = "form-win";
        if (result === "D") cls = "form-draw";
        if (result === "L") cls = "form-loss";

        return `<span class="form-box ${cls}">${result}</span>`;
      }).join("")}
      <span class="form-box upcoming">?</span>
    </div>
  `;
}

// ===============================
// ANALYSIS TEXT
// ===============================

function generateAnalysis(pick) {
  let xg_diff = (pick.xg - pick.xga).toFixed(2);

  return `
    <p>${pick.selection} shows a positive expected goal differential of ${xg_diff}.</p>
    <p>The team averages ${pick.xg} xG and concedes ${pick.xga} xGA.</p>
    <p>Goal difference trend of ${pick.goal_diff} supports momentum.</p>
    <p>Motivation rating: ${pick.motivation}/10.</p>
    <p>Injury update: ${pick.injuries}</p>
  `;
}

// ===============================
// DAILY RESET KEY
// ===============================

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// ===============================
// PERFORMANCE TRACKER
// ===============================

function getStats() {
  const todayKey = getTodayKey();
  const stored = JSON.parse(localStorage.getItem("sealStats"));

  if (!stored || stored.date !== todayKey) {
    return {
      date: todayKey,
      total: 0,
      wins: 0,
      losses: 0,
      profit: 0
    };
  }

  return stored;
}

function saveStats(stats) {
  localStorage.setItem("sealStats", JSON.stringify(stats));
}

function updatePerformance(resultOdds) {
  let stats = getStats();

  stats.total++;

  // Simulated 55% demo win rate
  let win = Math.random() < 0.55;

  if (win) {
    stats.wins++;
    stats.profit += resultOdds - 1;
  } else {
    stats.losses++;
    stats.profit -= 1;
  }

  saveStats(stats);
}

function displayStats() {
  let stats = getStats();

  let roi = stats.total > 0
    ? ((stats.profit / stats.total) * 100).toFixed(1)
    : 0;

  return `
    <div class="pick">
      <h3>Performance Tracker (Device-Based)</h3>
      <p>Total Generated: ${stats.total}</p>
      <p>Wins: ${stats.wins}</p>
      <p>Losses: ${stats.losses}</p>
      <p>Net Units: ${stats.profit.toFixed(2)}</p>
      <p>ROI: ${roi}%</p>
    </div>
  `;
}

// ===============================
// TREBLE GENERATOR (FIXED MIXING)
// ===============================

function generateTreble() {

  // Shuffle first to prevent repetition bias
  let shuffled = [...dailyRoster].sort(() => Math.random() - 0.5);

  let scored = shuffled.map(pick => {
    let score = calculateScore(pick);
    return { ...pick, score, tier: classifyTier(score, pick.odds) };
  });

  let anchors = scored.filter(p => p.tier === "Anchor");
  let mediums = scored.filter(p => p.tier === "Medium");
  let volatility = scored.filter(p => p.tier === "Volatility");

  if (!anchors.length || !mediums.length || !volatility.length) {
    alert("Roster needs statistical diversity.");
    return;
  }

  // Take first after shuffle (rotates naturally)
  let pick1 = anchors[Math.floor(Math.random() * anchors.length)];
let pick2 = mediums[Math.floor(Math.random() * mediums.length)];
let pick3 = volatility[Math.floor(Math.random() * volatility.length)];

  let totalOdds = parseFloat(
    (pick1.odds * pick2.odds * pick3.odds).toFixed(2)
  );

  updatePerformance(totalOdds);
  displayTreble([pick1, pick2, pick3], totalOdds);
}

// ===============================
// DISPLAY OUTPUT
// ===============================

function displayTreble(picks, totalOdds) {

  let today = new Date();
  let fixtureDate = today.toDateString();

  let container = document.getElementById("result");

  container.innerHTML = `
    <h2>AI Generated Treble</h2>
    <p>Fixture Date: ${fixtureDate}</p>
  `;

  picks.forEach(pick => {
    container.innerHTML += `
      <div class="pick">
        <h3>${pick.match}</h3>
        <p><strong>${pick.selection}</strong> @ ${pick.odds}</p>
        <p>Tier: ${pick.tier} | Confidence Score: ${pick.score}</p>

        <div>
          <small>Home Form</small>
          ${renderForm(pick.form_home)}
        </div>

        <div>
          <small>Away Form</small>
          ${renderForm(pick.form_away)}
        </div>

        ${generateAnalysis(pick)}
      </div>
    `;
  });

  container.innerHTML += `
    <h2>Total Combined Odds: ${totalOdds}</h2>
    ${displayStats()}
  `;
}

// Start countdown on load
startCountdown();
