import React from "react";

import Home from '../screens/Home'
import User from '../screens/User'
import Profile from '../screens/Profile'
import Config from '../screens/Config'

import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes (){
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
            name='Home' 
            component={Home} 
            options={{title: "Início", drawerIcon:({color, size})=> <Ionicons name='Home' color={color} size={size} />
            }}/>
            
            <Drawer.Screen name='User' component={User} />
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name='Confg' component={Config} />
        </Drawer.Navigator>
    )
}