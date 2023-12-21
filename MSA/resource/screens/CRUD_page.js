import * as React from 'react';
import { View, Text, Button, TouchableOpacity,StyleSheet } from 'react-native';
import routeCRUD from '../mapping/CRUD';

export default function Home({route, navigation}) {
    const handlePress = (truc,id) => {
          routeCRUD.routeCRUD(truc,id,{navigation});
    };
    //console.log("information",route.params);
    if(route.params){
      const response = route.params.donnees;
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
              <TouchableOpacity style={styles.button} onPress={() => handlePress("create")}>
                <Text style={styles.buttonText}>ajouter livre</Text>
              </TouchableOpacity>
            </Text>
            <View style={{ flex: 3, justifyContent: 'center', marginHorizontal: 10 }}>
              {/* Header Row */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>title</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>author</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>isbn</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>more info</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>edit</Text>
                </View>
              </View>

              {/* Data Rows */}
              {response.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text>{item.title}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.author}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text>{item.isbn}</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => handlePress("readBook", item.isbn)}>
                    <Text style={styles.buttonText}>Info Book</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={() => handlePress("edite", item.isbn)}>
                    <Text style={styles.buttonText}>Edit Book</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        );

    }else{
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress("create")}>
            <Text style={styles.buttonText}>ajouter livre</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  tableCell: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    marginLeft: 10,
  },
  editButton: {
    flex: 1,
    alignItems: 'center',
    borderLeftWidth: 1,
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});