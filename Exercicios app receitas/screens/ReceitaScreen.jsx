import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Title, Paragraph, List, Button } from 'react-native-paper';

export default function ReceitaScreen({ route, navigation }) {
  const { nome, imagem, tempoPreparo, porcoes, ingredientes, modoPreparo } = route.params;
  
  return (
    <ScrollView style={{ padding: 10 }}>
      <Image source={{ uri: imagem }} style={{ height: 200, borderRadius: 10, marginBottom: 10 }} />
      <Title>{nome}</Title>
      <Paragraph>Tempo de preparo: {tempoPreparo}</Paragraph>
      <Paragraph>Porções: {porcoes}</Paragraph>

      <Title style={{ marginTop: 20 }}>Ingredientes</Title>
      {ingredientes.map((item, index) => (
        <List.Item key={index} title={item} />
      ))}

      <Title style={{ marginTop: 20 }}>Modo de Preparo</Title>
      {modoPreparo.map((passo, index) => (
        <List.Item key={index} title={passo} />
      ))}

      <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        Voltar
      </Button>
    </ScrollView>
  );
}