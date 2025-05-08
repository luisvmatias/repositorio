import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function Home({navigation, route}) {
  return (
    <View>
      <Text>Home</Text>
      <Button 
      mode='contained'
      onPress={() => navigation.openDrawer()}>
        Abrir Drawer
      
      </Button>
      <Button 
      mode='contained'
      onPress={() => {navigation.openDrawer()
        setTimeout(() => { navigation.CloseDrawer()}, 3000)
      }}>
        Abrir e Fechar Drawer
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})