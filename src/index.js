import './style.css'

const getWeather = async (location) => {
  const ApiKey = "JFVG3P4K3FXA2ZLNF5BD7QPCX";
  const BaseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
  const url = `${BaseUrl}/${encodeURI(location)}?unitGroup=metric&key=${ApiKey}&contentType=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("fetching weather data failed:", error);
    return null;
  }
};

const cityInput = document.getElementById('city-input');
const cityContainer = document.querySelector(".city-name");
const tempContainer = document.querySelector(".main-temp");

if (cityInput) {
  cityInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const cityData = await getWeather(cityInput.value.trim());

      if (!cityData) {
        return;
      }

      localStorage.setItem("cityWeather", JSON.stringify(cityData));
      window.location.href = "city.html";
    }
  });
}

if (cityContainer && tempContainer) {
  const savedWeather = localStorage.getItem("cityWeather");

  if (savedWeather) {
    const cityData = JSON.parse(savedWeather);
    const cityName = document.createElement("h2");
    const cityTemp = document.createElement("h3");

    cityName.textContent = cityData.address;
    cityTemp.textContent = `${cityData.days[0].temp}°C`;

    cityContainer.append(cityName);
    tempContainer.append(cityTemp);
  }
}
