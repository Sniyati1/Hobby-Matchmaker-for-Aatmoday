// Initial Dataset
let hobbies = [
  { id: 1, title: '🏏 Box Cricket', category: 'Sports', setting: 'outdoor', social: 'group', cost: 1000, time: '3-5 hrs/wk', match: 96, desc: 'Play fast-paced turf cricket with friends.', equipment: ['Tennis Ball', 'Cricket Bat'], tips: 'Join local WhatsApp groups to find matches.' },
  { id: 2, title: '🧘 Yoga & Pranayama', category: 'Wellness', setting: 'indoor', social: 'solo', cost: 0, time: '2-4 hrs/wk', match: 92, desc: 'Improve flexibility and mental calm with daily yoga.', equipment: ['Yoga Mat'], tips: 'Start with morning Surya Namaskars.' },
  { id: 3, title: '♟️ Chess', category: 'Mind Games', setting: 'indoor', social: 'solo', cost: 0, time: '3-6 hrs/wk', match: 89, desc: 'Sharpen strategic thinking on online chess apps.', equipment: ['Chess Board / Mobile App'], tips: 'Practice tactics daily.' },
  { id: 4, title: '💃 Dance Choreography', category: 'Dance', setting: 'indoor', social: 'group', cost: 1500, time: '3-5 hrs/wk', match: 87, desc: 'Learn energetic dance routines.', equipment: ['Comfortable Shoes', 'Speaker'], tips: 'Follow YouTube choreography tutorials first.' }
];

let activeFilter = 'all';
let favorites = [];

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const quizForm = document.getElementById('quizForm');
const prefBudget = document.getElementById('prefBudget');
const searchInput = document.getElementById('searchInput');
const detailDrawer = document.getElementById('detailDrawer');
const favSidebar = document.getElementById('favSidebar');
const adminPanel = document.getElementById('adminPanel');
const addHobbyForm = document.getElementById('addHobbyForm');

// --- LIGHT / DARK MODE SYSTEM ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerText = '☀️';
  }
}

themeToggleBtn.onclick = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
  addLog(`Theme changed to ${newTheme} mode.`);
};

// Drawers View Control
document.getElementById('openAdminBtn').onclick = () => {
  adminPanel.classList.remove('hidden');
  renderAdminHobbies();
  addLog('Admin panel opened.');
};
document.getElementById('closeAdminBtn').onclick = () => adminPanel.classList.add('hidden');

document.getElementById('openFavBtn').onclick = () => favSidebar.classList.remove('hidden');
document.getElementById('closeFavSidebar').onclick = () => favSidebar.classList.add('hidden');
document.getElementById('closeDetailDrawer').onclick = () => detailDrawer.classList.add('hidden');

// Budget Slider Display
prefBudget.oninput = (e) => {
  document.getElementById('budgetValue').innerText = '₹' + Number(e.target.value).toLocaleString('en-IN');
};

