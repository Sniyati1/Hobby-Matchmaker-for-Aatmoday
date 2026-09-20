// Dataset with authentic pictures & detailed specifications
let hobbies = [
  {
    id: 1,
    title: 'Madhubani Painting',
    category: 'FOLK ART',
    score: '96%',
    cost: 600,
    time: '3 HRS / WK',
    level: 'BEGINNER',
    type: 'regional',
    img: 'madhubani painting.jpg',
    desc: "Mithila's line-and-colour folk art — calming, low-cost, and beautiful even on your first attempt.",
    tools: 'Nib pens, acrylic paints, handmade paper',
    tips: 'Start with simple geometric fish and peacock borders before tackling center subjects.'
  },
  {
    id: 2,
    title: 'Anime & Manga Sketching',
    category: 'ILLUSTRATION',
    score: '94%',
    cost: 500,
    time: '4 HRS / WK',
    level: 'BEGINNER',
    type: 'international',
    img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    desc: 'Character design, inking and webtoon panels — a creative habit you can start with one pen.',
    tools: 'G-pen, India ink, sketchbook or drawing tablet',
    tips: 'Practice basic head proportions using circle-and-cross guidelines first.'
  },
  {
    id: 3,
    title: 'Tabla & Harmonium',
    category: 'CLASSICAL MUSIC',
    score: '91%',
    cost: 1200,
    time: '5 HRS / WK',
    level: 'BEGINNER',
    type: 'regional',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
    desc: 'Learn teental, keharwa and simple bandish in campus baithaks where instruments are usually shared.',
    tools: 'Tabla pair or 39-key Harmonium',
    tips: 'Focus on clean hand placement for Na and Tin strokes.'
  },
  {
    id: 4,
    title: 'Salsa & Hip-Hop Dance',
    category: 'WORLD DANCE',
    score: '90%',
    cost: 800,
    time: '5 HRS / WK',
    level: 'BEGINNER',
    type: 'international',
    img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=600',
    desc: 'Partner-free beginner rows, fest choreography and the quickest icebreaker on campus.',
    tools: 'Flexible sneakers, comfortable athletic wear',
    tips: 'Count steps on 1-2-3, 5-6-7 to stay in rhythm.'
  },
  {
    id: 5,
    title: 'Weekend Trekking',
    category: 'OUTDOORS',
    score: '88%',
    cost: 900,
    time: '6 HRS / WK',
    level: 'BEGINNER',
    type: 'regional',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    desc: 'Sunrise hikes to nearby forts and hills with group transport, usually under ₹900 a trip.',
    tools: 'Trekking shoes, 20L backpack, water flask',
    tips: 'Pack light and wear moisture-wicking clothes.'
  },
  {
    id: 6,
    title: 'Astronomy & Stargazing',
    category: 'SCIENCE',
    score: '87%',
    cost: 0,
    time: '3 HRS / WK',
    level: 'BEGINNER',
    type: 'international',
    img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=600',
    desc: 'Rooftop meteor watches and astrophotography with shared telescopes — free to start.',
    tools: 'Stellarium app, 10x50 Binoculars (optional)',
    tips: 'Give your eyes 20 minutes to adjust to night darkness.'
  },
  {
    id: 7,
    title: 'Regional Home Cooking',
    category: 'FOOD & CRAFT',
    score: '84%',
    cost: 700,
    time: '4 HRS / WK',
    level: 'BEGINNER',
    type: 'regional',
    img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    desc: 'Cook your hometown recipes with others — a fast way to make friends in a new hostel.',
    tools: 'Basic kadhai, spices kit, chef knife',
    tips: 'Master the basic onion-tomato-ginger-garlic tadka ratio.'
  },
  {
    id: 8,
    title: 'Pottery & Ceramics',
    category: 'CREATIVE CRAFT',
    score: '82%',
    cost: 1000,
    time: '4 HRS / WK',
    level: 'BEGINNER',
    type: 'international',
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=600',
    desc: 'Wheel throwing and hand-building — slow, tactile making that quiets a busy semester.',
    tools: 'Terracotta clay, sponge, wire cutter',
    tips: 'Keep clay consistently moist while shaping.'
  }
];

let favorites = [];

// Render Hobby Cards
function renderHobbies(list = hobbies) {
  const grid = document.getElementById('hobby-grid');
  grid.innerHTML = '';

  list.forEach(item => {
    const isFav = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'hobby-card';
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.img}" alt="${item.title}" class="card-img" />
        <span class="badge-category">${item.category}</span>
        <div class="match-circle">
          <span class="percentage">${item.score}</span>
          <span class="label">MATCH</span>
        </div>
      </div>
      
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h3 class="card-title">${item.title}</h3>
          <button class="fav-btn" style="background:none; border:none; cursor:pointer;" onclick="toggleFav(${item.id})">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <p class="card-description">${item.desc}</p>
        
        <button class="view-details-btn" onclick="openDetailsModal(${item.id})">View details →</button>
        
        <hr class="card-divider" />
        
        <div class="metrics-panel">
          <span class="metric-pill">${item.time}</span>
          <span class="metric-pill">${item.cost === 0 ? 'FREE TO START' : 'EST. ₹' + item.cost}</span>
          <span class="metric-pill">${item.level}</span>
          <span class="metric-pill">${item.type.toUpperCase()}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('stat-hobbies-count').innerText = hobbies.length;
}

// Theme Controls
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', 'dark');
  }
}

