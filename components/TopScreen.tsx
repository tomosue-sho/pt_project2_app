import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface User {
  id: number;
  nickname: string;
  level: number;
  total_score: number;
  next_level_threshold: number;
  rank: number;
  points_to_next_level: number;  // 追加
}

interface Year {
  id: number;  // 追加
  year: number;
}

const TopScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [years, setYears] = useState<Year[]>([]);
  const [examDateInfo, setExamDateInfo] = useState<string | null>(null);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const [remainingHours, setRemainingHours] = useState<number | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchYears = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/years/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setYears(response.data);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

    const fetchExamDateInfo = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/exam_date_info/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExamDateInfo(response.data.exam_date_info);
        setRemainingDays(response.data.remaining_days);
        setRemainingHours(response.data.remaining_hours);
        setRemainingMinutes(response.data.remaining_minutes);
        setRemainingSeconds(response.data.remaining_seconds);
      } catch (error) {
        console.error('Error fetching exam date info:', error);
      }
    };

    fetchUserData();
    fetchYears();
    fetchExamDateInfo();
  }, []);

  const renderYearItem = ({ item }: { item: Year }) => (
    <View style={styles.yearItem}>
      <Text style={styles.yearText}>第{item.year}回</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>{user.nickname}さんの学習レベル</Text>
          <Text style={styles.levelInfo}>レベル: {user.level}</Text>
          <Text style={styles.pointsInfo}>ポイント: {user.total_score}</Text>
          <Text style={styles.pointsInfo}>次のレベルまで: {user.points_to_next_level} ポイント</Text>
          <Text style={styles.rankInfo}>全ユーザー中 {user.rank} 位</Text>
        </View>
      )}
      <View style={styles.remainingDaysContainer}>
        {examDateInfo && (
          <>
            <Text style={styles.countdownTitle}>試験日: {examDateInfo}</Text>
            {remainingDays !== null && (
              <Text style={styles.timer}>国試まであと {remainingDays} 日 {remainingHours} 時間 {remainingMinutes} 分 {remainingSeconds} 秒</Text>
            )}
          </>
        )}
      </View>
      <FlatList
        data={years}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderYearItem}
        style={styles.yearList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelInfo: {
    fontSize: 16,
  },
  pointsInfo: {
    fontSize: 16,
  },
  rankInfo: {
    fontSize: 16,
  },
  remainingDaysContainer: {
    marginBottom: 20,
  },
  countdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  yearList: {
    flex: 1,
  },
  yearItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  yearText: {
    fontSize: 16,
  },
});

export default TopScreen;
