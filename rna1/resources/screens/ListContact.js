import * as React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import curl from '../listeContactCurl';

export default function ListContact({route, navigation}){
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
      </View>

      {firstTwoResponses.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 1, paddingTop: 5 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>{item.name}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>{item.mobile}</Text>
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

