import * as React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import curl from '../listeContactCurl';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>ListContact Screen</Text>
     </View>
     <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>

     </View>
    </SafeAreaView>
  );
}

