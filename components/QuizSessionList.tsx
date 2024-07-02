import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// QuizSessionの型定義
interface QuizSession {
  id: number;
  user: number;
  correct_answers: number;
  total_questions: number;
}

const QuizSessionList = () => {
  const [quizSessions, setQuizSessions] = useState<QuizSession[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/quiz_sessions/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuizSessions(response.data);
      } catch (error) {
        console.error('Error fetching quiz sessions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={quizSessions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>User ID: {item.user}</Text>
            <Text>Correct Answers: {item.correct_answers}</Text>
            <Text>Total Questions: {item.total_questions}</Text>
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

export default QuizSessionList;
