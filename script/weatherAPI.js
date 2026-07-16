// Open-Meteo API에서 현재 날씨를 가져오는 함수
export async function getCurrentWeather(lat, lon) {
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}` +
        `&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("날씨 데이터를 가져오지 못했습니다.");
    }

    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        temperatureUnit: data.current_units.temperature_2m,
        humidityUnit: data.current_units.relative_humidity_2m
    };
}