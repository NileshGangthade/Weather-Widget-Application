import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function SearchBox() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'd979289acb517e62b0a6e7a83cacfedf';

  const getWeatherInfo = async () => {
    try {
      setLoading(true);
      setError('');
      setWeather(null); // Clear previous weather data

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message || 'City not found');
        return;
      }

      setWeather(data);
      console.log(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.log(err);
    } finally {
      setLoading(false);
      
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== '') {
      getWeatherInfo();
      setCity('');
    }
  };

  return (
    <>
          
          <h1>🌤️ Weather App </h1>
          <form onSubmit={handleSubmit}>
               <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    flexWrap="wrap" // optional: handles small screens
                    mt={2}
                    flexDirection={'column'}
               >
               <div>
                    <TextField
                         id="city"
                         label="City"
                         variant="standard"
                         required
                         className="search"
                         value={city}
                         onChange={handleChange}
                    />
               </div> 
               <div>
                    <Button variant="contained" type="submit">
                         Search
                    </Button>
               </div>
               </Box>
          </form>

      <div style={{ marginTop: '2rem' }}>
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" variant="body1" mt={2}>
            ❌ {error}
          </Typography>
        )}
        {weather && (
  <Card
    sx={{
      width: '100%',
      maxWidth: 600,
      margin: 'auto',
      mt: 3,
      backgroundColor: '#f5f5f5',
      borderRadius: '16px',
      boxShadow: 3,
      textAlign: 'center',
      p: 2,
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom>
        📍 {weather.name}, {weather.sys?.country}
      </Typography>

      <Typography variant="h2" fontWeight="bold">
        {Math.round(weather.main.temp)}°C
      </Typography>

      <Typography variant="subtitle1">
        {weather.weather[0]?.main} – {weather.weather[0]?.description}
      </Typography>
     <div className='weatherImage'>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
        alt={weather.weather[0]?.description}
      />
      </div>

      {/* Additional Data */}
      {weather.main.feels_like && (
        <Typography variant="body2">🤗 Feels like: {Math.round(weather.main.feels_like)}°C</Typography>
      )}
      {weather.main.temp_min && (
        <Typography variant="body2">🌡️ Min Temp: {Math.round(weather.main.temp_min)}°C</Typography>
      )}
      {weather.main.temp_max && (
        <Typography variant="body2">🔥 Max Temp: {Math.round(weather.main.temp_max)}°C</Typography>
      )}
      {weather.main.pressure && (
        <Typography variant="body2">⚖️ Pressure: {weather.main.pressure} hPa</Typography>
      )}
      {weather.visibility && (
        <Typography variant="body2">
          👀 Visibility: {(weather.visibility / 1000).toFixed(1)} km
        </Typography>
      )}
      {weather.sys?.sunrise && (
        <Typography variant="body2">
          🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </Typography>
      )}
      {weather.sys?.sunset && (
        <Typography variant="body2">
          🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </Typography>
      )}
    </CardContent>
  </Card>
)}
      </div>
    </>
  );
}
