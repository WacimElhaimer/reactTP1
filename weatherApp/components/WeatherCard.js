import React from 'react';
import { View, Text } from 'react-native';
import WeatherIcon from './WeatherIcon';
import styles from './styles';

export default function WeatherCard({ weather }) {
  const name = weather?.name || 'Données non disponibles';
  const temperature = weather?.main?.temp !== undefined ? Math.round(weather.main.temp) : '--';
  const description = weather?.weather?.[0]?.description || 'Description indisponible';
  const icon = weather?.weather?.[0]?.icon || '01d';

  return (
    <View style={styles.weatherCard}>
      <Text style={styles.locationLabel}>Ma localisation</Text>
      <Text style={styles.cityName}>{name}</Text>
      <WeatherIcon iconCode={icon} />
      <Text style={styles.mainTemperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
