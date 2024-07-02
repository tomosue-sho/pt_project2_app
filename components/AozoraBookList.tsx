import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// AozoraBookの型定義
interface AozoraBook {
  id: number;
  title: string;
  content: string;
}

const AozoraBookList = () => {
  const [books, setBooks] = useState<AozoraBook[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/aozora_books/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AozoraBookList;
