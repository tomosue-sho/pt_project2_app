// ExamList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// Examの型定義
interface Exam {
  id: number;
  year: number;
}

const ExamList = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/exams/')
      .then(response => {
        setExams(response.data);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Year: {item.year}</Text>
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
});

export default ExamList;
