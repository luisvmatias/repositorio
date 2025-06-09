import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { Button, Card, Text, List } from 'react-native-paper';
import VeiculoService from './VeiculoService';

export default function VeiculoLista({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarFavoritos = async () => {
    setLoading(true);
    try {
      const listaFavoritos = await VeiculoService.listarFavoritos();
      setFavoritos(listaFavoritos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removerFavorito = async (id) => {
    Alert.alert(
      'Remover Favorito',
      'Tem certeza que deseja remover este veículo dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await VeiculoService.removerFavorito(id);
              carregarFavoritos();
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarFavoritos);
    return unsubscribe;
  }, [navigation]);

  if (loading && favoritos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum veículo favoritado</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('VeiculoForm')}
          style={styles.emptyButton}
        >
          Nova Consulta
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('VeiculoForm')}
        style={styles.newButton}
        icon="plus"
      >
        Nova Consulta
      </Button>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <List.Item
                title={`${item.Marca} ${item.Modelo}`}
                description={`${item.AnoModelo} | ${item.Valor}`}
                left={() => <List.Icon icon="car" />}
                onPress={() => navigation.navigate('VeiculoForm', { veiculo: item })}
              />
            </Card.Content>
            <Card.Actions>
              <Button 
                icon="pencil" 
                onPress={() => navigation.navigate('VeiculoForm', { veiculo: item })}
              />
              <Button 
                icon="delete" 
                onPress={() => removerFavorito(item.id)}
              />
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  emptyButton: {
    width: '80%',
  },
  card: {
    marginBottom: 16,
  },
  newButton: {
    marginBottom: 16,
  },
});