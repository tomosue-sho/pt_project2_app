import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

// UserScoreの型定義
interface UserScore {
  id: number;
  user: number;
  total_score: number;
  total_questions_attempted: number;
  total_correct_answers: number;
}

const UserScoreList = () => {
  const [userScores, setUserScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/user_scores/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserScores(response.data);
      } catch (error) {
        console.error('Error fetching user scores:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={userScores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>User ID: {item.user}</Text>
            <Text>Total Score: {item.total_score}</Text>
            <Text>Total Questions Attempted: {item.total_questions_attempted}</Text>
            <Text>Total Correct Answers: {item.total_correct_answers}</Text>
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

export default UserScoreList;
