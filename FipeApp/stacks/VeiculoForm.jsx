import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, Text, TextInput, RadioButton, List } from 'react-native-paper';
import VeiculoService from './VeiculoService';

export default function VeiculoForm({ navigation, route }) {
  const veiculoFavorito = route.params?.veiculo || null;
  
  const [tipoVeiculo, setTipoVeiculo] = useState(veiculoFavorito?.tipoVeiculo || 'carros');
  const [marca, setMarca] = useState(veiculoFavorito?.marca || null);
  const [modelo, setModelo] = useState(veiculoFavorito?.modelo || null);
  const [ano, setAno] = useState(veiculoFavorito?.ano || null);
  
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [veiculoDetalhes, setVeiculoDetalhes] = useState(null);

  // Carrega marcas quando o tipo de veículo muda
  useEffect(() => {
    const carregarMarcas = async () => {
      setLoading(true);
      try {
        const marcasData = await VeiculoService.listarMarcas(tipoVeiculo);
        setMarcas(marcasData);
        setMarca(null);
        setModelo(null);
        setAno(null);
        setModelos([]);
        setAnos([]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    carregarMarcas();
  }, [tipoVeiculo]);

  // Carrega modelos quando a marca é selecionada
  useEffect(() => {
    const carregarModelos = async () => {
      if (marca) {
        setLoading(true);
        try {
          const modelosData = await VeiculoService.listarModelos(tipoVeiculo, marca.codigo);
          setModelos(modelosData.modelos);
          setModelo(null);
          setAno(null);
          setAnos([]);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    carregarModelos();
  }, [marca]);

  // Carrega anos quando o modelo é selecionado
  useEffect(() => {
    const carregarAnos = async () => {
      if (modelo) {
        setLoading(true);
        try {
          const anosData = await VeiculoService.listarAnos(tipoVeiculo, marca.codigo, modelo.codigo);
          setAnos(anosData);
          setAno(null);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    carregarAnos();
  }, [modelo]);

  const consultarVeiculo = async () => {
    if (!marca || !modelo || !ano) {
      alert('Selecione marca, modelo e ano para consultar');
      return;
    }
    
    setLoading(true);
    try {
      const detalhes = await VeiculoService.consultarVeiculo(
        tipoVeiculo,
        marca.codigo,
        modelo.codigo,
        ano.codigo
      );
      
      setVeiculoDetalhes({
        ...detalhes,
        tipoVeiculo,
        marca,
        modelo,
        ano
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao consultar veículo');
    } finally {
      setLoading(false);
    }
  };

  const salvarFavorito = async () => {
    if (!veiculoDetalhes) return;
    
    try {
      await VeiculoService.salvarFavorito(veiculoDetalhes);
      alert('Veículo salvo como favorito!');
      navigation.navigate('VeiculoLista');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar favorito');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title title="Consulta FIPE" />
        <Card.Content>
          <Text style={styles.sectionTitle}>Tipo de Veículo</Text>
          <RadioButton.Group onValueChange={setTipoVeiculo} value={tipoVeiculo}>
            <View style={styles.radioGroup}>
              <RadioButton.Item label="Carros" value="carros" />
              <RadioButton.Item label="Motos" value="motos" />
              <RadioButton.Item label="Caminhões" value="caminhoes" />
            </View>
          </RadioButton.Group>

          {loading && <ActivityIndicator style={styles.loading} />}

          <Text style={styles.sectionTitle}>Marca</Text>
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Selection', {
              title: 'Selecione a Marca',
              items: marcas.map(m => ({ label: m.nome, value: m })),
              onSelect: setMarca
            })}
            disabled={loading}
          >
            {marca ? marca.nome : 'Selecione uma marca'}
          </Button>

          {marca && (
            <>
              <Text style={styles.sectionTitle}>Modelo</Text>
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('Selection', {
                  title: 'Selecione o Modelo',
                  items: modelos.map(m => ({ label: m.nome, value: m })),
                  onSelect: setModelo
                })}
                disabled={loading}
              >
                {modelo ? modelo.nome : 'Selecione um modelo'}
              </Button>
            </>
          )}

          {modelo && (
            <>
              <Text style={styles.sectionTitle}>Ano</Text>
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('Selection', {
                  title: 'Selecione o Ano',
                  items: anos.map(a => ({ label: a.nome, value: a })),
                  onSelect: setAno
                })}
                disabled={loading}
              >
                {ano ? ano.nome : 'Selecione um ano'}
              </Button>
            </>
          )}

          {ano && (
            <Button 
              mode="contained" 
              onPress={consultarVeiculo}
              style={styles.button}
              disabled={loading}
            >
              Consultar Veículo
            </Button>
          )}
        </Card.Content>
      </Card>

      {veiculoDetalhes && (
        <Card style={styles.resultCard}>
          <Card.Title title="Resultado da Consulta" />
          <Card.Content>
            <List.Item
              title="Veículo"
              description={`${veiculoDetalhes.Marca} ${veiculoDetalhes.Modelo}`}
              left={() => <List.Icon icon="car" />}
            />
            <List.Item
              title="Ano"
              description={veiculoDetalhes.AnoModelo}
              left={() => <List.Icon icon="calendar" />}
            />
            <List.Item
              title="Valor"
              description={veiculoDetalhes.Valor}
              left={() => <List.Icon icon="cash" />}
            />
            <List.Item
              title="Combustível"
              description={veiculoDetalhes.Combustivel}
              left={() => <List.Icon icon="fuel" />}
            />
            
            <Button 
              mode="contained" 
              onPress={salvarFavorito}
              style={styles.button}
              icon="star"
            >
              Salvar como Favorito
            </Button>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  loading: {
    marginVertical: 16,
  },
  resultCard: {
    marginTop: 16,
  },
});