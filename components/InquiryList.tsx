import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';  // トークン取得関数をインポート

interface Inquiry {
  id: number;
  subject: string;
  message: string;
  created_at: string;
  user: number;
  name: string;
  email: string;
  is_read: boolean;
}

const InquiryList = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/inquiries/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setInquiries(response.data);
      })
      .catch(error => {
        console.error('Error fetching inquiries:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={inquiries}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.subject}</Text>
            <Text>{item.message}</Text>
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

export default InquiryList;
