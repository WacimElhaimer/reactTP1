import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import ForecastCard from './ForecastCard';
import { MaterialIcons } from '@expo/vector-icons';

export default function DailyForecast({ day, forecast }) {
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isEndReached = contentOffset.x + layoutMeasurement.width >= contentSize.width - 10;
    setShowRightArrow(!isEndReached);
  };

  return (
    <View style={styles.dailyContainer}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          style={styles.forecastRow}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {forecast.map((interval) => (
            <ForecastCard key={interval.dt} forecast={interval} />
          ))}
        </ScrollView>
        {showRightArrow && (
          <Animated.View style={styles.arrowContainer}>
            <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dailyContainer: {
    paddingVertical: 10,
    marginBottom: 10,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
    paddingLeft: 10,
  },
  scrollContainer: {
    position: 'relative',
  },
  forecastRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  arrowContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    padding: 5,
  },
});
