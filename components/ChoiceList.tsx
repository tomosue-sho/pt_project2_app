// ChoiceList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// Choiceの型定義
interface Choice {
  id: number;
  choice_text: string;
  is_correct: boolean;
  question: number;
}

const ChoiceList = () => {
  const [choices, setChoices] = useState<Choice[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/choices/')
      .then(response => {
        setChoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching choices:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={choices}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.choiceText}>{item.choice_text}</Text>
            <Text style={styles.detail}>Correct: {item.is_correct ? 'Yes' : 'No'}</Text>
            <Text style={styles.detail}>Question ID: {item.question}</Text>
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
  choiceText: {
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
});

export default ChoiceList;
