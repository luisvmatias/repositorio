import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {Card, Text, Button} from 'react-native-paper'

export default function NumeroAleatorio() {
    
    const [NumeroAleatorio, setNumeroAleatorio] = useState(0)
    const [listaNumeros, setListaNumeros] = useState([])

    function gerar (){
        const numeroGerado = Math.round(Math.random() * 101)
        setNumeroAleatorio(numeroGerado)
        setListaNumeros([...listaNumeros, NumeroAleatorio])
    }

  return (
    <View>
        <Card>
            <Card.Content>
                <Text>Gerador de Número Aleatório:</Text>
                <Text variant='displayMedium'>Numero Aleatório: {NumeroAleatorio}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={gerar}>Gerar</Button>
            </Card.Actions>
            <Card.Content>
                {listaNumeros.map(numero => <Text>{numero}</Text>)}
            </Card.Content>
        </Card>
    </View>
  )
}
