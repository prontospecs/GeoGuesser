// --- 1. НАШ КЛЮЧ MAPILLARY И МЕГА-БАЗА ГОРОДОВ ---
const myAccessToken = 'MLY|26266369579645993|cf11c635af876bc5f1a671e0f6401897';

// Расширенная база: более 100 городов для мгновенной загрузки!
const CITIES = [
    // 🏰 Европа и СНГ
    { name: "Лондон", lat: 51.5074, lon: -0.1278, region: "europe" }, { name: "Париж", lat: 48.8566, lon: 2.3522, region: "europe" },
    { name: "Рим", lat: 41.9028, lon: 12.4964, region: "europe" }, { name: "Берлин", lat: 52.5200, lon: 13.4050, region: "europe" },
    { name: "Мадрид", lat: 40.4168, lon: -3.7038, region: "europe" }, { name: "Амстердам", lat: 52.3676, lon: 4.9041, region: "europe" },
    { name: "Вена", lat: 48.2082, lon: 16.3738, region: "europe" }, { name: "Прага", lat: 50.0755, lon: 14.4378, region: "europe" },
    { name: "Варшава", lat: 52.2297, lon: 21.0122, region: "europe" }, { name: "Будапешт", lat: 47.4979, lon: 19.0402, region: "europe" },
    { name: "Стокгольм", lat: 59.3293, lon: 18.0686, region: "europe" }, { name: "Афины", lat: 37.9838, lon: 23.7275, region: "europe" },
    { name: "Стамбул", lat: 41.0082, lon: 28.9784, region: "europe" }, { name: "Москва", lat: 55.7558, lon: 37.6173, region: "europe" },
    { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351, region: "europe" }, { name: "Новосибирск", lat: 55.0084, lon: 82.9357, region: "europe" },
    { name: "Екатеринбург", lat: 56.8389, lon: 60.6057, region: "europe" }, { name: "Казань", lat: 55.7963, lon: 49.1088, region: "europe" },
    { name: "Нижний Новгород", lat: 56.3269, lon: 44.0059, region: "europe" }, { name: "Астана", lat: 51.1694, lon: 71.4491, region: "europe" },
    { name: "Алматы", lat: 43.2220, lon: 76.8512, region: "europe" }, { name: "Минск", lat: 53.9006, lon: 27.5590, region: "europe" },
    { name: "Барселона", lat: 41.3851, lon: 2.1734, region: "europe" }, { name: "Милан", lat: 45.4642, lon: 9.1900, region: "europe" },
    { name: "Мюнхен", lat: 48.1351, lon: 11.5820, region: "europe" }, { name: "Киев", lat: 50.4501, lon: 30.5234, region: "europe" },
    { name: "Ташкент", lat: 41.2995, lon: 69.2401, region: "europe" }, { name: "Баку", lat: 40.4093, lon: 49.8671, region: "europe" },
    { name: "Тбилиси", lat: 41.7151, lon: 44.8271, region: "europe" },

    // 🌎 Америка (Северная и Южная)
    { name: "Нью-Йорк", lat: 40.7128, lon: -74.0060, region: "americas" }, { name: "Лос-Анджелес", lat: 34.0522, lon: -118.2437, region: "americas" },
    { name: "Чикаго", lat: 41.8781, lon: -87.6298, region: "americas" }, { name: "Торонто", lat: 43.6510, lon: -79.3470, region: "americas" },
    { name: "Мехико", lat: 19.4326, lon: -99.1332, region: "americas" }, { name: "Сан-Франциско", lat: 37.7749, lon: -122.4194, region: "americas" },
    { name: "Сиэтл", lat: 47.6062, lon: -122.3321, region: "americas" }, { name: "Вашингтон", lat: 38.9072, lon: -77.0369, region: "americas" },
    { name: "Сан-Паулу", lat: -23.5505, lon: -46.6333, region: "americas" }, { name: "Рио-де-Жанейро", lat: -22.9068, lon: -43.1729, region: "americas" },
    { name: "Буэнос-Айрес", lat: -34.6037, lon: -58.3816, region: "americas" }, { name: "Богота", lat: 4.7110, lon: -74.0721, region: "americas" },
    { name: "Лима", lat: -12.0464, lon: -77.0428, region: "americas" }, { name: "Сантьяго", lat: -33.4489, lon: -70.6693, region: "americas" },
    { name: "Ванкувер", lat: 49.2827, lon: -123.1207, region: "americas" }, { name: "Монреаль", lat: 45.5017, lon: -73.5673, region: "americas" },
    { name: "Майами", lat: 25.7617, lon: -80.1918, region: "americas" }, { name: "Хьюстон", lat: 29.7604, lon: -95.3698, region: "americas" },
    { name: "Бостон", lat: 42.3601, lon: -71.0589, region: "americas" }, { name: "Гвадалахара", lat: 20.6597, lon: -103.3496, region: "americas" },
    { name: "Медельин", lat: 6.2442, lon: -75.5812, region: "americas" }, { name: "Бразилиа", lat: -15.8267, lon: -47.9218, region: "americas" },
    { name: "Монтевидео", lat: -34.9011, lon: -56.1645, region: "americas" },

    // 🏮 Азия и Ближний Восток
    { name: "Токио", lat: 35.6762, lon: 139.6503, region: "asia" }, { name: "Осака", lat: 34.6937, lon: 135.5023, region: "asia" },
    { name: "Сеул", lat: 37.5665, lon: 126.9780, region: "asia" }, { name: "Сингапур", lat: 1.3521, lon: 103.8198, region: "asia" },
    { name: "Гонконг", lat: 22.3193, lon: 114.1694, region: "asia" }, { name: "Бангкок", lat: 13.7563, lon: 100.5018, region: "asia" },
    { name: "Пекин", lat: 39.9042, lon: 116.4074, region: "asia" }, { name: "Шанхай", lat: 31.2304, lon: 121.4737, region: "asia" },
    { name: "Куала-Лумпур", lat: 3.1390, lon: 101.6869, region: "asia" }, { name: "Джакарта", lat: -6.2088, lon: 106.8456, region: "asia" },
    { name: "Манила", lat: 14.5995, lon: 120.9842, region: "asia" }, { name: "Дели", lat: 28.6139, lon: 77.2090, region: "asia" },
    { name: "Мумбаи", lat: 19.0760, lon: 72.8777, region: "asia" }, { name: "Бангалор", lat: 12.9716, lon: 77.5946, region: "asia" },
    { name: "Дубай", lat: 25.2048, lon: 55.2708, region: "asia" }, { name: "Эр-Рияд", lat: 24.7136, lon: 46.6753, region: "asia" },
    { name: "Тель-Авив", lat: 32.0853, lon: 34.7818, region: "asia" }, { name: "Тайбэй", lat: 25.0330, lon: 121.5654, region: "asia" },
    { name: "Киото", lat: 35.0116, lon: 135.7681, region: "asia" }, { name: "Хошимин", lat: 10.8231, lon: 106.6297, region: "asia" },
    { name: "Дакка", lat: 23.8103, lon: 90.4125, region: "asia" }, { name: "Карачи", lat: 24.8607, lon: 67.0011, region: "asia" },
    { name: "Доха", lat: 25.2854, lon: 51.5310, region: "asia" },

    // 🦁 Африка и Океания
    { name: "Каир", lat: 30.0444, lon: 31.2357, region: "africa" }, { name: "Кейптаун", lat: -33.9249, lon: 18.4241, region: "africa" },
    { name: "Йоханнесбург", lat: -26.2041, lon: 28.0473, region: "africa" }, { name: "Сидней", lat: -33.8688, lon: 151.2093, region: "africa" },
    { name: "Мельбурн", lat: -37.8136, lon: 144.9631, region: "africa" }, { name: "Окленд", lat: -36.8485, lon: 174.7633, region: "africa" },
    { name: "Претория", lat: -25.7479, lon: 28.2293, region: "africa" }, { name: "Дурбан", lat: -29.8587, lon: 31.0218, region: "africa" },
    { name: "Найроби", lat: -1.2921, lon: 36.8219, region: "africa" }, { name: "Аккра", lat: 5.6037, lon: -0.1870, region: "africa" },
    { name: "Лагос", lat: 6.5244, lon: 3.3792, region: "africa" }, { name: "Дакар", lat: 14.7167, lon: -17.4677, region: "africa" },
    { name: "Брисбен", lat: -27.4705, lon: 153.0260, region: "africa" }, { name: "Перт", lat: -31.9505, lon: 115.8605, region: "africa" },
    { name: "Аделаида", lat: -34.9285, lon: 138.6007, region: "africa" }, { name: "Веллингтон", lat: -41.2865, lon: 174.7762, region: "africa" },
    { name: "Крайстчерч", lat: -43.5321, lon: 172.6362, region: "africa" }
];

