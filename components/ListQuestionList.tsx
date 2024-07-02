import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';
import moment from 'moment';

interface ListQuestion {
  id: number;
  user: string;
  content: string;
  category: string;
  has_answer: boolean;
  created_at: string;
}

const ListQuestionList = () => {
  const [questions, setQuestions] = useState<ListQuestion[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/list_questions/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data); // レスポンスをコンソールに出力
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching list questions:', error);
      });
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.user}>User: {item.user}</Text>
            <Text style={styles.content}>Content: {item.content}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.hasAnswer}>Has Answer: {item.has_answer ? "Yes" : "No"}</Text>
            <Text style={styles.date}>Created At: {formatDate(item.created_at)}</Text>
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
  user: {
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 10,
  },
  category: {
    fontStyle: 'italic',
  },
  hasAnswer: {
    color: 'green',
  },
  date: {
    color: 'gray',
  },
});

export default ListQuestionList;
