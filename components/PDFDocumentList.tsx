import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface PDFDocument {
  id: number;
  title: string;
  word_file: string;
  pdf_file: string;
  category: number;
}

const PDFDocumentList = () => {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/pdf_documents/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data); // レスポンスをコンソールに出力
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching PDF documents:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.title}</Text>
            <Text>Word File: {item.word_file}</Text>
            <Text>PDF File: {item.pdf_file}</Text>
            <Text>Category ID: {item.category}</Text>
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

export default PDFDocumentList;
