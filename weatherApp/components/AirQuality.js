import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const getAQIColor = (aqi) => {
  switch (aqi) {
    case 1: return '#4CAF50';
    case 2: return '#FFC107';
    case 3: return '#FF9800';
    case 4: return '#FF5722';
    case 5: return '#B71C1C';
    default: return '#9E9E9E';
  }
};

const AirQuality = ({ aqi }) => {
  if (!aqi) return null;

  const color = getAQIColor(aqi);

  return (
    <View style={[styles.aqiContainer, { backgroundColor: color }]}>
      <Text style={styles.aqiText}>Indice AQI : {aqi}</Text>
    </View>
  );
};

export default AirQuality;
