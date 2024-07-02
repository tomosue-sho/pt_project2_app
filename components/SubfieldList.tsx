import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface Subfield {
  id: number;
  field: number;
  name: string;
  description: string;
  icon: string | null;
}

const SubfieldList = () => {
  const [subfields, setSubfields] = useState<Subfield[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubfields = async () => {
      try {
        const token = await getToken(); // トークンを取得
        const response = await axios.get('http://127.0.0.1:8000/api/subfields/', {
          headers: {
            Authorization: `Bearer ${token}` // トークンをヘッダーに追加
          }
        });
        setSubfields(response.data);
      } catch (error) {
        setError('Error fetching subfields');
        console.error('Error fetching subfields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubfields();
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
        data={subfields}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            {item.icon && <Image source={{ uri: item.icon }} style={styles.icon} />}
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
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default SubfieldList;
