import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
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
            const res = await axios.get(API);
            setLocation(res.data[0]);
            handleMap(res.data[0]);
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
        <div>
            <input type="text" onChange={handleChange} placeholder="enter location" />
            <button onClick={getLocation}>Explore!</button>
            <p>{apiError}</p>
            <p>{location.display_name}</p>
            <p>
                Latitude: {location.lat} Longitude: {location.lon}
            </p>
            {mapImg && <img src={mapImg} alt="the map" />}
        </div>
    );
}

export default App;
