import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Feed from '../screens/Feed'
import Home from '../screens/Home'
import Posts from '../screens/Posts'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name ='Home' component={Home}/>
        <Stack.Screen name ='Feed' component={Feed}/>
        <Stack.Screen name ='Posts' component={Posts}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})