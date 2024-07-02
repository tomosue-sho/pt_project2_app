// QuizUserAnswerList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// 型定義
interface QuizUserAnswer {
  id: number;
  selected_choices: number[];
  answered_at: string;
  start_time: string;
  end_time: string;
  user: number;
  question: number;
  quiz_session: number | null;
}

const QuizUserAnswerList = () => {
  const [quizUserAnswers, setQuizUserAnswers] = useState<QuizUserAnswer[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/quiz_user_answers/')
      .then(response => {
        setQuizUserAnswers(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz user answers:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={quizUserAnswers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Selected Choices: {item.selected_choices.join(', ')}</Text>
            <Text style={styles.text}>Answered At: {item.answered_at}</Text>
            <Text style={styles.text}>Start Time: {item.start_time}</Text>
            <Text style={styles.text}>End Time: {item.end_time}</Text>
            <Text style={styles.text}>User: {item.user}</Text>
            <Text style={styles.text}>Question: {item.question}</Text>
            <Text style={styles.text}>Quiz Session: {item.quiz_session}</Text>
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
  text: {
    fontSize: 14,
  },
});

export default QuizUserAnswerList;
