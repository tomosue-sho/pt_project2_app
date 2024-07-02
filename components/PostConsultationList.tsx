import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface PostConsultation {
  id: number;
  title: string;
  content: string;
  post_date: string;
  affiliation: string;
  author: number;
}

const PostConsultationList = () => {
  const [posts, setPosts] = useState<PostConsultation[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/post_consultations/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching post consultations:', error);
      });
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>Post Date: {item.post_date}</Text>
            <Text>Affiliation: {item.affiliation}</Text>
            <Text>Author ID: {item.author}</Text>
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
});

export default PostConsultationList;
