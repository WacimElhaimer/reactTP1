import React from 'react';
import { View, Text } from 'react-native';
import WeatherIcon from './WeatherIcon';
import AirQuality from './AirQuality';
import styles from './styles';

export default function ForecastCard({ forecast, aqi, condensed }) {
  const temperature = Math.round(forecast.main.temp);
  const iconCode = forecast.weather[0].icon;
  const dateTime = new Date(forecast.dt * 1000);
  const hour = dateTime.getHours();

  return (
    <View style={[styles.card, condensed && styles.condensedCard]}>
      <Text style={styles.time}>{hour}:00</Text>
      <WeatherIcon iconCode={iconCode} />
      <Text style={styles.temperature}>{temperature}°C</Text>
      {aqi && <AirQuality aqi={aqi} />}
    </View>
  );
}
