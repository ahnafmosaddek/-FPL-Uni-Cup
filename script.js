let score = { teamA1: 0, teamA2: 0 };
let time = 0;
let isDarkMode = true;

const teams = {
    A: ["Thunder Fangs", "Shadow Vortex", "Iron Titans", "Crimson Blaze"],
    B: ["Blade Runners", "Phantom Battalion", "Warlord Syndicate", "Arcane Assassins"],
    C: ["Neon Nomads", "Pixel Pirates", "Tech Tacticians", "Vibe Visionaries"],
    D: ["Peak Performers", "Mission Unstoppable", "Victory Vortex", "Unbreakables"]
};

// Add detailed team profiles with enhanced data
const teamProfiles = {};
for (let group in teams) {
    teams[group].forEach(team => {
        teamProfiles[team] = {
            logo: `https://via.placeholder.com/150?text=${team.replace(/\s+/g, '+')}`,
            coach: `${team} Coach`,
            captain: `${team} Captain`,
            founded: "2025-01-01",
            groupPosition: Math.floor(Math.random() * 4) + 1,
            recentForm: Array(5).fill().map(() => ["W", "D", "L"][Math.floor(Math.random() * 3)]).join(""),
            members: [
                { name: `${team} Player 1`, position: "GK", number: 1, photo: `https://via.placeholder.com/50?text=P1`, status: "Available" },
                { name: `${team} Player 2`, position: "DF", number: 2, photo: `https://via.placeholder.com/50?text=P2`, status: "Available" },
                { name: `${team} Player 3`, position: "DF", number: 3, photo: `https://via.placeholder.com/50?text=P3`, status: "Unavailable" },
                { name: `${team} Player 4`, position: "DF", number: 4, photo: `https://via.placeholder.com/50?text=P4`, status: "Available" },
                { name: `${team} Player 5`, position: "MF", number: 5, photo: `https://via.placeholder.com/50?text=P5`, status: "Available" },
                { name: `${team} Player 6`, position: "MF", number: 6, photo: `https://via.placeholder.com/50?text=P6`, status: "Available" },
                { name: `${team} Player 7`, position: "MF", number: 7, photo: `https://via.placeholder.com/50?text=P7`, status: "Available" },
                { name: `${team} Player 8`, position: "FW", number: 8, photo: `https://via.placeholder.com/50?text=P8`, status: "Available" },
                { name: `${team} Player 9`, position: "FW", number: 9, photo: `https://via.placeholder.com/50?text=P9`, status: "Unavailable" },
                { name: `${team} Player 10`, position: "FW", number: 10, photo: `https://via.placeholder.com/50?text=P10`, status: "Available" },
                { name: `${team} Player 11`, position: "SUB", number: 12, photo: `https://via.placeholder.com/50?text=P11`, status: "Available" }
            ],
            stats: {
                matchesPlayed: 10,
                wins: 6,
                draws: 2,
                losses: 2,
                goalsScored: 18,
                goalsConceded: 10,
                assists: 12,
                yellowCards: 5,
                redCards: 1
            }
        };
    });
}

let matches = [];
// Group Stage Fixtures
for (let group in teams) {
    for (let i = 0; i < teams[group].length; i++) {
        for (let j = i + 1; j < teams[group].length; j++) {
            const currentDate = new Date("2025-08-05T02:50:00+06:00");
            const matchDate = new Date(`2025-08-${5 + Math.floor(Math.random() * 10)}T19:30:00+06:00`);
            const status = matchDate < currentDate ? "Completed" : matchDate.getTime() === currentDate.getTime() ? "Live" : "Upcoming";
            matches.push({
                stage: "Group Stage",
                group: group,
                team1: teams[group][i],
                team2: teams[group][j],
                date: matchDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: "7:30 PM GST",
                location: "Dubai/Abu Dhabi, UAE",
                stadium: `Stadium ${Math.floor(Math.random() * 5) + 1}`,
                referee: `Referee ${Math.random().toString(36).substring(7)}`,
                status: status,
                timeline: status === "Live" ? ["Goal by Team 1 (10')", "Goal by Team 2 (45')"] : status === "Completed" ? ["Goal by Team 1 (10')", "Goal by Team 2 (45')"] : [],
                winner: status === "Completed" ? (Math.random() > 0.5 ? teams[group][i] : teams[group][j]) : null
            });
        }
    }
}

