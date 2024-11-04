import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalVisible(false);
  };

  return (
    <View style={styles.goalItem}>
      <Text>{goal}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Êtes-vous sûr de vouloir supprimer : </Text>
            <Text style={styles.goalTextInModal}>{goal} ?</Text>
            <View style={styles.buttonContainer}>
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
              <Button title="Supprimer" onPress={handleDelete} color="red" />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  }
});

export default GoalItem;
