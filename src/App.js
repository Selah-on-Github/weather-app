import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


// 1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌아온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const[weather,setweather]=useState(null);
  const [city,setCity]=useState("");
  const [loading,setLoading]=useState(false);
  const cities = ['Paris', 'New York', 'Tokyo', 'Seoul'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=75f02e94ccf566e2fcff4b5dceadb010&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setweather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75f02e94ccf566e2fcff4b5dceadb010&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setweather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />      
          <WeatherButton cities={cities} setCity={setCity}/>
        </div>
      )}
    </div>
  );
}

export default App;
 