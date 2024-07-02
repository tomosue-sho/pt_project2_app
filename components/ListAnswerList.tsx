import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { getToken } from '../utils/auth';

interface ListAnswer {
  id: number;
  question: string;
  user: string;
  content: string;
  created_at: string;
}

const ListAnswerList = () => {
  const [answers, setAnswers] = useState<ListAnswer[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/list_answers/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data); // レスポンスをコンソールに出力
        setAnswers(response.data);
      })
      .catch(error => {
        console.error('Error fetching list answers:', error);
      });
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={answers}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.question}>Question ID: {item.question}</Text>
            <Text style={styles.user}>User: {item.user}</Text>
            <Text style={styles.content}>Content: {item.content}</Text>
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
  question: {
    fontWeight: 'bold',
  },
  user: {
    marginBottom: 5,
  },
  content: {
    marginBottom: 10,
  },
  date: {
    color: 'gray',
  },
});

export default ListAnswerList;
