import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clube de Regatas do Flamengo</Text>
      <Image
        source={{ uri: 'https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg' }}
        style={styles.image}
      />
      <Text style={styles.info}>Fundado em: 15 de novembro de 1895</Text>
      <Text style={styles.info}>Estádio: Maracanã</Text>
      <Text style={styles.info}>Mascote: Urubu</Text>
      <Text style={styles.info}>Cores: Vermelho e Preto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 150, height: 150, marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 5 }
});
