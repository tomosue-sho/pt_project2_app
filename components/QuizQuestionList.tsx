// QuizQuestionList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

// 型定義
interface Choice {
  id: number;
  choice_text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id: number;
  choices: Choice[];
  point: number;
  time: string;
  question_number: number;
  question_text: string;
  question_image: string | null;
  answer_text: string;
  answer_video_url: string | null;
  exam: number;
  field: number;
}

const QuizQuestionList = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/quiz_questions/')
      .then(response => {
        setQuizQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={quizQuestions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.questionText}>{item.question_text}</Text>
            {item.question_image && (
              <Image
                source={{ uri: item.question_image }}
                style={styles.image}
              />
            )}
            <View style={styles.choicesContainer}>
              {item.choices.map(choice => (
                <Text key={choice.id} style={styles.choiceText}>
                  {choice.choice_text} {choice.is_correct ? '(Correct)' : ''}
                </Text>
              ))}
            </View>
            <Text style={styles.answerText}>{item.answer_text}</Text>
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
  choicesContainer: {
    marginTop: 10,
  },
  choiceText: {
    fontSize: 14,
  },
  answerText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default QuizQuestionList;
