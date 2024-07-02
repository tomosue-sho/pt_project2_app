import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface Question {
  id: number;
  question_text: string;
  field: number | null;
  subfield: number | null;
  sub2field: number | null;
  score: number;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correct_answer: string;
}

const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = await getToken(); // トークンを取得
        const response = await axios.get('http://127.0.0.1:8000/api/questions/', {
          headers: {
            Authorization: `Bearer ${token}` // トークンをヘッダーに追加
          }
        });
        setQuestions(response.data);
      } catch (error) {
        setError('Error fetching questions');
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.questionText}>{item.question_text}</Text>
            <Text>Choice 1: {item.choice1}</Text>
            <Text>Choice 2: {item.choice2}</Text>
            <Text>Choice 3: {item.choice3}</Text>
            <Text>Choice 4: {item.choice4}</Text>
            <Text>Correct Answer: {item.correct_answer}</Text>
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
  questionText: {
    fontWeight: 'bold',
  },
});

export default QuestionList;