// Knockout Stage Fixtures (Initial 16 to 8)
const groupWinners = {};
for (let group in teams) {
    const groupMatches = matches.filter(m => m.group === group && m.status === "Completed");
    groupWinners[group] = groupMatches
        .map(m => ({ team: m.winner || m.team1, points: pointsTable[m.winner || m.team1]?.points || 0 }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 2)
        .map(t => t.team);
}
const knockoutTeams = Object.values(groupWinners).flat(); // 8 teams
let knockoutMatches = [];
function generateKnockoutRound(teams, round) {
    for (let i = 0; i < teams.length; i += 2) {
        if (i + 1 < teams.length) {
            const matchDate = new Date(`2025-08-${15 + Math.floor((round - 1) * 2)}T19:30:00+06:00`);
            const status = matchDate < new Date("2025-08-05T02:50:00+06:00") ? "Completed" : matchDate.getTime() === currentDate.getTime() ? "Live" : "Upcoming";
            knockoutMatches.push({
                stage: round,
                team1: teams[i],
                team2: teams[i + 1],
                date: matchDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: "7:30 PM GST",
                location: "Dubai/Abu Dhabi, UAE",
                stadium: `Stadium ${Math.floor(Math.random() * 5) + 1}`,
                referee: `Referee ${Math.random().toString(36).substring(7)}`,
                status: status,
                timeline: status === "Live" ? ["Goal by Team 1 (15')"] : status === "Completed" ? ["Goal by Team 1 (15')"] : [],
                winner: status === "Completed" ? (Math.random() > 0.5 ? teams[i] : teams[i + 1]) : null
            });
        }
    }
    return knockoutMatches.filter(m => m.status === "Completed").map(m => m.winner).filter(w => w);
}
generateKnockoutRound(knockoutTeams, "Quarter Finals"); // 8 to 4
const semiFinalTeams = generateKnockoutRound(knockoutMatches.filter(m => m.stage === "Quarter Finals").map(m => m.winner).filter(w => w), "Semi Finals"); // 4 to 2
generateKnockoutRound(semiFinalTeams, "Final"); // 2 to 1 (Champion)

let results = [];
let pointsTable = {};
for (let group in teams) {
    teams[group].forEach(team => pointsTable[team] = { played: 0, wins: 0, draws: 0, losses: 0, goalDiff: 0, points: 0 });
}

matches.concat(knockoutMatches).forEach(m => {
    if (m.status === "Completed") {
        const score1 = Math.floor(Math.random() * 5);
        const score2 = Math.floor(Math.random() * 5);
        const result = {
            team1: m.team1,
            team2: m.team2,
            score: `${score1} - ${score2}`,
            winner: score1 > score2 ? m.team1 : score1 < score2 ? m.team2 : null
        };
        results.push(result);

        if (m.stage === "Group Stage") {
            pointsTable[m.team1].played += 1;
            pointsTable[m.team2].played += 1;
            if (result.winner === m.team1) {
                pointsTable[m.team1].wins += 1;
                pointsTable[m.team1].points += 3;
                pointsTable[m.team2].losses += 1;
            } else if (result.winner === m.team2) {
                pointsTable[m.team2].wins += 1;
                pointsTable[m.team2].points += 3;
                pointsTable[m.team1].losses += 1;
            } else {
                pointsTable[m.team1].draws += 1;
                pointsTable[m.team2].draws += 1;
                pointsTable[m.team1].points += 1;
                pointsTable[m.team2].points += 1;
            }
            pointsTable[m.team1].goalDiff += score1 - score2;
            pointsTable[m.team2].goalDiff += score2 - score1;
        }
    }
});

let knockoutStage = knockoutMatches;

function updateScore() {
    const liveMatches = matches.concat(knockoutMatches).filter(m => m.status === "Live");
    const liveScoreSection = document.getElementById('live-score');
    liveScoreSection.innerHTML = `
        <h2>Live Scores</h2>
        ${liveMatches.map(m => `
            <div class="live-score-card">
                <div class="score-board">
                    <button class="team-btn">${m.team1}</button>
                    <span>vs</span>
                    <div class="score">${Math.floor(Math.random() * 3)} - ${Math.floor(Math.random() * 3)}</div>
                    <span>${m.status}</span>
                    <button class="team-btn">${m.team2}</button>
                </div>
                <div class="live-status">
                    <button class="live-btn">LIVE ${time}'</button>
                    <span>${m.stage} - ${m.group || ''}</span>
                </div>
                ${m.timeline.length > 0 ? `<p class="timeline">Highlights: ${m.timeline.join(', ')}</p>` : ''}
                <button class="details-btn">Details</button>
            </div>
        `).join('')}
    `;
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const match = matches.concat(knockoutMatches).find(m => m.team1 === btn.closest('.live-score-card').querySelectorAll('.team-btn')[0].textContent && m.team2 === btn.closest('.live-score-card').querySelectorAll('.team-btn')[1].textContent);
            alert(`Match Details:\nStage: ${match.stage}\nTeam 1: ${match.team1}\nTeam 2: ${match.team2}\nDate: ${match.date} ${match.time}\nLocation: ${match.location}\nStadium: ${match.stadium}\nReferee: ${match.referee}\nStatus: ${match.status}\nHighlights: ${match.timeline.join(', ') || 'None'}`);
        });
    });
}

