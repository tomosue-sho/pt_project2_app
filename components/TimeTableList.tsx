import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface TimeTable {
  id: number;
  day: string;
  period: number;
  subject: string;
}

const TimeTableList: React.FC = () => {
  const [timetables, setTimetables] = useState<TimeTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await axios.get('http://127.0.0.1:8000/api/timetables/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTimetables(response.data);
      } catch (error) {
        console.error('Error fetching timetables:', error);
      }
    };

    fetchData();
  }, []);

  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1限', '2限', '3限', '4限', '5限', '6限'];

  const timetableData: { [key: string]: { [key: string]: TimeTable | null } } = {};
  days.forEach(day => {
    timetableData[day] = {};
    timeSlots.forEach(slot => {
      timetableData[day][slot] = null;
    });
  });

  timetables.forEach(timetable => {
    const periodStr = `${timetable.period}限`;
    timetableData[timetable.day][periodStr] = timetable;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>時間割</Text>
      {days.map(day => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayHeader}>{day}</Text>
          {timeSlots.map(slot => (
            <View key={slot} style={styles.slotContainer}>
              <Text style={styles.slotHeader}>{slot}</Text>
              <Text style={styles.subjectText}>
                {timetableData[day][slot]?.subject || '空き'}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  slotHeader: {
    fontSize: 18,
  },
  subjectText: {
    fontSize: 18,
  },
});

export default TimeTableList;
