import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {Card, Text, Button} from 'react-native-paper'

export default function Nome() {

    const [nome,setNome] = useState('????')
    const [numero, setNumero] = useState(0)

    function esconder() {
        setNome('????')
        setNumero(numero + 1)
        console.log(nome)
    }
    function revelar() {
        setNome('Luís')
        setNumero(numero + 1)
        console.log(nome)
    }

  return (
    <View>
      <Card>
        <Card.Content>
            <Card.Title title="Componente Nome" />
            <Text variant='displayMedium'>Nome: {nome}</Text>
            <Text variant='displaySmall'>Contador de Clicks: {numero}</Text>
        </Card.Content>
        <Card.Actions>
            <Button onPress={esconder}>Esconder</Button>
            <Button onPress={revelar}>Revelar</Button>
        </Card.Actions>
      </Card>
    </View>
  ) 
}
