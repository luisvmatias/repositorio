import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const titulos = [
  { nome: "Campeonato Brasileiro", anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020] },
  { nome: "Copa Libertadores da América", anos: [1981, 2019, 2022] },
  { nome: "Copa do Brasil", anos: [1990, 2006, 2013, 2022, 2024] },
  { nome: "Supercopa do Brasil", anos: [2020, 2021, 2025] }
];

export default function TitulosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Títulos Conquistados</Text>
      {titulos.map((titulo, index) => (
        <View key={index} style={styles.titulo}>
          <Text style={styles.nome}>{titulo.nome}</Text>
          <Text style={styles.anos}>Anos: {titulo.anos.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  titulo: { marginBottom: 15 },
  nome: { fontSize: 18, fontWeight: '600' },
  anos: { fontSize: 16 }
});