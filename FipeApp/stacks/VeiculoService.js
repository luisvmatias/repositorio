import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

async function listarFavoritos() {
  const jsonValue = await AsyncStorage.getItem('@veiculos_favoritos');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvarFavorito(veiculo) {
  veiculo.id = new Date().getTime();
  const favoritos = await listarFavoritos();
  favoritos.push(veiculo);
  await AsyncStorage.setItem('@veiculos_favoritos', JSON.stringify(favoritos));
}

async function removerFavorito(id) {
  const favoritos = await listarFavoritos();
  const novaLista = favoritos.filter(veiculo => veiculo.id !== id);
  await AsyncStorage.setItem('@veiculos_favoritos', JSON.stringify(novaLista));
}

async function listarMarcas(tipoVeiculo) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    throw error;
  }
}

async function listarModelos(tipoVeiculo, marcaId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar modelos:', error);
    throw error;
  }
}

async function listarAnos(tipoVeiculo, marcaId, modeloId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar anos:', error);
    throw error;
  }
}

async function consultarVeiculo(tipoVeiculo, marcaId, modeloId, anoId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar veículo:', error);
    throw error;
  }
}

export default {
  listarFavoritos,
  salvarFavorito,
  removerFavorito,
  listarMarcas,
  listarModelos,
  listarAnos,
  consultarVeiculo
};