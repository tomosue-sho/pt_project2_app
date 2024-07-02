import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface ExplanationImage {
  id: number;
  image: string;
  question: number;
}

const ExplanationImageList = () => {
  const [images, setImages] = useState<ExplanationImage[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/explanation_images/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching explanation images:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.question}>Question ID: {item.question}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
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
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default ExplanationImageList;
