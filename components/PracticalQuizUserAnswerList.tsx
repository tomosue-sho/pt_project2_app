// components/PracticalQuizUserAnswerList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface PracticalQuizUserAnswer {
  id: number;
  selected_choices: number[];
  answered_at: string;
  start_time: string;
  end_time: string;
  user: number;
  question: number;
  quiz_session: number | null;
}

const PracticalQuizUserAnswerList = () => {
  const [userAnswers, setUserAnswers] = useState<PracticalQuizUserAnswer[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      axios.get('http://127.0.0.1:8000/api/practical_answers/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserAnswers(response.data);
      })
      .catch(error => {
        console.error('Error fetching practical quiz user answers:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={userAnswers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.answerText}>User ID: {item.user}</Text>
            <Text style={styles.answerText}>Question ID: {item.question}</Text>
            <Text style={styles.answerText}>Selected Choices: {item.selected_choices.join(', ')}</Text>
            <Text style={styles.answerText}>Answered At: {item.answered_at}</Text>
            <Text style={styles.answerText}>Start Time: {item.start_time}</Text>
            <Text style={styles.answerText}>End Time: {item.end_time}</Text>
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
  answerText: {
    fontWeight: 'bold',
  },
});

export default PracticalQuizUserAnswerList;
