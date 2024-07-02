import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../utils/auth';

interface UpdateInfo {
  id: number;
  title: string;
  content: string;
  updated_at: string;
}

const UpdateInfoList: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`http://127.0.0.1:8000/api/update_info/?page=${currentPage}`, { // URLを修正
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpdates(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching update info:', error);
      }
    };

    fetchUpdates();
  }, [currentPage]);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {currentPage > 1 && (
          <Text style={styles.pageButton} onPress={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Text>
        )}
        {currentPage < totalPages && (
          <Text style={styles.pageButton} onPress={() => setCurrentPage(currentPage + 1)}>
            Next
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Information</Text>
      <FlatList
        data={updates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.updatedAt}>Updated at: {item.updated_at}</Text>
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
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
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
  updatedAt: {
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  pageButton: {
    fontSize: 18,
    color: 'blue',
  },
});

export default UpdateInfoList;
