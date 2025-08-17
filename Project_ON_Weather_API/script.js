const SearchInput = document.querySelector(".searchValu");

// console.log(SearchInput.value)

const output = document.getElementsByClassName(".searchValu");
document.querySelector(".searchIcon").addEventListener("click", function () {
    name1 = SearchInput.value;
})


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
                // const state = address.state || "";
                // const country = address.country || "";

                // output.innerHTML = `${city}
            //  `
                // const city1 = city;
                // console.log(city1)
                name1 = city
            }
            catch (error) {
                // output.innerHTML = "Failed to fetch location name.";
            }
        },
        (error) => {
            // output.innerHTML = "Error: " + error.message;
        }
    );
}, 1000);



const API = "0733487207aa4d338c324211250607";
let name1 = ""

async function checkWeather() {
    const responce = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API}&q=india/${name1}%20begal&aqi=no`);
    const data = await responce.json();
    document.querySelector(".temp").innerHTML = data.current.temp_c + " °C"
    document.querySelector(".city").innerHTML = data.location.name
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/hr"
    document.querySelector(".humidity").innerHTML = data.current.humidity + " %"
    if (data.current.condition.text === "LIght rain") {
        document.querySelector(".weatherIcon").src = "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

}



setInterval(() => {

    checkWeather();

}, 2000)




// current.condition.text

// "Cloudy"