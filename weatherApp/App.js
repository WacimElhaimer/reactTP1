import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Animated, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import DailyForecast from './components/DailyForecast';
import AirQuality from './components/AirQuality';
import styles from './components/styles';

const backgrounds = {
  clear: require('./assets/backgrounds/clear.jpg'),
  clouds: require('./assets/backgrounds/clouds.jpg'),
  rain: require('./assets/backgrounds/rain.jpg'),
  snow: require('./assets/backgrounds/snow.jpg'),
  storm: require('./assets/backgrounds/storm.jpg'),
};

const getBackgroundImage = (weatherCondition) => {
  if (weatherCondition === 'Clear') return backgrounds.clear;
  if (weatherCondition === 'Clouds') return backgrounds.clouds;
  if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle') return backgrounds.rain;
  if (weatherCondition === 'Snow') return backgrounds.snow;
  if (weatherCondition === 'Thunderstorm') return backgrounds.storm;
  return backgrounds.clouds;
};

const API_KEY = '8b0bba34696e8ac04f3eac5c3e8a8809';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [scrollY] = useState(new Animated.Value(0));
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission refusée pour accéder à la localisation.");
        return;
      }

      try {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
        fetchWeather(loc.coords.latitude, loc.coords.longitude);
        fetchForecast(loc.coords.latitude, loc.coords.longitude);
        fetchAirQuality(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        setErrorMsg("Impossible de récupérer la localisation.");
      }
    })();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
      );

      if (response.data && response.data.main && response.data.weather) {
        setWeather(response.data);
      } else {
        console.error("Données météo incomplètes reçues:", response.data);
        setErrorMsg("Données météo incomplètes.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      setErrorMsg("Impossible de récupérer les données météo.");
    }
  };

  const fetchForecast = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const groupedForecast = groupForecastByDay(response.data.list);
      setForecast(groupedForecast);
    } catch (error) {
      setErrorMsg("Impossible de récupérer les prévisions météo.");
    }
  };

  const fetchAirQuality = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      if (response.data.list && response.data.list.length > 0) {
        setAirQuality(response.data.list[0]);
      } else {
        console.error("Données de qualité de l'air non disponibles.");
        setAirQuality(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la qualité de l'air:", error);
      setAirQuality(null);
    }
  };

  const groupForecastByDay = (forecastList) => {
    return forecastList.reduce((acc, forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });

      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(forecast);
      return acc;
    }, {});
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
        setIsCondensed(scrollOffsetY > 100);
      },
    }
  );

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const airQualityTranslateX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 30],
    extrapolate: 'clamp',
  });

  const backgroundImage = getBackgroundImage(weather?.weather?.[0]?.main);

  return (
    <ImageBackground source={backgroundImage} style={styles.fullScreenBackground}>
      <View style={styles.container}>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : weather && airQuality ? (
          <>
            <Animated.View
              style={[
                styles.headerContainer,
                {
                  transform: [
                    { scale: headerScale },
                    { translateY: headerTranslateY }
                  ]
                },
              ]}
            >
              {isCondensed ? (
                <View style={styles.condensedRow}>
                  <Text style={[styles.condensedText, styles.condensedTextLarge]}>
                    {weather.name} - {Math.round(weather.main.temp)}°C, {weather.weather[0].description}
                  </Text>
                  <Animated.View style={[styles.condensedAQIContainer, { transform: [{ translateX: airQualityTranslateX }] }]}>
                    <Text style={styles.condensedAQI}>Indice AQI : {airQuality.main.aqi}</Text>
                  </Animated.View>
                </View>
              ) : (
                <>
                  <WeatherCard weather={weather} myLocation="Ma localisation" />
                  <AirQuality aqi={airQuality.main.aqi} />
                </>
              )}
            </Animated.View>
            <ScrollView style={styles.forecastContainer} onScroll={onScroll} scrollEventThrottle={16}>
              {Object.keys(forecast).map((day) => (
                <DailyForecast key={day} day={day} forecast={forecast[day]} />
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Chargement des données météo...</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
