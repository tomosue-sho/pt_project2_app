// components/PracticalQuizQuestionList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface Choice {
  id: number;
  choice_text: string;
  is_correct: boolean;
  question: number;
}

interface PracticalQuizQuestion {
  id: number;
  choices: Choice[];
  question_text: string;
  question_image: string;
  answer_text: string;
  answer_video_url: string | null;
  exam: number;
  field: number;
}

const PracticalQuizQuestionList = () => {
  const [questions, setQuestions] = useState<PracticalQuizQuestion[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/practical_questions/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching practical quiz questions:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.questionText}>{item.question_text}</Text>
            {item.choices.map(choice => (
              <Text key={choice.id} style={styles.choiceText}>
                {choice.choice_text} {choice.is_correct ? '(Correct)' : ''}
              </Text>
            ))}
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
  choiceText: {
    marginLeft: 10,
  },
});

export default PracticalQuizQuestionList;
