import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';  // トークン取得関数をインポート

interface InquiryReply {
  id: number;
  inquiry: number;
  message: string;
  created_at: string;
}

const InquiryReplyList = () => {
  const [replies, setReplies] = useState<InquiryReply[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/inquiry_replies/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setReplies(response.data);
      })
      .catch(error => {
        console.error('Error fetching inquiry replies:', error);
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
            <Text style={styles.name}>Inquiry ID: {item.inquiry}</Text>
            <Text>{item.message}</Text>
            <Text>Created at: {item.created_at}</Text>
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

export default InquiryReplyList;
