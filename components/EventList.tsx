import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// Eventの型定義
interface Event {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  user_email: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toLocaleString() : 'Invalid Date';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>Start: {formatDate(item.start_date)}</Text>
            <Text style={styles.time}>End: {formatDate(item.end_date)}</Text>
            <Text style={styles.email}>User: {item.user_email}</Text>
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
  time: {
    color: '#555',
  },
  email: {
    color: '#777',
  },
});

export default EventList;
