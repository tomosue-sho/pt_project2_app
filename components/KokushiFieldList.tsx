// KokushiFieldList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

// KokushiFieldの型定義
interface KokushiField {
  id: number;
  name: string;
}

const KokushiFieldList = () => {
  const [fields, setFields] = useState<KokushiField[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/kokushi_fields/')
      .then(response => {
        setFields(response.data);
      })
      .catch(error => {
        console.error('Error fetching fields:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={fields}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
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
});

export default KokushiFieldList;
