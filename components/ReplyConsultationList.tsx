import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface ReplyConsultation {
  id: number;
  content: string;
  reply_date: string;
  affiliation: string;
  author: number;
  post: number;
}

const ReplyConsultationList = () => {
  const [replies, setReplies] = useState<ReplyConsultation[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/reply_consultations/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setReplies(response.data);
      })
      .catch(error => {
        console.error('Error fetching reply consultations:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={replies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.content}</Text>
            <Text>Reply Date: {item.reply_date}</Text>
            <Text>Affiliation: {item.affiliation}</Text>
            <Text>Author ID: {item.author}</Text>
            <Text>Post ID: {item.post}</Text>
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

export default ReplyConsultationList;
