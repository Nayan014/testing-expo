import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface toDoItem {
  task: string;
  isComplected: boolean;
}

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState<number | null>(null);
  const [taskList, setTaskList] = useState<toDoItem[]>([]);

  const taskItem = ({ item, index }: { item: toDoItem; index: number }) => {
    return (
      <TouchableOpacity
        key={`${index}${item.task}`}
        onPress={() => {
          setEditTask(index);
          setTask(item.task);
          setModalVisible(true);
        }}
      >
        <View style={{ padding: 14 }}>
          <Text>
            {item.task.slice(0, 1).toUpperCase() + item.task.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addEditTask = () => {
    if (!task) return;
    if (editTask !== null) {
      setTaskList((preState) => {
        preState[editTask].task = task;
        return preState;
      });
      setEditTask(null);
    } else {
      setTaskList((preState) => {
        preState.push({
          task,
          isComplected: false,
        });
        return preState;
      });
    }

    setTask("");
    setModalVisible(!modalVisible);
  };

  const modalView = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setTask("");
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setTask("");
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={{ width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder="Enter Task"
                value={task}
                onChangeText={(text) => setTask(text)}
              />
              <View style={{ marginTop: 18 }}>
                <Button
                  title={editTask ? "Edit Task" : "Add Task"}
                  onPress={addEditTask}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const addButton = () => (
    <View style={{ position: "absolute", bottom: 18, right: 18 }}>
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ marginTop: 12, flex: 1 }}>
      <FlatList data={taskList} renderItem={taskItem} />
      {modalView()}
      {!modalVisible && addButton()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  addContainer: {
    height: 70,
    width: 70,
    backgroundColor: "red",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 48,
    color: "white",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  input: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
