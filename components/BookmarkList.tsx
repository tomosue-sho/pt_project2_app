// BookmarkList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// 型定義
interface Bookmark {
  id: number;
  created_at: string;
  user: number;
  question: number;
}

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/bookmarks/')
      .then(response => {
        setBookmarks(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookmarks:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Created At: {item.created_at}</Text>
            <Text style={styles.text}>User: {item.user}</Text>
            <Text style={styles.text}>Question: {item.question}</Text>
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
  text: {
    fontSize: 14,
  },
});

export default BookmarkList;
