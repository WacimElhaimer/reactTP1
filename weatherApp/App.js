import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const API_KEY = '8b0bba34696e8ac04f3eac5c3e8a8809';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      setWeather(response.data);
    } catch (error) {
      setErrorMsg("Impossible de récupérer les données météo.");
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement des données météo...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  loadingContainer: {
    alignItems: 'center',
  },
});
