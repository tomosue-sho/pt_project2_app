// App.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ArticleList from './components/ArticleList';
import CategoryList from './components/CategoryList';
import CustomUserList from './components/CustomUserList';
import TemporaryUserList from './components/TemporaryUserList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Articles</Text>
        <ArticleList />

        <Text style={styles.header}>Categories</Text>
        <CategoryList />

        <Text style={styles.header}>Users</Text>
        <CustomUserList />

        <Text style={styles.header}>Temporary Users</Text>
        <TemporaryUserList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default App;
