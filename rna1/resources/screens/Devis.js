import * as React from 'react';
import { View, SafeAreaView, Text } from 'react-native';

export default function ListContact({route, navigation}){
    if(route.params){
        console.log("information",route.params);
        const responses = route.params
        const renderedText=[]
        return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Devis Screen</Text>
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
       <Text>Devis Screen</Text>
     </View>
    </SafeAreaView>
  );
  }
}

