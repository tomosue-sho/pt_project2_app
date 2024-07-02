import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface ToDoItem {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: number;
  completed: boolean;
}

const ToDoItemList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<ToDoItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/todo_items/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodoItems(response.data);
      } catch (error) {
        console.error('Error fetching todo items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo List</Text>
      <FlatList
        data={todoItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.deadline}>Deadline: {item.deadline}</Text>
            <Text style={styles.priority}>Priority: {item.priority}</Text>
            <Text style={styles.completed}>Completed: {item.completed ? 'Yes' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  deadline: {
    fontSize: 14,
  },
  priority: {
    fontSize: 14,
  },
  completed: {
    fontSize: 14,
  },
});

export default ToDoItemList;
