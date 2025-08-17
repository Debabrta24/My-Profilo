const SearchInput = document.querySelector(".searchValu");
const API = "0733487207aa4d338c324211250607";
let name1 = "";

// Search on button click
document.querySelector(".searchIcon").addEventListener("click", function () {
    name1 = SearchInput.value.trim();
    if (name1) {
        checkWeather();
    }
});

// Search on Enter key (mobile-friendly)
SearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        name1 = SearchInput.value.trim();
        if (name1) checkWeather();
    }
});

// Auto-detect location
setTimeout(() => {
    if ("geolocation" in navigator) {
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
                    if (name1) checkWeather();
                } catch (error) {
                    console.error("Location fetch failed:", error);
                }
            },
            (error) => {
                console.error("Geolocation error:", error.message);
            }
        );
    } else {
        console.error("Geolocation not supported on this device.");
    }
}, 1000);

// Fetch weather data
async function checkWeather() {
    if (!name1) return;
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${name1}&aqi=no`);
        const data = await response.json();

        if (data.error) {
            alert("City not found. Try another search.");
            return;
        }

        document.querySelector(".temp").innerHTML = data.current.temp_c + " °C";
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr";
        document.querySelector(".humidity").innerHTML = data.current.humidity + " %";

        // Weather-based icon
        // const condition = data.current.condition.text.toLowerCase();
        // if (condition.includes("rain")) {
        //     document.querySelector(".weatherIcon").src =
        //         "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=870&auto=format&fit=crop";
        // } else if (condition.includes("cloud")) {
        //     document.querySelector(".weatherIcon").src =
        //         "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=870&auto=format&fit=crop";
        // } else {
        //     document.querySelector(".weatherIcon").src =
        //         "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=870&auto=format&fit=crop";
        // }
    } catch (err) {
        console.error("Weather API error:", err);
    }
}
