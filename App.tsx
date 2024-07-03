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
import QuestionRangeList from './components/QuestionRangeList';
import ExplanationImageList from './components/ExplanationImageList';
import LearningMaterialList from './components/LearningMaterialList';
import LevelUpScoreList from './components/LevelUpScoreList';
import ListQuestionList from './components/ListQuestionList';
import ListAnswerList from './components/ListAnswerList';
import ListQuestionCategoryList from './components/ListQuestionCategoryList';
import PDFCategoryList from './components/PDFCategoryList';
import PDFDocumentList from './components/PDFDocumentList';
import PostConsultationList from './components/PostConsultationList';
import ReplyConsultationList from './components/ReplyConsultationList';
import CategoryConsultationList from './components/CategoryConsultationList';
import PracticalQuizQuestionList from './components/PracticalQuizQuestionList';
import PracticalQuizUserAnswerList from './components/PracticalQuizUserAnswerList';
import FieldList from './components/FieldList';
import SubfieldList from './components/SubfieldList';
import Sub2fieldList from './components/Sub2fieldList';
import QuestionList from './components/QuestionList';
import UserAnswerList from './components/UserAnswerList';
import UserScoreList from './components/UserScoreList';
import QuizSessionList from './components/QuizSessionList';
import ColumnList from './components/ColumnList';
import AozoraBookList from './components/AozoraBookList';
import QuoteList from './components/QuoteList';
import StudyLogList from './components/StudyLogList';
import TimeTableList from './components/TimeTableList';
import ToDoItemList from './components/ToDoItemList';
import UpdateInfoList from './components/UpdateInfoList';
import GameQuestionList from './components/GameQuestionList';
import TopScreen from './components/TopScreen';

const App = () => {
  const sections = [
    { key: 'Top', component: <TopScreen /> },
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
    { key: 'Question Ranges', component: <QuestionRangeList /> },
    { key: 'Explanation Images', component: <ExplanationImageList /> },
    { key: 'Learning Materials', component: <LearningMaterialList /> },
    { key: 'Level Up Scores', component: <LevelUpScoreList /> },
    { key: 'List Questions', component: <ListQuestionList /> },
    { key: 'List Answers', component: <ListAnswerList /> },
    { key: 'List Question Categories', component: <ListQuestionCategoryList /> },
    { key: 'PDF Categories', component: <PDFCategoryList /> },
    { key: 'PDF Documents', component: <PDFDocumentList /> },
    { key: 'Post Consultations', component: <PostConsultationList /> },
    { key: 'Reply Consultations', component: <ReplyConsultationList /> },
    { key: 'Category Consultations', component: <CategoryConsultationList /> },
    { key: 'Practical Quiz Questions', component: <PracticalQuizQuestionList /> },
    { key: 'Practical Quiz User Answers', component: <PracticalQuizUserAnswerList /> },
    { key: 'Fields', component: <FieldList /> },
    { key: 'Subfields', component: <SubfieldList /> },
    { key: 'Sub2fields', component: <Sub2fieldList /> },
    { key: 'Questions', component: <QuestionList /> },
    { key: 'User Answers', component: <UserAnswerList /> },
    { key: 'User Scores', component: <UserScoreList /> },
    { key: 'Quiz Sessions', component: <QuizSessionList /> },
    { key: 'Columns', component: <ColumnList /> },
    { key: 'Aozora Books', component: <AozoraBookList /> },
    { key: 'Quotes', component: <QuoteList /> },
    { key: 'Study Logs', component: <StudyLogList /> },
    { key: 'TimeTable', component: <TimeTableList /> },
    { key: 'ToDoItems', component: <ToDoItemList /> },
    { key: 'UpdateInfos', component: <UpdateInfoList /> },
    { key: 'GameQuestion', component: <GameQuestionList /> },
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