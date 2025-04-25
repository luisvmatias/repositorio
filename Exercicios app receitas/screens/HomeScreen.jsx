import React from 'react';
import { FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { receitas } from './receitas';

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Card style={{ margin: 10 }} onPress={() => navigation.navigate('Receita', item)}>
      <Card.Cover source={{ uri: item.imagem }} />
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>{item.tempoPreparo} • {item.porcoes} porções</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={receitas}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
}