import './style.css'

const getWeather = async (location)=>{
    const ApiKey = "JFVG3P4K3FXA2ZLNF5BD7QPCX";
    const BaseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
    const url = `${BaseUrl}/${encodeURI(location)}?unitGroup=metric&key=${ApiKey}&contentType=json`;
    
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("HTTP error! Status", response.status);
        }
        const data = await response.json();
        console.log(data.days[0].temp)

    } catch (error){
        console.error('fetching weather data failed:', error);
    }
}

getWeather("ghent")