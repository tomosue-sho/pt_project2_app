import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';
import moment from 'moment';

interface LevelUpScore {
  id: number;
  user: number;
  total_score: number;
  created_at: string;
}

const LevelUpScoreList = () => {
  const [scores, setScores] = useState<LevelUpScore[]>([]);
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
      axios.get('http://127.0.0.1:8000/api/level_up_scores/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data); // レスポンスをコンソールに出力
        setScores(response.data);
      })
      .catch(error => {
        console.error('Error fetching level up scores:', error);
      });
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={scores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.user}>User ID: {item.user}</Text>
            <Text style={styles.score}>Total Score: {item.total_score}</Text>
            <Text style={styles.date}>Created At: {formatDate(item.created_at)}</Text>
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
  user: {
    fontWeight: 'bold',
  },
  score: {
    marginBottom: 10,
  },
  date: {
    fontStyle: 'italic',
  },
});

export default LevelUpScoreList;
