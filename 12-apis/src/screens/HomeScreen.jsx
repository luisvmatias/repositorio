import { StyleSheet, View } from 'react-native'
import {Card, Text, Avatar, IconButton, ActivityIndicator, MD2Colors} from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler'

export default function HomeScreen() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        axios.get("https://dummyjson.com/users?delay=5000")
        .then(resposta => {
            console.log(resposta.data.users)
            setUsuarios(resposta.data.users)
        })
        .catch(erro => {
            alert('Erro ao comunicar com a API!')
        })
    }, [])

  return (
    <View style={styles.container}>
      
      <FlatList
      data={usuarios}
      renderItem={ ({ item}) => (
        <Card>
            <Card.Title 
            title={item.firstName + " " + item.lastName}
            subtitle= {item.email}
            left={(props) => <Avatar.Image {...props} source={{uri: item.image}} />}
            right={(props) => <IconButton icon="chevron-right" size={30} />}
            />
        </Card>
      )}
      ListEmptyComponent={() => (
        <View style={styles.loadingContainer}> 
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={80} />
            <Text variant='titleLarge'> Aguarde...</Text>
        </View>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
        paddingBottom: 50
    },
    loadingContainer:{
        height: 500,
        alignItems: 'center',
        justifyContent: 'center'
    }
})