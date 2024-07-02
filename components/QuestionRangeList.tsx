import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface QuestionRange {
  id: number;
  start_id: number;
  end_id: number;
  exam: number;
}

const QuestionRangeList = () => {
  const [ranges, setRanges] = useState<QuestionRange[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/question_ranges/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRanges(response.data);
      })
      .catch(error => {
        console.error('Error fetching question ranges:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={ranges}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>Exam ID: {item.exam}</Text>
            <Text>Start ID: {item.start_id}</Text>
            <Text>End ID: {item.end_id}</Text>
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
  name: {
    fontWeight: 'bold',
  },
});

export default QuestionRangeList;
