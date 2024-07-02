import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface GameQuestion {
  id: number;
  text: string;
  answer: string;
  hint: string | null;
}

const GameQuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/game_questions/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching game questions:', error);
        setError('Error fetching game questions');
      }
    };

    fetchQuestions();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Questions</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.answer}>Answer: {item.answer}</Text>
            {item.hint && <Text style={styles.hint}>Hint: {item.hint}</Text>}
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: 'green',
  },
  hint: {
    fontSize: 14,
    color: 'gray',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GameQuestionList;
