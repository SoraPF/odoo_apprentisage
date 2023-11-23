import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({route, navigation}) {
    console.log(route);
 if (route.params){
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue {JSON.stringify(route.params.user)}</Text>
    </View>
  );
  }else{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue</Text>
    </View>
  );}
}

