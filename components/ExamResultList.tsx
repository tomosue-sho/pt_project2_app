// ExamResultList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// ExamResultの型定義
interface ExamResult {
  id: number;
  pass_rate_total: number;
  pass_rate_new_graduates: number;
  pass_rate_non_new_graduates: number;
  exam_year: number;
  applicants_total: number;
  applicants_new_graduates: number;
  examinees_total: number;
  examinees_new_graduates: number;
  passers_total: number;
  passers_new_graduates: number;
}

const ExamResultList = () => {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/exam_results/')
      .then(response => {
        setExamResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching exam results:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={examResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.header}>Year: {item.exam_year}</Text>
            <Text>Total Pass Rate: {item.pass_rate_total.toFixed(2)}%</Text>
            <Text>New Graduates Pass Rate: {item.pass_rate_new_graduates.toFixed(2)}%</Text>
            <Text>Non-New Graduates Pass Rate: {item.pass_rate_non_new_graduates.toFixed(2)}%</Text>
            <Text>Applicants (Total): {item.applicants_total}</Text>
            <Text>Applicants (New Graduates): {item.applicants_new_graduates}</Text>
            <Text>Examinees (Total): {item.examinees_total}</Text>
            <Text>Examinees (New Graduates): {item.examinees_new_graduates}</Text>
            <Text>Passers (Total): {item.passers_total}</Text>
            <Text>Passers (New Graduates): {item.passers_new_graduates}</Text>
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
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExamResultList;
