// --- 1. НАШ КЛЮЧ MAPILLARY И ГОРОДА ---
const myAccessToken = 'MLY|26266369579645993|cf11c635af876bc5f1a671e0f6401897';

const CITIES = [
    { name: "Лондон", lat: 51.5074, lon: -0.1278 }, { name: "Париж", lat: 48.8566, lon: 2.3522 },
    { name: "Рим", lat: 41.9028, lon: 12.4964 }, { name: "Берлин", lat: 52.5200, lon: 13.4050 },
    { name: "Мадрид", lat: 40.4168, lon: -3.7038 }, { name: "Амстердам", lat: 52.3676, lon: 4.9041 },
    { name: "Вена", lat: 48.2082, lon: 16.3738 }, { name: "Прага", lat: 50.0755, lon: 14.4378 },
    { name: "Варшава", lat: 52.2297, lon: 21.0122 }, { name: "Будапешт", lat: 47.4979, lon: 19.0402 },
    { name: "Стокгольм", lat: 59.3293, lon: 18.0686 }, { name: "Афины", lat: 37.9838, lon: 23.7275 },
    { name: "Стамбул", lat: 41.0082, lon: 28.9784 }, { name: "Москва", lat: 55.7558, lon: 37.6173 },
    { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351 }, { name: "Новосибирск", lat: 55.0084, lon: 82.9357 },
    { name: "Екатеринбург", lat: 56.8389, lon: 60.6057 }, { name: "Казань", lat: 55.7963, lon: 49.1088 },
    { name: "Нижний Новгород", lat: 56.3269, lon: 44.0059 }, { name: "Астана", lat: 51.1694, lon: 71.4491 },
    { name: "Алматы", lat: 43.2220, lon: 76.8512 }, { name: "Минск", lat: 53.9006, lon: 27.5590 },
    { name: "Нью-Йорк", lat: 40.7128, lon: -74.0060 }, { name: "Лос-Анджелес", lat: 34.0522, lon: -118.2437 },
    { name: "Чикаго", lat: 41.8781, lon: -87.6298 }, { name: "Торонто", lat: 43.6510, lon: -79.3470 },
    { name: "Мехико", lat: 19.4326, lon: -99.1332 }, { name: "Сан-Франциско", lat: 37.7749, lon: -122.4194 },
    { name: "Сиэтл", lat: 47.6062, lon: -122.3321 }, { name: "Вашингтон", lat: 38.9072, lon: -77.0369 },
    { name: "Сан-Паулу", lat: -23.5505, lon: -46.6333 }, { name: "Рио-де-Жанейро", lat: -22.9068, lon: -43.1729 },
    { name: "Буэнос-Айрес", lat: -34.6037, lon: -58.3816 }, { name: "Богота", lat: 4.7110, lon: -74.0721 },
    { name: "Лима", lat: -12.0464, lon: -77.0428 }, { name: "Сантьяго", lat: -33.4489, lon: -70.6693 },
    { name: "Токио", lat: 35.6762, lon: 139.6503 }, { name: "Осака", lat: 34.6937, lon: 135.5023 },
    { name: "Сеул", lat: 37.5665, lon: 126.9780 }, { name: "Сингапур", lat: 1.3521, lon: 103.8198 },
    { name: "Гонконг", lat: 22.3193, lon: 114.1694 }, { name: "Бангкок", lat: 13.7563, lon: 100.5018 },
    { name: "Пекин", lat: 39.9042, lon: 116.4074 }, { name: "Шанхай", lat: 31.2304, lon: 121.4737 },
    { name: "Куала-Лумпур", lat: 3.1390, lon: 101.6869 }, { name: "Джакарта", lat: -6.2088, lon: 106.8456 },
    { name: "Манила", lat: 14.5995, lon: 120.9842 }, { name: "Дели", lat: 28.6139, lon: 77.2090 },
    { name: "Мумбаи", lat: 19.0760, lon: 72.8777 }, { name: "Бангалор", lat: 12.9716, lon: 77.5946 },
    { name: "Дубай", lat: 25.2048, lon: 55.2708 }, { name: "Эр-Рияд", lat: 24.7136, lon: 46.6753 },
    { name: "Тель-Авив", lat: 32.0853, lon: 34.7818 }, { name: "Каир", lat: 30.0444, lon: 31.2357 },
    { name: "Кейптаун", lat: -33.9249, lon: 18.4241 }, { name: "Йоханнесбург", lat: -26.2041, lon: 28.0473 },
    { name: "Сидней", lat: -33.8688, lon: 151.2093 }, { name: "Мельбурн", lat: -37.8136, lon: 144.9631 },
    { name: "Окленд", lat: -36.8485, lon: 174.7633 }
];

async function getRandomImageId() {
    const cleanToken = myAccessToken.trim(); 
    while (true) {
        const city = CITIES[Math.floor(Math.random() * CITIES.length)];
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
let viewer;
let preloadedNextId = null; 
let timerInterval;
let timeLeft = 120; // 2 минуты

// --- 3. ЛОГИКА ТАЙМЕРА ---
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer-display').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    // ВАЖНОЕ ИСПРАВЛЕНИЕ: Сначала убиваем старый таймер, если он работал!
    clearInterval(timerInterval); 
    
    timeLeft = 120;
    updateTimerDisplay();
    const timerDisplay = document.getElementById('timer-display');
    timerDisplay.style.color = "white";

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 10) { timerDisplay.style.color = "#F44336"; } // Краснеет последние 10 сек

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (playerMarker === null) {
                // Если игрок ничего не нажал, ставим метку по умолчанию в центр
                playerMarker = L.marker([20, 0]).addTo(map); 
            }
            document.getElementById('guess-btn').click(); // Имитируем клик
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}

