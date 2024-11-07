import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import InputGoal from './components/InputGoal';
import GoalItem from './components/GoalItem';

export default function App() {
  const [goals, setGoals] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement",
    "Perdre 5 kgs",
    "Gagner en productivité",
    "Apprendre un nouveau langage",
    "Faire une mission en freelance",
    "Organiser un meetup autour de la tech",
    "Faire un triathlon"
  ]);

  const [newGoal, setNewGoal] = useState('');

  const addGoalHandler = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const removeGoalHandler = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const updateGoalHandler = (index, updatedGoal) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = updatedGoal;
    setGoals(updatedGoals);
  };

  return (
    <ImageBackground
      source={require('./assets/app-background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <InputGoal
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          addGoalHandler={addGoalHandler}
        />
        <FlatList
          data={goals}
          renderItem={({ item, index }) => (
            <GoalItem
              goal={item}
              onDelete={() => removeGoalHandler(index)}
              onUpdate={(updatedGoal) => updateGoalHandler(index, updatedGoal)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
});
