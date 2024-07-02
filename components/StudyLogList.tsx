import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// StudyLogの型定義
interface StudyLog {
  id: number;
  study_date: string;
  study_duration: number;
  study_content: string;
}

const StudyLogList = () => {
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/study_logs/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudyLogs(response.data);
      } catch (error) {
        console.error('Error fetching study logs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={studyLogs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.study_date}</Text>
            <Text style={styles.duration}>{item.study_duration} 分</Text>
            <Text>{item.study_content}</Text>
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
  date: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  duration: {
    color: '#666',
    marginBottom: 5,
  },
});

export default StudyLogList;