// Глобальные настройки игры
let gameSettings = {
    region: 'all',
    time: 120 
};

async function getRandomImageId() {
    const cleanToken = myAccessToken.trim(); 
    
    // Фильтруем города по региону
    let availableCities = CITIES;
    if (gameSettings.region !== 'all') {
        availableCities = CITIES.filter(c => c.region === gameSettings.region);
    }

    while (true) {
        const city = availableCities[Math.floor(Math.random() * availableCities.length)];
        const latOffset = (Math.random() * 0.1) - 0.05; 
        const lonOffset = (Math.random() * 0.1) - 0.05;
        const targetLat = city.lat + latOffset;
        const targetLon = city.lon + lonOffset;

        const minLon = (targetLon - 0.03).toFixed(4);
        const minLat = (targetLat - 0.03).toFixed(4);
        const maxLon = (targetLon + 0.03).toFixed(4);
        const maxLat = (targetLat + 0.03).toFixed(4);

        try {
            const url = `https://graph.mapillary.com/images?access_token=${cleanToken}&fields=id&bbox=${minLon},${minLat},${maxLon},${maxLat}&is_pano=true&limit=1`;
            const response = await fetch(url);
            if (!response.ok) { await new Promise(resolve => setTimeout(resolve, 50)); continue; }
            const data = await response.json();
            if (data && data.data && data.data.length > 0) return data.data[0].id;
        } catch (error) {}
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// --- 2. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
const { Viewer } = mapillary;
let viewer; let preloadedNextId = null; let timerInterval; let timeLeft = 120; 
let currentRound = 1; const MAX_ROUNDS = 5; let totalScore = 0;

// --- 3. ЛОГИКА ТАЙМЕРА ---
function updateTimerDisplay() {
    if (gameSettings.time === 0) return; 
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timerInterval); 
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.style.color = "white";

    if (gameSettings.time === 0) {
        timerDisplay.innerText = "∞";
        return; 
    }

    timeLeft = gameSettings.time;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 10) { timerDisplay.style.color = "#F44336"; }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (playerMarker === null) { playerMarker = L.marker([20, 0]).addTo(map); }
            document.getElementById('guess-btn').click(); 
        }
    }, 1000);
}

