import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// UserAnswerの型定義
interface UserAnswer {
  id: number;
  user: number;
  question: number;
  selected_answer: string;
  timestamp: string;
  is_correct: boolean;
}

const UserAnswerList = () => {
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/user_answers/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserAnswers(response.data);
      } catch (error) {
        console.error('Error fetching user answers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userAnswers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>User ID: {item.user}</Text>
            <Text>Question ID: {item.question}</Text>
            <Text>Selected Answer: {item.selected_answer}</Text>
            <Text>Is Correct: {item.is_correct ? 'Yes' : 'No'}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default UserAnswerList;
