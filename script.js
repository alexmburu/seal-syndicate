// ==========================================
// 1. THE AD ROTATION MATRIX (STRICT SEQUENCE)
// ==========================================
const adCampaigns = [
    // BOOTS CYCLE
    { title: "NIKE MERCURIAL 2026", desc: "Elite traction for explosive speed.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", btn: "Shop Nike" },
    { title: "ADIDAS PREDATOR", desc: "Master the ball with hybrid-touch technology.", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", btn: "Shop Adidas" },
    { title: "PUMA FUTURE", desc: "Unmatched agility for the creative playmaker.", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80", btn: "Shop Puma" },
    
    // JERSEYS CYCLE
    { title: "ARSENAL HOME 25/26", desc: "Authentic North London pride. Premium fit.", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80", btn: "Get Kit" },
    { title: "MAN UTD AWAY", desc: "The iconic red devil's legacy in high-breathability fabric.", img: "https://images.unsplash.com/photo-1638134706911-30691880f089?w=500&q=80", btn: "Get Kit" },
    { title: "REAL MADRID WHITE", desc: "The Galactico standard. 100% recycled polyester.", img: "https://images.unsplash.com/photo-1638134706503-4963364f33b1?w=500&q=80", btn: "Get Kit" },
    
    // ENERGY DRINKS CYCLE
    { title: "MONSTER ENERGY", desc: "Unleash the beast during the mid-week matches.", img: "https://images.unsplash.com/photo-1622543953495-a13ee42155fd?w=500&q=80", btn: "Order Now" },
    { title: "RED BULL", desc: "Gives you wings for late-night Libertadores analysis.", img: "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=500&q=80", btn: "Order Now" },
    { title: "GATORADE PRO", desc: "Electrolytes for peak pitch performance.", img: "https://images.unsplash.com/photo-1491633582673-49162982976d?w=500&q=80", btn: "Order Now" },
    
    // SPORTSBOOKS CYCLE
    { title: "PINNACLE", desc: "The highest limits. The lowest margins.", img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=500&q=80", btn: "Bet Now" },
    { title: "SPORTPESA", desc: "Made by winners, for winners. Join the elite.", img: "https://images.unsplash.com/photo-1541534741688-6078c64b5913?w=500&q=80", btn: "Bet Now" }
];

let adPointer = 0; // Controls the rotation

// ==========================================
// 2. THE QUANTUM MATRIX (FULL 24-TEAM DATA)
// ==========================================
const eliteTeams = [
    { home: "Man City", away: "Nottm Forest", pick: "1", odds: 1.36, gd: "+32", xg: "2.14", proof: ["Title Race Pressure", "City 2.6 goals/home avg", "Forest xGA 1.8 away", "Haaland form peak", "70% Possession avg"] },
    { home: "Brighton", away: "Arsenal", pick: "2", odds: 1.62, gd: "+36", xg: "2.31", proof: ["Title Lead Protection", "Arsenal away xGA 0.65", "Tactical Saka mismatch", "Unbeaten in 9", "95% squad fitness"] },
    { home: "Newcastle", away: "Man Utd", pick: "X2", odds: 1.60, gd: "+12", xg: "1.78", proof: ["UCL Spot Fight", "United unbeaten in 11", "Newcastle defensive slump", "Bruno G suspended", "United transition speed"] },
    { home: "Real Sociedad", away: "Ath Bilbao", pick: "1X", odds: 1.31, gd: "+13", xg: "1.58", proof: ["Cup Semi 2nd Leg", "Sociedad lead 1-0", "Nico Williams injured", "Home fortress factor", "Low xG tactical setup"] },
    { home: "Mamelodi", away: "G. Arrows", pick: "1", odds: 1.44, gd: "+24", xg: "1.95", proof: ["League Lockdown", "68% ball possession", "Coming off 3-1 win", "Arrows poor xGA 1.65", "Historical dominance"] },
    { home: "Aberdeen", away: "Celtic", pick: "2", odds: 1.40, gd: "+40", xg: "2.77", proof: ["Title race intensity", "Celtic xG 2.77 avg", "Aberdeen winless in 11", "3+ goals last 3 away", "Massive technical gap"] },
    { home: "Aston Villa", away: "Chelsea", pick: "O2.5", odds: 1.65, gd: "+8", xg: "1.45", proof: ["European spot race", "Villa high xGA (1.6)", "Emery high-line tactic", "4/5 H2H were Over 2.5", "Chelsea transition pace"] },
    { home: "Fulham", away: "West Ham", pick: "BTTS", odds: 1.80, gd: "-2", xg: "1.22", proof: ["Mid-table safety", "Summerville SOT streak", "Fulham missing key CB", "Both score in 70% games", "Open attacking styles"] },
    { home: "Lazio", away: "Atalanta", pick: "U2.5", odds: 1.71, gd: "+12", xg: "1.35", proof: ["Coppa Italia Cageyness", "Sarri defensive priority", "Atalanta missing striker", "Low xG 1st leg trend", "Midfield stalemate focus"] },
    { home: "Marseille", away: "Toulouse", pick: "1", odds: 1.53, gd: "+18", xg: "1.62", proof: ["Coupe de France Semi", "Vélodrome atmosphere", "Toulouse rotating squad", "Marseille xG 1.62 dominance", "Home side cup specialty"] },
    { home: "Lorient", away: "Nice", pick: "X2", odds: 1.44, gd: "+10", xg: "1.40", proof: ["French Cup motivation", "Nice elite xGA 0.8", "Lorient low scoring form", "Technical midfield gap", "Double chance safety"] },
    { home: "Hamburg", away: "Bayer Lev.", pick: "O2.5", odds: 1.55, gd: "+18", xg: "1.88", proof: ["Alonso high-press machine", "Hamburg open play style", "UCL qualification chase", "Average 3.2 total xG", "Fast German transition"] },
    { home: "Panathinaikos", away: "OFI Crete", pick: "1", odds: 1.40, gd: "+20", xg: "2.01", proof: ["Greek Title Must-Win", "Home 2.1 goals avg", "OFI missing 3 CBs", "80% home win rate", "Dominant possession stats"] },
    { home: "Kifisia", away: "PAOK", pick: "2", odds: 1.44, gd: "+22", xg: "1.90", proof: ["Title chase intensity", "Kifisia 4-game losing run", "PAOK highest away xG", "5x Squad value gap", "Redemption game for PAOK"] },
    { home: "Luzern", away: "Young Boys", pick: "X2", odds: 1.44, gd: "+28", xg: "1.85", proof: ["Swiss League Lead", "Unbeaten in 6 H2Hs", "Luzern GK injury crisis", "1.85 xG favor for YB", "Title race must-not-lose"] },
    { home: "Gateshead", away: "Braintree", pick: "1", odds: 1.85, gd: "+14", xg: "1.65", proof: ["Playoff push energy", "Braintree travel fatigue", "Gateshead home xG 1.9", "4-match home win streak", "Tactical press efficiency"] },
    { home: "Portadown", away: "Cliftonville", pick: "2", odds: 1.50, gd: "+15", xg: "1.68", proof: ["NIFL Title Race", "62% possession avg", "Cliftonville 5-win streak", "Portadown 0 shots on target", "Class gap in midfield"] },
    { home: "Luton", away: "Northampton", pick: "1", odds: 1.50, gd: "+8", xg: "1.45", proof: ["Trophy silverware priority", "Kenilworth Road fortress", "Class gap between tiers", "Luton depth advantage", "Northampton fatigue"] },
    { home: "Barcelona SC", away: "Botafogo", pick: "X2", odds: 1.55, gd: "+12", xg: "1.55", proof: ["Libertadores resilience", "Botafogo 0.9 xGA away", "Barcelona SC inconsistency", "Tactical high-press edge", "Draw-cover for travel"] },
    { home: "Carabobo FC", away: "Sporting Cristal", pick: "2", odds: 2.10, gd: "+10", xg: "1.70", proof: ["Continental experience", "Cristal 3x squad value", "Carabobo rotation issues", "1.70 xG favor for Cristal", "Tournament motivation"] },
    { home: "Pachuca", away: "Necaxa", pick: "1", odds: 1.72, gd: "+10", xg: "1.72", proof: ["High altitude weapon", "Necaxa winless in 5 away", "Pachuca home xG 1.72", "Apertura point push", "Youth energy vs aging unit"] },
    { home: "Santos Laguna", away: "Cruz Azul", pick: "BTTS", odds: 1.75, gd: "+5", xg: "1.75", proof: ["80% H2H BTTS rate", "Both average 1.4 goals", "High altitude attack play", "Defensive lapses expected", "Safest Mexican stat pick"] },
    { home: "Sagamihara", away: "ThespaKusatsu", pick: "2", odds: 1.90, gd: "+6", xg: "1.45", proof: ["J-League Cup class gap", "Full strength visitor XI", "Sagamihara youth rotation", "Technical passing gap", "Unbeaten in 4 form"] },
    { home: "Cherno More", away: "Arda", pick: "1", odds: 1.52, gd: "+14", xg: "1.52", proof: ["Varna Fortress factor", "Arda missing top scorer", "Cherno More best defense", "Home crowd pressure", "Unbeaten in 6 at home"] }
];

// ==========================================
// 3. THE MASTER GENERATOR FUNCTION
// ==========================================
function masterGenerator() {
    const resultArea = document.getElementById('result-area');
    const listContainer = document.getElementById('treble-list');
    const adContainer = document.getElementById('ad-window');
    const oddsLabel = document.getElementById('total-odds');

    resultArea.classList.remove('hidden');

    // --- STEP A: AD ROTATION (STRICT BOOTS-JERSEY-DRINK-BET) ---
    const ad = adCampaigns[adPointer];
    adContainer.innerHTML = `
        <div class="glass ad-glow rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl transition-all duration-700">
            <img src="${ad.img}" class="w-full h-52 object-cover border-b border-white/5">
            <div class="p-6">
                <span class="text-[9px] bg-blue-600 text-white px-2 py-1 rounded font-black tracking-widest uppercase">Sponsored Hub</span>
                <h3 class="text-white font-bold mt-4 text-base uppercase tracking-tight">${ad.title}</h3>
                <p class="text-[11px] text-slate-400 mt-2 mb-8 leading-relaxed">${ad.desc}</p>
                <button class="w-full py-4 bg-white text-black text-[10px] font-black rounded-xl uppercase hover:bg-blue-500 hover:text-white transition-all duration-300">
                    ${ad.btn}
                </button>
            </div>
        </div>
    `;
    
    // Cycle the pointer
    adPointer = (adPointer + 1) % adCampaigns.length;

    // --- STEP B: NEURAL TREBLE GENERATION ---
    const shuffled = [...eliteTeams].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const totalOdds = (selected[0].odds * selected[1].odds * selected[2].odds).toFixed(2);

    listContainer.innerHTML = "";
    selected.forEach(match => {
        listContainer.innerHTML += `
            <div class="border-l-4 border-blue-600 pl-6 py-5 bg-white/5 rounded-r-2xl border-t border-b border-r border-white/5 shadow-inner">
                <div class="flex justify-between items-center mb-2">
                    <p class="font-black text-xs uppercase tracking-tight">${match.home} <span class="text-blue-500">v</span> ${match.away}</p>
                    <span class="text-blue-400 font-mono text-xs font-bold">@${match.odds}</span>
                </div>
                <div class="flex gap-2 mb-4">
                    <span class="bg-green-600/20 text-green-400 text-[9px] px-2 py-0.5 rounded font-bold">SIGNAL: ${match.pick}</span>
                    <span class="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded font-mono font-bold">xG: ${match.xg}</span>
                </div>
                <ul class="space-y-1.5 pt-3 border-t border-white/5">
                    ${match.proof.map(p => `
                        <li class="text-[10px] text-slate-300 flex items-start leading-snug">
                            <span class="text-blue-600 mr-2">▶</span> ${p}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    oddsLabel.innerText = "TOTAL ODDS: " + totalOdds;
}