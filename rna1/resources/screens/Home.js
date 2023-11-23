import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home({route, navigation}) {
  console.log(route);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenue {JSON.stringify(route.params.user)}</Text>
    </View>
  );
}

