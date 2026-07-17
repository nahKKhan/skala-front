
const cities = {
    seoul: {
        name: "서울",
        lat: 37.5665,
        lon: 126.9780
    },

    busan: {
        name: "부산",
        lat: 35.1796,
        lon: 129.0756
    },

    jeju: {
        name: "제주",
        lat: 33.4996,
        lon: 126.5312
    },

    gwangju: {
        name: "광주",
        lat: 35.1595,
        lon: 126.8526
    }
};

const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");

citySelect.addEventListener("change", async function () {
    const selectedCity = citySelect.value;
    const city = cities[selectedCity];

    if (!city) {
        weatherBox.innerHTML =
            "<p>도시를 선택하면 날씨 정보가 표시됩니다.</p>";

        return;
    }

    weatherBox.innerHTML = `
        <p><strong>${city.name}</strong> 날씨를 불러오는 중... ⏳</p>
    `;

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${city.lat}` +
        `&longitude=${city.lon}` +
        `&current=temperature_2m,relative_humidity_2m`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("날씨 데이터를 가져오지 못했습니다.");
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;
        const humidity = data.current.relative_humidity_2m;

        const temperatureUnit =
            data.current_units.temperature_2m;

        const humidityUnit =
            data.current_units.relative_humidity_2m;

        weatherBox.innerHTML = `
            <h3 style=\"margin-top:5px; margin-bottom:5px;\">🌤 ${city.name}의 날씨</h3>
            <p>🌡 온도: ${temperature}${temperatureUnit}</p>
            <p>💧 습도: ${humidity}${humidityUnit}</p>
            <p>📍 위도: ${city.lat}</p>
            <p>📍 경도: ${city.lon}</p>
        `;
    } catch (error) {
        console.error(error);

        weatherBox.innerHTML = `
            <p>날씨 정보를 불러오지 못했습니다. 😢</p>
            <p>잠시 후 다시 시도해 주세요.</p>
        `;
    }
});