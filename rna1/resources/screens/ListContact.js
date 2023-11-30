import * as React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import curl from '../listeContactCurl';

export default function ListContact({route, navigation}){
    if(route.params){
        console.log("information",route.params.donner.result.response);
        const responses = route.params.donner.result.response
        const renderedText=[]
        for(let i=0; i<Math.min(responses.length, 10); i++){
          renderedText.push(
           <Text key={i}>
            Nom: {responses[i].name}, Mobile: {responses[i].mobile}
           </Text>
          );
         }
        return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>ListContact Screen</Text>
     </View>
     <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        {renderedText}
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

