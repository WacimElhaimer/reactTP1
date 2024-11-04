import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un objectif"
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>
      <ScrollView>
        {goals.map((goal, index) => (
          <Text key={index} style={styles.goalItem}>
            {goal}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flex: 1,
    marginRight: 10,
    padding: 5
  },
  goalItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5
  }
});