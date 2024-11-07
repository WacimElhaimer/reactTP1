import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function WeatherIcon({ iconCode }) {
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return <Image source={{ uri: iconUrl }} style={styles.icon} />;
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});