// --- 4. МЕНЮ И ПРЕДЗАГРУЗКА ПЕРВОГО РАУНДА ---
async function preloadNext() {
    preloadedNextId = await getRandomImageId();
}
// Запускаем поиск первой точки СРАЗУ, как только страница открылась
preloadNext();

document.getElementById('start-game-btn').addEventListener('click', async function() {
    this.innerText = "Загрузка... ⏳";
    
    // Ждем, пока фоновый поиск найдет первую точку (если игрок нажал слишком быстро)
    while (!preloadedNextId) { await new Promise(r => setTimeout(r, 100)); }

    // Скрываем меню и показываем таймер
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('timer-display').style.display = 'block';
    
    // Инициализируем панораму
    viewer = new Viewer({ accessToken: myAccessToken, container: 'pano-container', imageId: preloadedNextId });
    
    preloadedNextId = null;
    preloadNext(); // Начинаем искать точку для второго раунда
    startTimer();
});

document.getElementById('settings-btn').addEventListener('click', function() {
    alert("⚙️ Настройки (выбор языка, времени и сложности) появятся в будущих обновлениях!");
});

// --- 5. НАСТРОЙКА КАРТЫ (LEAFLET) ---
const map = L.map('map-container').setView([20, 0], 2);
L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=ru&x={x}&y={y}&z={z}', { maxZoom: 18 }).addTo(map);

let playerMarker = null; let answerMarker = null; let answerLine = null;

map.on('click', function(e) {
    if (document.getElementById('result-overlay').style.display === 'block') return;
    if (playerMarker === null) { playerMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map); } 
    else { playerMarker.setLatLng([e.latlng.lat, e.latlng.lng]); }
});

const mapContainer = document.getElementById('map-container');
const toggleMapBtn = document.getElementById('toggle-map-btn');

toggleMapBtn.addEventListener('click', function() {
    if (mapContainer.style.display === 'none' || mapContainer.style.display === '') {
        mapContainer.style.display = 'block'; toggleMapBtn.innerText = '❌ Закрыть карту'; map.invalidateSize(); 
    } else {
        mapContainer.style.display = 'none'; toggleMapBtn.innerText = '🗺️ Карта';
    }
});

// --- 6. МАТЕМАТИКА ОЧКОВ И КНОПКИ ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))); 
}

document.getElementById('guess-btn').addEventListener('click', async function() {
    if (playerMarker === null) { alert("Сначала открой карту и поставь метку!"); return; }

    stopTimer(); // Останавливаем таймер!

    const currentImage = await viewer.getImage();
    const realLat = currentImage.lngLat.lat; const realLng = currentImage.lngLat.lng;
    const playerLat = playerMarker.getLatLng().lat; const playerLng = playerMarker.getLatLng().lng;

    const distance = Math.round(calculateDistance(realLat, realLng, playerLat, playerLng));
    let score = 5000 * Math.pow(0.998, distance); 
    score = distance < 0.1 ? 5000 : Math.max(0, Math.round(score));

    answerMarker = L.marker([realLat, realLng]).addTo(map).bindPopup("Правильный ответ").openPopup();
    answerLine = L.polyline([[playerLat, playerLng], [realLat, realLng]], {color: 'red', weight: 4}).addTo(map);
    map.fitBounds([[playerLat, playerLng], [realLat, realLng]], { padding: [30, 30] });
    
    document.getElementById('result-distance').innerText = `Отклонение: ${distance} км`;
    document.getElementById('result-score').innerText = score;

    const titleElement = document.getElementById('result-title');
    if (distance <= 300) { titleElement.innerText = "Идеальное попадание! 🎯"; titleElement.style.color = "#4CAF50"; confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } }); } 
    else if (distance <= 1500) { titleElement.innerText = "Неплохо! 👏"; titleElement.style.color = "#FFEB3B"; } 
    else { titleElement.innerText = "Упс... Мимо 🌍"; titleElement.style.color = "#F44336"; }

    this.style.display = 'none';
    document.getElementById('result-overlay').style.display = 'block';
});

document.getElementById('next-btn').addEventListener('click', async function() {
    this.innerText = 'Загрузка... ⏳';
    
    if (preloadedNextId) { viewer.moveTo(preloadedNextId); } 
    else { const newId = await getRandomImageId(); viewer.moveTo(newId); }

    preloadedNextId = null; preloadNext();

    if (playerMarker) { map.removeLayer(playerMarker); playerMarker = null; }
    if (answerMarker) { map.removeLayer(answerMarker); answerMarker = null; }
    if (answerLine) { map.removeLayer(answerLine); answerLine = null; }
    map.setView([20, 0], 2);

    document.getElementById('result-overlay').style.display = 'none';
    document.getElementById('guess-btn').style.display = 'block';
    
    this.innerText = 'Следующий раунд ➡️';
    startTimer(); // Перезапускаем таймер!
});

// --- 7. АНТИ-ЧИТ ---
document.addEventListener('contextmenu', e => e.preventDefault());