setInterval(() => {
    time += 1;
    updateScore();
}, 5000);

updateScore();

document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        document.querySelectorAll('.content').forEach(content => content.classList.add('hidden'));
        document.getElementById(section).classList.remove('hidden');
        updateSection(section);
    });
});

document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
    isDarkMode = e.target.checked;
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.querySelector('header').classList.toggle('light-mode', !isDarkMode);
    document.querySelector('.score-board').classList.toggle('light-mode', !isDarkMode);
    document.querySelector('.team-btn').classList.toggle('light-mode', !isDarkMode);
});

function updateSection(section) {
    const fixtureList = document.getElementById('fixture-list');
    const resultList = document.getElementById('result-list');
    const pointsTableDiv = document.getElementById('points-table');
    const teamList = document.getElementById('team-list');
    const knockoutList = document.getElementById('knockout-list');
    const homeContent = document.getElementById('home-content');

    if (section === 'home') {
        homeContent.innerHTML = `
            <input type="text" id="home-search" placeholder="Search fixtures..." class="search-bar" onkeyup="updateSection('home')">
            <div class="live-score-card">
                <h3>Live Score</h3>
                <div class="score-board">
                    <button class="team-btn">A1</button>
                    <span>vs</span>
                    <div class="score">0 - 0</div>
                    <span>Live</span>
                    <button class="team-btn">A2</button>
                </div>
                <div class="live-status">
                    <button class="live-btn">LIVE 0'</button>
                    <span>Group A</span>
                </div>
            </div>
        `;
    } else if (section === 'fixtures') {
        const searchInput = document.getElementById('fixture-search');
        const filter = searchInput ? searchInput.value.toLowerCase() : '';
        const suggestions = matches.concat(knockoutMatches).filter(m => m.team1.toLowerCase().includes(filter) || m.team2.toLowerCase().includes(filter) || m.date.toLowerCase().includes(filter)).map(m => `${m.team1} vs ${m.team2} - ${m.date}`);
        fixtureList.innerHTML = `
            <input type="text" id="fixture-search" placeholder="Search by team or date..." class="search-bar" onkeyup="updateSection('fixtures')" list="fixture-suggestions">
            <datalist id="fixture-suggestions">
                ${suggestions.map(s => `<option value="${s}">`).join('')}
            </datalist>
            <h3>Group Stage Fixtures</h3>
            ${Object.keys(teams).map(group => `
                <div class="group-section" style="background: linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})">
                    <h3>Group ${group}</h3>
                    <div class="fixture-group">
                        ${matches.filter(m => m.group === group && m.stage === "Group Stage" && (m.team1.toLowerCase().includes(filter) || m.team2.toLowerCase().includes(filter) || m.date.toLowerCase().includes(filter))).map(m => `
                            <div class="fixture-item" data-status="${m.status.toLowerCase()}">
                                <div class="team-info">
                                    <img src="https://flagcdn.com/${m.team1.replace(/\s+/g, '').slice(0, 2).toLowerCase()}.svg" alt="${m.team1} flag">
                                    <img src="${teamProfiles[m.team1].logo}" alt="${m.team1} logo" class="team-logo-small">
                                    <span>${m.team1}</span>
                                </div>
                                <div class="match-details">
                                    <p class="fixture-date">${m.date} ${m.time}</p>
                                    <p>${m.location} - ${m.stadium}</p>
                                    <p>Referee: ${m.referee}</p>
                                    <p class="match-status ${m.status.toLowerCase()}">${m.status}</p>
                                    ${m.status === "Completed" ? `<p>Score: ${results.find(r => r.team1 === m.team1 && r.team2 === m.team2)?.score || '0 - 0'}</p>` : ''}
                                    ${m.status === "Completed" && m.winner ? `<p>Winner: ${m.winner}</p>` : ''}
                                    ${m.timeline.length > 0 ? `<p>Highlights: ${m.timeline.join(', ')}</p>` : ''}
                                    <button class="details-btn">Details</button>
                                </div>
                                <div class="team-info">
                                    <img src="https://flagcdn.com/${m.team2.replace(/\s+/g, '').slice(0, 2).toLowerCase()}.svg" alt="${m.team2} flag">
                                    <img src="${teamProfiles[m.team2].logo}" alt="${m.team2} logo" class="team-logo-small">
                                    <span>${m.team2}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            <h3>Knockout Stage Fixtures</h3>
            ${["Quarter Finals", "Semi Finals", "Final"].map(stage => `
                <div class="group-section" style="background: linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})">
                    <h3>${stage}</h3>
                    <div class="fixture-group">
                        ${knockoutMatches.filter(m => m.stage === stage && (m.team1.toLowerCase().includes(filter) || m.team2.toLowerCase().includes(filter) || m.date.toLowerCase().includes(filter))).map(m => `
                            <div class="fixture-item" data-status="${m.status.toLowerCase()}">
                                <div class="team-info">
                                    <img src="https://flagcdn.com/${m.team1.replace(/\s+/g, '').slice(0, 2).toLowerCase()}.svg" alt="${m.team1} flag">
                                    <img src="${teamProfiles[m.team1].logo}" alt="${m.team1} logo" class="team-logo-small">
                                    <span>${m.team1}</span>
                                </div>
                                <div class="match-details">
                                    <p class="fixture-date">${m.date} ${m.time}</p>
                                    <p>${m.location} - ${m.stadium}</p>
                                    <p>Referee: ${m.referee}</p>
                                    <p class="match-status ${m.status.toLowerCase()}">${m.status}</p>
                                    ${m.status === "Completed" ? `<p>Score: ${results.find(r => r.team1 === m.team1 && r.team2 === m.team2)?.score || '0 - 0'}</p>` : ''}
                                    ${m.status === "Completed" && m.winner ? `<p>Winner: ${m.winner}</p>` : ''}
                                    ${m.timeline.length > 0 ? `<p>Highlights: ${m.timeline.join(', ')}</p>` : ''}
                                    <button class="details-btn">Details</button>
                                </div>
                                <div class="team-info">
                                    <img src="https://flagcdn.com/${m.team2.replace(/\s+/g, '').slice(0, 2).toLowerCase()}.svg" alt="${m.team2} flag">
                                    <img src="${teamProfiles[m.team2].logo}" alt="${m.team2} logo" class="team-logo-small">
                                    <span>${m.team2}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const match = matches.concat(knockoutMatches).find(m => m.team1 === btn.closest('.fixture-item').querySelectorAll('.team-info span')[0].textContent && m.team2 === btn.closest('.fixture-item').querySelectorAll('.team-info span')[1].textContent);
                alert(`Match Details:\nStage: ${match.stage}\nTeam 1: ${match.team1}\nTeam 2: ${match.team2}\nDate: ${match.date} ${match.time}\nLocation: ${match.location}\nStadium: ${match.stadium}\nReferee: ${match.referee}\nStatus: ${match.status}\n${match.status === "Completed" ? `Score: ${results.find(r => r.team1 === match.team1 && r.team2 === match.team2)?.score || '0 - 0'}\nWinner: ${match.winner || 'None'}` : ''}\nHighlights: ${match.timeline.join(', ') || 'None'}`);
            });
        });
    } else if (section === 'results') {
        resultList.innerHTML = results.map(r => `<p>${r.team1} ${r.score} ${r.team2} (${r.winner} winner)</p>`).join('');
    } else if (section === 'points') {
        pointsTableDiv.innerHTML = `
            <table class="points-table">
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(pointsTable).map(([team, stats]) => `
                        <tr>
                            <td>${team.charAt(0)}</td>
                            <td>${team}</td>
                            <td>${stats.played}</td>
                            <td>${stats.wins}</td>
                            <td>${stats.draws}</td>
                            <td>${stats.losses}</td>
                            <td>${stats.goalDiff}</td>
                            <td>${stats.points}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else if (section === 'teams') {
        const searchInput = document.getElementById('team-search');
        const filter = searchInput ? searchInput.value.toLowerCase() : '';
        const sortBy = document.getElementById('team-sort')?.value || 'name';
        let teamArray = Object.entries(teams).flatMap(([group, teamList]) => teamList.map(team => ({ team, group })));
        if (filter) {
            teamArray = teamArray.filter(t => t.team.toLowerCase().includes(filter));
        }
        if (sortBy === 'name') {
            teamArray.sort((a, b) => a.team.localeCompare(b.team));
        } else if (sortBy === 'group') {
            teamArray.sort((a, b) => a.group.localeCompare(b.group));
        }
        teamList.innerHTML = `
            <div class="team-controls">
                <input type="text" id="team-search" placeholder="Search teams..." class="search-bar" onkeyup="updateSection('teams')">
                <select id="team-sort" onchange="updateSection('teams')" class="sort-select">
                    <option value="name">Sort by Name</option>
                    <option value="group">Sort by Group</option>
                </select>
            </div>
            ${Object.keys(teams).map(group => `
                <div class="group-section" style="background: linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})">
                    <h3>Group ${group}</h3>
                    <div class="team-group">
                        ${teamArray.filter(t => t.group === group && t.team.toLowerCase().includes(filter)).map(t => `
                            <button class="team-btn" data-team="${t.team}">${t.team}</button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
        document.querySelectorAll('.team-btn').forEach(button => {
            button.addEventListener('click', () => {
                const team = button.getAttribute('data-team');
                const profile = teamProfiles[team];
                document.getElementById('team-list').innerHTML = `
                    <div class="team-profile">
                        <div class="profile-tabs">
                            <button class="tab-btn active" data-tab="overview">Overview</button>
                            <button class="tab-btn" data-tab="squad">Squad</button>
                            <button class="tab-btn" data-tab="stats">Statistics</button>
                        </div>
                        <div class="tab-content active" data-tab="overview">
                            <div class="profile-header">
                                <img src="${profile.logo}" alt="${team} logo" class="team-logo">
                                <div class="profile-details">
                                    <h3>${team}</h3>
                                    <p><strong>Group Position:</strong> ${profile.groupPosition}</p>
                                    <p><strong>Coach:</strong> ${profile.coach}</p>
                                    <p><strong>Captain:</strong> ${profile.captain}</p>
                                    <p><strong>Founded:</strong> ${profile.founded}</p>
                                    <p><strong>Recent Form:</strong> ${profile.recentForm}</p>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content" data-tab="squad">
                            <table class="player-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${profile.members.map(member => `
                                        <tr>
                                            <td>${member.number}</td>
                                            <td><img src="${member.photo}" alt="${member.name}" class="player-photo"></td>
                                            <td>${member.name}</td>
                                            <td>${member.position}</td>
                                            <td class="${member.status.toLowerCase()}">${member.status}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-content" data-tab="stats">
                            <table class="stats-table">
                                <thead>
                                    <tr>
                                        <th>Matches Played</th>
                                        <th>Wins</th>
                                        <th>Draws</th>
                                        <th>Losses</th>
                                        <th>Goals Scored</th>
                                        <th>Goals Conceded</th>
                                        <th>Assists</th>
                                        <th>Yellow Cards</th>
                                        <th>Red Cards</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${profile.stats.matchesPlayed}</td>
                                        <td>${profile.stats.wins}</td>
                                        <td>${profile.stats.draws}</td>
                                        <td>${profile.stats.losses}</td>
                                        <td>${profile.stats.goalsScored}</td>
                                        <td>${profile.stats.goalsConceded}</td>
                                        <td>${profile.stats.assists}</td>
                                        <td>${profile.stats.yellowCards}</td>
                                        <td>${profile.stats.redCards}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="profile-actions">
                            <button class="close-btn">Close</button>
                            <button class="back-btn">Back to Teams</button>
                        </div>
                    </div>
                `;
                // Tab functionality
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                        btn.classList.add('active');
                        document.querySelector(`.tab-content[data-tab="${btn.getAttribute('data-tab')}"]`).classList.add('active');
                    });
                });
                document.querySelector('.close-btn').addEventListener('click', () => {
                    updateSection('teams');
                });
                document.querySelector('.back-btn').addEventListener('click', () => {
                    updateSection('teams');
                });
            });
        });
    } else if (section === 'knockout') {
        if (knockoutStage.length === 0) {
            for (let group in teams) {
                knockoutStage.push(...teams[group].slice(0, 2));
            }
            knockoutStage = knockoutStage.slice(0, 8);
        }
        knockoutList.innerHTML = `
            <h3>Knockout Stages</h3>
            ${["Quarter Finals", "Semi Finals", "Final"].map(stage => `
                <div class="knockout-stage">
                    <h4>${stage}</h4>
                    <ul>
                        ${knockoutMatches.filter(m => m.stage === stage).map(m => `
                            <li>${m.team1} vs ${m.team2} (${m.status === "Completed" ? `Winner: ${m.winner}` : m.status})</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('')}
        `;
    }
}

document.getElementById('fixtures').classList.remove('hidden');
updateSection('fixtures');