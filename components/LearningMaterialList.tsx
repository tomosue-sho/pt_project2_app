import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface LearningMaterial {
  id: number;
  field: string;
  title: string;
  file: string;
}

const LearningMaterialList = () => {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/learning_materials/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error('Error fetching learning materials:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={materials}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.field}>Field: {item.field}</Text>
            <Text style={styles.title}>Title: {item.title}</Text>
            <Image source={{ uri: item.file }} style={styles.image} />
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
  field: {
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default LearningMaterialList;