// Render Hobby Cards
function renderHobbies(list) {
  const grid = document.getElementById('hobbyGrid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">No hobbies match your criteria.</p>`;
    return;
  }

  list.forEach(item => {
    const isFav = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'hobby-card';
    card.innerHTML = `
      <div>
        <div class="hobby-card-header">
          <span class="badge">${item.category}</span>
          <span class="badge badge-match">${item.match}% Match</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="hobby-card-footer">
        <button onclick="openDrawer(${item.id})" class="btn-danger-text" style="color:var(--primary-color);">View Details →</button>
        <button onclick="toggleFav(${item.id})" class="icon-btn">${isFav ? '❤️' : '🤍'}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('statHobbiesCount').innerText = hobbies.length;
}

// Search and Filter
searchInput.oninput = filterHobbies;

document.querySelectorAll('.chip').forEach(btn => {
  btn.onclick = (e) => {
    activeFilter = e.target.getAttribute('data-filter');
    document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterHobbies();
  };
});

function filterHobbies() {
  const query = searchInput.value.toLowerCase();
  const filtered = hobbies.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(query) || h.category.toLowerCase().includes(query);
    const matchesChip = activeFilter === 'all' || 
                        (activeFilter === 'free' && h.cost === 0) || 
                        (activeFilter === h.setting);
    return matchesSearch && matchesChip;
  });
  renderHobbies(filtered);
}

// Matching Algorithm
quizForm.onsubmit = (e) => {
  e.preventDefault();
  const setting = document.getElementById('prefSetting').value;
  const social = document.getElementById('prefSocial').value;
  const budget = parseInt(prefBudget.value);

  hobbies.forEach(h => {
    let score = 50;
    if (setting === 'any' || h.setting === setting) score += 20;
    if (social === 'any' || h.social === social) score += 15;
    if (h.cost <= budget) score += 15;
    h.match = Math.min(score, 99);
  });

  hobbies.sort((a, b) => b.match - a.match);
  filterHobbies();
  addLog('User submitted preference questionnaire.');
};

// Open Detail Drawer
function openDrawer(id) {
  const item = hobbies.find(h => h.id === id);
  document.getElementById('drawerTitle').innerText = item.title;
  document.getElementById('drawerCategory').innerText = item.category;
  document.getElementById('drawerDesc').innerText = item.desc;
  document.getElementById('drawerCost').innerText = item.cost === 0 ? 'Free' : `₹${item.cost}/mo`;
  document.getElementById('drawerTime').innerText = item.time;
  document.getElementById('drawerTips').innerText = item.tips;

  const equipList = document.getElementById('drawerEquipment');
  equipList.innerHTML = item.equipment.map(e => `<li>${e}</li>`).join('');

  const favBtn = document.getElementById('drawerFavBtn');
  favBtn.onclick = () => { toggleFav(item.id); openDrawer(item.id); };
  favBtn.innerText = favorites.includes(item.id) ? '💔 Remove from Favorites' : '❤️ Save to Favorites';

  detailDrawer.classList.remove('hidden');
}

// Favorites Logic
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fId => fId !== id);
  } else {
    favorites.push(id);
  }
  document.getElementById('favCount').innerText = favorites.length;
  filterHobbies();
  renderFavoritesList();
}

function renderFavoritesList() {
  const container = document.getElementById('favList');
  container.innerHTML = '';
  if (favorites.length === 0) {
    container.innerHTML = `<p class="text-muted">No saved hobbies yet.</p>`;
    return;
  }
  favorites.forEach(id => {
    const item = hobbies.find(h => h.id === id);
    if (!item) return;
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <strong>${item.title}</strong>
      <button onclick="toggleFav(${item.id})" class="btn-danger-text">Remove</button>
    `;
    container.appendChild(div);
  });
}

// Admin Panel Actions
addHobbyForm.onsubmit = (e) => {
  e.preventDefault();
  const newHobby = {
    id: Date.now(),
    title: document.getElementById('newTitle').value,
    category: document.getElementById('newCategory').value,
    setting: document.getElementById('newSetting').value,
    cost: parseInt(document.getElementById('newCost').value) || 0,
    social: document.getElementById('newSocial').value,
    desc: document.getElementById('newDesc').value,
    time: '2-4 hrs/wk',
    match: 80,
    equipment: ['Standard items'],
    tips: 'Practice regularly.'
  };

  hobbies.unshift(newHobby);
  addHobbyForm.reset();
  renderHobbies(hobbies);
  renderAdminHobbies();
  addLog(`Added hobby: "${newHobby.title}"`);
};

function renderAdminHobbies() {
  const container = document.getElementById('adminHobbiesList');
  container.innerHTML = '';
  hobbies.forEach(h => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <div>
        <strong>${h.title}</strong>
        <div class="text-muted">${h.category} • ₹${h.cost}</div>
      </div>
      <button onclick="deleteHobby(${h.id})" class="btn-danger-text">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteHobby(id) {
  const item = hobbies.find(h => h.id === id);
  hobbies = hobbies.filter(h => h.id !== id);
  renderHobbies(hobbies);
  renderAdminHobbies();
  addLog(`Deleted hobby: "${item ? item.title : id}"`);
}

function addLog(msg) {
  const container = document.getElementById('adminLogs');
  const time = new Date().toLocaleTimeString();
  const p = document.createElement('p');
  p.innerText = `[${time}] ${msg}`;
  container.prepend(p);
}

// Initialize
initTheme();
renderHobbies(hobbies);