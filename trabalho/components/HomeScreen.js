import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (data) => {
  try {
    await AsyncStorage.setItem('posts', JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { item })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 20 },
  card: { padding: 15, backgroundColor: '#f8f9fa', marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});

export default HomeScreen;
