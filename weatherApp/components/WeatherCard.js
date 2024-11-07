import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';

export default function WeatherCard({ weather }) {
  const { name, main, weather: weatherDetails } = weather;
  const temperature = Math.round(main.temp);
  const description = weatherDetails[0].description;
  const icon = weatherDetails[0].icon;

  return (
    <View style={styles.card}>
      <Text style={styles.cityName}>{name}</Text>
      <WeatherIcon iconCode={icon} />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4a90e2',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#e0e0e0',
    marginTop: 10,
    textTransform: 'capitalize',
  },
});
