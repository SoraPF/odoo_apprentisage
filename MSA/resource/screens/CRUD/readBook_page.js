import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';


export default function Home({navigation,route}) {

  const response = route.params.data;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <View style={styles.tableRow}>
      <Text>Liste Book</Text>
      <View style={styles.tableCell}>
        <Text>{response.author}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.genre}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.isbn}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.pageCount}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.publicationDate}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.publisher}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text>{response.title}</Text>
      </View>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableCell: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    marginLeft: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
