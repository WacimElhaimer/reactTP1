import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

const InputGoal = ({ newGoal, setNewGoal, addGoalHandler }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ajouter un objectif"
        value={newGoal}
        onChangeText={setNewGoal}
      />
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed ? styles.addButtonPressed : null
        ]}
        onPress={addGoalHandler}
        android_ripple={{ color: '#d3d3d3' }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonPressed: {
    backgroundColor: '#1976D2'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default InputGoal;
