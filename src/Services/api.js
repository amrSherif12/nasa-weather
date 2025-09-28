
export async function fetchWeather(lat, lon, sector, day, month) {

    const res = await fetch(`https://apiv1.pythonanywhere.com/analyze?month=${month}&day=${day}&lat=${lat}&lon=${lon}&URL=${sector}`);
    const data = await res.json();
    return data;
}
