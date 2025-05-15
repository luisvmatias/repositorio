import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';

const gerarJogo = () => {
  const dezenas = new Set();
  while (dezenas.size < 6) {
    dezenas.add(Math.floor(Math.random() * 60) + 1);
  }
  return Array.from(dezenas).sort((a, b) => a - b);
};

export default function MegaSenaScreen() {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  const handleGerarJogo = () => {
    const novoJogo = gerarJogo();
    setJogoGerado(novoJogo);
    setJogosMegaSena([novoJogo, ...jogosMegaSena]);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button mode="contained" onPress={handleGerarJogo}>
        Gerar Jogo da Mega Sena
      </Button>

      <Card style={{ marginTop: 16 }}>
        <Card.Content>
          <Title>Jogo Atual:</Title>
          <Text>{jogoGerado.join(' - ')}</Text>
        </Card.Content>
      </Card>

      <Title style={{ marginTop: 16 }}>Histórico:</Title>
      <FlatList
        data={jogosMegaSena}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 4 }}>
            <Card.Content>
              <Text>{item.join(' - ')}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}