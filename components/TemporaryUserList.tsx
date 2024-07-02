// components/TemporaryUserList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface TemporaryUser {
  id: number;
  email: string;
  // 他の必要なフィールドを追加
}

const TemporaryUserList = () => {
  const [temporaryUsers, setTemporaryUsers] = useState<TemporaryUser[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/temporary_users/')
      .then(response => {
        setTemporaryUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Temporary Users</Text>
      <FlatList
        data={temporaryUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});

export default TemporaryUserList;