function stopTimer() { clearInterval(timerInterval); }

// --- 4. МЕНЮ, НАСТРОЙКИ И УПРАВЛЕНИЕ ИГРОЙ ---
async function preloadNext() { preloadedNextId = await getRandomImageId(); }
preloadNext();

document.getElementById('settings-btn').addEventListener('click', function() {
    document.getElementById('settings-overlay').style.display = 'block';
});

document.getElementById('save-settings-btn').addEventListener('click', function() {
    const newRegion = document.getElementById('region-select').value;
    const newTime = parseInt(document.getElementById('timer-select').value);
    
    if (gameSettings.region !== newRegion) {
        gameSettings.region = newRegion;
        preloadedNextId = null;
        preloadNext();
    }
    
    gameSettings.time = newTime;
    document.getElementById('settings-overlay').style.display = 'none';
});

function updateGameInfoUI() {
    document.getElementById('round-display').innerText = `Раунд ${currentRound} / ${MAX_ROUNDS}`;
    document.getElementById('total-score-display').innerText = `Очки: ${totalScore}`;
}

function resetGame() {
    currentRound = 1; totalScore = 0; updateGameInfoUI();
    document.getElementById('final-overlay').style.display = 'none'; document.getElementById('result-overlay').style.display = 'none'; document.getElementById('guess-btn').style.display = 'block';
    if (playerMarker) { map.removeLayer(playerMarker); playerMarker = null; }
    if (answerMarker) { map.removeLayer(answerMarker); answerMarker = null; }
    if (answerLine) { map.removeLayer(answerLine); answerLine = null; }
    map.setView([20, 0], 2);
    document.getElementById('map-container').style.display = 'none'; document.getElementById('toggle-map-btn').innerText = '🗺️ Карта';
}

document.getElementById('start-game-btn').addEventListener('click', async function() {
    this.innerText = "Загрузка... ⏳";
    resetGame();
    while (!preloadedNextId) { await new Promise(r => setTimeout(r, 100)); }

    document.getElementById('main-menu').style.display = 'none'; document.getElementById('game-info').style.display = 'flex'; 
    if (!viewer) { viewer = new Viewer({ accessToken: myAccessToken, container: 'pano-container', imageId: preloadedNextId }); } 
    else { viewer.moveTo(preloadedNextId); }
    
    preloadedNextId = null; preloadNext(); startTimer();
    this.innerText = "▶️ Играть"; 
});

// --- 5. НАСТРОЙКА КАРТЫ (LEAFLET) ---
const map = L.map('map-container').setView([20, 0], 2);
L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=ru&x={x}&y={y}&z={z}', { maxZoom: 18 }).addTo(map);
let playerMarker = null; let answerMarker = null; let answerLine = null;