// Sidebar Drawer Handlers
function toggleProfileSidebar() {
  document.getElementById('profile-drawer').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}

function openSavedDrawer() {
  renderFavorites();
  document.getElementById('saved-drawer').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}

function closeDrawers() {
  document.getElementById('profile-drawer').classList.remove('open');
  document.getElementById('saved-drawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

// Details Modal
function openDetailsModal(id) {
  const hobby = hobbies.find(h => h.id === id);
  if (!hobby) return;
  document.getElementById('modal-title').innerText = hobby.title;
  document.getElementById('modal-body-content').innerHTML = `
    <img src="${hobby.img}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-bottom:1rem;" />
    <p style="margin-bottom: 0.8rem;">${hobby.desc}</p>
    <p style="font-size:0.9rem;"><strong>Required Tools:</strong> ${hobby.tools}</p>
    <p style="font-size:0.9rem; margin-top:0.4rem;"><strong>Beginner Tips:</strong> ${hobby.tips}</p>
  `;
  document.getElementById('details-modal').classList.add('active');
}

function closeDetailsModal() {
  document.getElementById('details-modal').classList.remove('active');
}

// Favorites Functionality
function toggleFav(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  document.getElementById('fav-count').innerText = favorites.length;
  renderHobbies();
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById('saved-list-container');
  container.innerHTML = '';
  const favHobbies = hobbies.filter(h => favorites.includes(h.id));

  if (favHobbies.length === 0) {
    container.innerHTML = '<p class="desc-text">No saved hobbies yet.</p>';
    return;
  }

  favHobbies.forEach(item => {
    const div = document.createElement('div');
    div.style.padding = '0.75rem';
    div.style.border = '1px solid var(--border-color)';
    div.style.borderRadius = '8px';
    div.style.marginBottom = '0.75rem';
    div.innerHTML = `
      <h4>${item.title}</h4>
      <p style="font-size: 0.8rem; color: var(--text-muted);">₹${item.cost} • ${item.category}</p>
      <button class="btn" style="margin-top: 0.5rem; color: red;" onclick="toggleFav(${item.id})">Remove</button>
    `;
    container.appendChild(div);
  });
}

// Tag Input
function addTag(text) {
  const input = document.getElementById('interest-input');
  if (input.value) input.value += ', ' + text;
  else input.value = text;
}

// Filtering Functionality
function filterHobbies(type, event) {
  document.querySelectorAll('.filter-chip').forEach(btn => btn.classList.remove('active'));
  if (event) event.target.classList.add('active');

  if (type === 'all') renderHobbies(hobbies);
  else if (type === 'under700') renderHobbies(hobbies.filter(h => h.cost <= 700));
  else if (type === 'beginner') renderHobbies(hobbies.filter(h => h.level === 'BEGINNER'));
  else if (type === 'under4hr') renderHobbies(hobbies.filter(h => parseInt(h.time) <= 4));
  else renderHobbies(hobbies.filter(h => h.type === type));
}

// Search Functionality
function searchMatches() {
  const text = (document.getElementById('interest-input').value || document.getElementById('search-bar').value).toLowerCase();
  if (!text.trim()) { 
    renderHobbies(); 
    return; 
  }
  const filtered = hobbies.filter(h => 
    h.title.toLowerCase().includes(text) || 
    h.desc.toLowerCase().includes(text) ||
    h.category.toLowerCase().includes(text)
  );
  renderHobbies(filtered);
}

// Profile Save
function saveProfile() {
  alert('Profile details saved successfully!');
  closeDrawers();
}

// Admin Panel Modal Controls
function openAdminModal() {
  closeDrawers();
  document.getElementById('admin-modal').classList.add('active');
}

function closeAdminModal() {
  document.getElementById('admin-modal').classList.remove('active');
}

// Admin Add Hobby Form Submission
function addNewHobby(e) {
  e.preventDefault();
  const title = document.getElementById('new-title').value;
  const type = document.getElementById('new-type').value;
  const cost = Number(document.getElementById('new-cost').value);
  const img = document.getElementById('new-img').value;
  const desc = document.getElementById('new-desc').value;

  const newHobby = {
    id: Date.now(),
    title,
    category: type === 'regional' ? 'CULTURE' : 'CREATIVE',
    score: '90%',
    cost,
    time: '3 HRS / WK',
    level: 'BEGINNER',
    type,
    img,
    desc,
    tools: 'Standard supplies',
    tips: 'Practice regularly.'
  };

  hobbies.push(newHobby);
  renderHobbies();
  closeAdminModal();
  
  document.getElementById('new-title').value = '';
  document.getElementById('new-cost').value = '';
  document.getElementById('new-img').value = '';
  document.getElementById('new-desc').value = '';
  
  alert('New hobby created!');
}

// Initial Call
renderHobbies();
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const environment = document.getElementById('prefSetting').value;
    const socialPreference = document.getElementById('prefSocial').value;
    const budget = document.getElementById('prefBudget').value;

    fetch('/submit_preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            environment: environment,
            social_preference: socialPreference,
            budget: parseInt(budget)
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});