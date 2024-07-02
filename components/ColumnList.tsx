import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// Columnの型定義
interface Column {
  id: number;
  title: string;
  content: string;
  published_date: string;
}

const ColumnList = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/columns/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setColumns(response.data);
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={columns}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>{new Date(item.published_date).toLocaleDateString()}</Text>
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

export default ColumnList;
