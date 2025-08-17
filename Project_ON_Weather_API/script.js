const SearchInput = document.querySelector(".searchValu");
const API = "0733487207aa4d338c324211250607";
let name1 = "";

// When search button is clicked
document.querySelector(".searchIcon").addEventListener("click", function () {
    name1 = SearchInput.value.trim();
    if (name1) {
        checkWeather();
    }
});

// Get location automatically after 1 second
setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                const data = await response.json();
                const address = data.address;
                const city = address.city || address.town || address.village || "";
                name1 = city;
                checkWeather();
            } catch (error) {
                console.error("Location fetch failed:", error);
            }
        },
        (error) => {
            console.error("Geolocation error:", error.message);
        }
    );
}, 1000);

// Fetch weather data
async function checkWeather() {
    if (!name1) return;
    try {
        const responce = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${name1}&aqi=no`);
        const data = await responce.json();

        document.querySelector(".temp").innerHTML = data.current.temp_c + " °C";
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr";
        document.querySelector(".humidity").innerHTML = data.current.humidity + " %";

        // Change icon based on weather
        if (data.current.condition.text.toLowerCase().includes("rain")) {
            document.querySelector(".weatherIcon").src =
                "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=870&auto=format&fit=crop";
        } else if (data.current.condition.text.toLowerCase().includes("cloud")) {
            document.querySelector(".weatherIcon").src =
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=870&auto=format&fit=crop";
        } else {
            document.querySelector(".weatherIcon").src =
                "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=870&auto=format&fit=crop";
        }
    } catch (err) {
        console.error("Weather API error:", err);
    }
}
