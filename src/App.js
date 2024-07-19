import { useState } from "react";
import "./App.css";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { RiCelsiusFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  const day = date.getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[date.getMonth()];

  const year = date.getFullYear();
  const formattedDate = `${dayName} ${day} ${monthName} ${year}`;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = `${hours}:${minutes}${ampm}`;

  const getWeather = (e) => {
    e.preventDefault();
    const key = "2f1af375771e27cd15ac6ea465735161";
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input},${input},${input}&appid=${key}`
    )
      .then((Response) => Response.json())
      .then((data) => {
        if (data.cod === 200) {
          setInput("");
          setCity(`${data.name}, ${data.sys.country}`);
          setWeather(data.main.temp - 273.15);
          setDesc(data.weather[0].description);
          toast.success("Successfully fetched todays weather");
        } else {
          setInput("");
          setCity("");
          setWeather("");
          setDesc("");
          toast.error(data.message);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error(e.message);
      });
  };
  return (
    <section>
      <div className="holdAll">
        <h1 className="Weather">Weather App</h1>
        <div className="holdAll2">
          <form onSubmit={getWeather}>
            <input
              type="text"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>
          {city && (
            <div className="holdSecond">
              <div>
                <h1>{city}</h1>
                <h1>
                  <TiWeatherPartlySunny />
                  {Math.floor(weather)}
                  <RiCelsiusFill />
                </h1>
                <p>{desc}</p>
              </div>

              <div>
                <h1>{strTime}</h1>
                <p>{formattedDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Toaster /> */}
      <Toaster position="top-right" reverseOrder={true} />
    </section>
  );
}

export default App;
