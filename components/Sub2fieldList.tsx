import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface Sub2field {
  id: number;
  subfield: number;
  name: string;
  description: string;
  icon: string | null;
}

const Sub2fieldList = () => {
  const [sub2fields, setSub2fields] = useState<Sub2field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSub2fields = async () => {
      try {
        const token = await getToken(); // トークンを取得
        const response = await axios.get('http://127.0.0.1:8000/api/sub2fields/', {
          headers: {
            Authorization: `Bearer ${token}` // トークンをヘッダーに追加
          }
        });
        setSub2fields(response.data);
      } catch (error) {
        setError('Error fetching sub2fields');
        console.error('Error fetching sub2fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSub2fields();
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
        data={sub2fields}
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

export default Sub2fieldList;