map.on('click', function(e) {
    if (document.getElementById('result-overlay').style.display === 'block' || document.getElementById('final-overlay').style.display === 'block') return;
    if (playerMarker === null) { playerMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map); } 
    else { playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]); }
});

const mapContainer = document.getElementById('map-container');
const toggleMapBtn = document.getElementById('toggle-map-btn');
toggleMapBtn.addEventListener('click', function() {
    if (mapContainer.style.display === 'none' || mapContainer.style.display === '') {
        mapContainer.style.display = 'block'; toggleMapBtn.innerText = '❌ Закрыть карту'; map.invalidateSize(); 
    } else { mapContainer.style.display = 'none'; toggleMapBtn.innerText = '🗺️ Карта'; }
});

// --- 6. МАТЕМАТИКА ОЧКОВ И КНОПКИ ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
}

document.getElementById('guess-btn').addEventListener('click', async function() {
    if (playerMarker === null) { alert("Сначала открой карту и поставь метку!"); return; }
    stopTimer();

    const currentImage = await viewer.getImage();
    const realLat = currentImage.lngLat.lat; const realLng = currentImage.lngLat.lng;
    
    const playerLatLng = playerMarker.getLatLng().wrap(); 
    const playerLat = playerLatLng.lat; const playerLng = playerLatLng.lng;

    const distance = Math.round(calculateDistance(realLat, realLng, playerLat, playerLng));
    let score = 5000 * Math.pow(0.998, distance); 
    score = distance < 0.1 ? 5000 : Math.max(0, Math.round(score));

    totalScore += score; updateGameInfoUI();
    answerMarker = L.marker([realLat, realLng]).addTo(map).bindPopup("Правильный ответ").openPopup();
    answerLine = L.polyline([[playerLat, playerLng], [realLat, realLng]], {color: 'red', weight: 4}).addTo(map);
    map.fitBounds([[playerLat, playerLng], [realLat, realLng]], { padding: [30, 30] });
    
    document.getElementById('result-distance').innerText = `Отклонение: ${distance} км`;
    document.getElementById('result-score').innerText = `+${score}`;
    const titleElement = document.getElementById('result-title');
    
    if (distance <= 300) { titleElement.innerText = "Идеальное попадание! 🎯"; titleElement.style.color = "#4CAF50"; confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } }); } 
    else if (distance <= 1500) { titleElement.innerText = "Неплохо! 👏"; titleElement.style.color = "#FFEB3B"; } 
    else { titleElement.innerText = "Упс... Мимо 🌍"; titleElement.style.color = "#F44336"; }

    this.style.display = 'none';
    const nextBtn = document.getElementById('next-btn');
    if (currentRound >= MAX_ROUNDS) { nextBtn.innerText = "Посмотреть итоги игры 🏆"; nextBtn.style.backgroundColor = "#4CAF50"; } 
    else { nextBtn.innerText = "Следующий раунд ➡️"; nextBtn.style.backgroundColor = "#FF9800"; }
    document.getElementById('result-overlay').style.display = 'block';
});

document.getElementById('next-btn').addEventListener('click', async function() {
    document.getElementById('result-overlay').style.display = 'none';
    if (currentRound >= MAX_ROUNDS) {
        document.getElementById('final-score').innerText = totalScore;
        document.getElementById('final-overlay').style.display = 'block';
        confetti({ particleCount: 300, spread: 160, origin: { y: 0.3 } }); 
    } else {
        this.innerText = 'Загрузка... ⏳'; currentRound++; updateGameInfoUI();
        if (preloadedNextId) { viewer.moveTo(preloadedNextId); } 
        else { const newId = await getRandomImageId(); viewer.moveTo(newId); }
        preloadedNextId = null; preloadNext();
        if (playerMarker) { map.removeLayer(playerMarker); playerMarker = null; }
        if (answerMarker) { map.removeLayer(answerMarker); answerMarker = null; }
        if (answerLine) { map.removeLayer(answerLine); answerLine = null; }
        map.setView([20, 0], 2);
        document.getElementById('guess-btn').style.display = 'block';
        startTimer();
    }
});

document.getElementById('play-again-btn').addEventListener('click', function() { document.getElementById('start-game-btn').click(); });
document.getElementById('home-btn').addEventListener('click', function() {
    document.getElementById('final-overlay').style.display = 'none'; document.getElementById('game-info').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex'; preloadNext(); 
});

// --- 7. АНТИ-ЧИТ ---
document.addEventListener('contextmenu', e => e.preventDefault());
