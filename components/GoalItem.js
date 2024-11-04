import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, TextInput, StyleSheet } from 'react-native';

const GoalItem = ({ goal, onDelete, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleDelete = () => {
    onDelete();
    setModalVisible(false);
  };

  const handleUpdate = () => {
    onUpdate(editedGoal);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.goalItem}>
      <Text>{goal}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
          <Text style={styles.editButton}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Êtes-vous sûr de vouloir supprimer :</Text>
            <Text style={styles.goalTextInModal}>{goal} ?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
              <Button title="Supprimer" onPress={handleDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Modifier l'objectif :</Text>
            <TextInput
              style={styles.input}
              value={editedGoal}
              onChangeText={setEditedGoal}
            />
            <View style={styles.buttonContainer}>
              <Button title="Annuler" onPress={() => setEditModalVisible(false)} />
              <Button title="Modifier" onPress={handleUpdate} color="blue" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 5
  },
  actions: {
    flexDirection: 'row'
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
    marginRight: 10
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  goalTextInModal: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 10,
    padding: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  }
});

export default GoalItem;
