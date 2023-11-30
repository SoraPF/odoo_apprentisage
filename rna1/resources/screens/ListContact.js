import * as React from 'react';
import { View, SafeAreaView, Text, Button, TouchableOpacity,StyleSheet } from 'react-native';
import curl from '../DevisCurl';

export default function ListContact({route, navigation}){
    const deviContact = (username) => {
     console.log('Bouton appuyé!');
     curl.deviCurl(navigation, username);
   };

    if(route.params){
        console.log("information",route.params.donner.result.response);
        const responses = route.params.donner.result.response
        const firstTwoResponses = responses.slice(0, 10);

        return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>ListContact Screen</Text>
     </View>
     <View style={{ flex: 3, justifyContent: 'center'}}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 5 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Nom</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>Mobile</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>devi</Text>
        </View>
      </View>

      {firstTwoResponses.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, paddingTop: 5 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>{item.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>{item.mobile}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity style={styles.button} onPress={()=>deviContact(item.name)}>
              <Text style={styles.buttonText}>Liste Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
     </View>
    </SafeAreaView>
  );
  }else{
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>ListContact Screen</Text>
     </View>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
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