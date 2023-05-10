import "./Reset.css";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
    // const link = "GET https://eu1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json";

    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState({});
    const [mapImg, setMapImg] = useState("");
    const [apiError, setApiError] = useState("");

    function handleChange(event) {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
    }

    async function getLocation() {
        try {
            const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
            console.log(API);
            const res = await axios.get(API);
            setLocation(res.data[0]);
            handleMap(res.data[0]);
            setApiError("");
        } catch (error) {
            console.log(error);
            setApiError(error.message);
            setLocation({});
            setMapImg("");
        }
    }

    function handleMap(data) {
        const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=12`;
        setMapImg(API);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="inner-container">
                    <h1>LocationIQ API</h1>
                    <p></p>
                    <input type="text" onChange={handleChange} placeholder="enter location" />
                    <button onClick={getLocation}>Explore</button>
                    <p>{apiError}</p>
                    <h2>{location.display_name}</h2>
                    <p>
                        longitude: {location.lon}, latitude: {location.lat}
                    </p>
                    {mapImg && <img src={mapImg} alt="map" />}
                </div>
            </div>
        </div>
    );
}

export default App;
