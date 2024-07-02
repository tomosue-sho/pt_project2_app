// components/FieldList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth'; // トークン取得関数をインポート

interface Field {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const FieldList = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const token = await getToken(); // トークンを取得
        const response = await axios.get('http://127.0.0.1:8000/api/fields/', {
          headers: {
            Authorization: `Bearer ${token}` // トークンをヘッダーに追加
          }
        });
        setFields(response.data);
      } catch (error) {
        setError('Error fetching fields');
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fields}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
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
  description: {
    color: '#555',
  },
});

export default FieldList;
