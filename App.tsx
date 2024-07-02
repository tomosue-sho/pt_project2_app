import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import ArticleList from './components/ArticleList';
import CategoryList from './components/CategoryList';
import CustomUserList from './components/CustomUserList';
import TemporaryUserList from './components/TemporaryUserList';
import EventList from './components/EventList';
import ExamResultList from './components/ExamResultList';
import ExamList from './components/ExamList';
import KokushiFieldList from './components/KokushiFieldList';
import ChoiceList from './components/ChoiceList';
import QuizQuestionList from './components/QuizQuestionList';
import QuizUserAnswerList from './components/QuizUserAnswerList';
import BookmarkList from './components/BookmarkList';
import InquiryList from './components/InquiryList';
import InquiryReplyList from './components/InquiryReplyList';

const App = () => {
  const sections = [
    { key: 'Articles', component: <ArticleList /> },
    { key: 'Categories', component: <CategoryList /> },
    { key: 'Users', component: <CustomUserList /> },
    { key: 'Temporary Users', component: <TemporaryUserList /> },
    { key: 'Events', component: <EventList /> },
    { key: 'ExamResults', component: <ExamResultList /> },
    { key: 'ExamList', component: <ExamList/> },
    { key: 'Kokushi Fields', component: <KokushiFieldList /> },
    { key: 'Choices', component: <ChoiceList /> },
    { key: 'Quiz Questions', component: <QuizQuestionList /> },
    { key: 'Quiz User Answers', component: <QuizUserAnswerList /> },
    { key: 'Bookmarks', component: <BookmarkList /> },
    { key: 'Inquiries', component: <InquiryList /> },
    { key: 'Inquiry Replies', component: <InquiryReplyList /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.header}>{item.key}</Text>
            {item.component}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default App;
