import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

async function listarFavoritos() {
  const jsonValue = await AsyncStorage.getItem('@veiculos_favoritos');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvarFavorito(veiculo) {
  veiculo.id = new Date().getTime(); // Cria ID novo
  const favoritos = await listarFavoritos();
  favoritos.push(veiculo);
  await AsyncStorage.setItem('@veiculos_favoritos', JSON.stringify(favoritos));
}

async function atualizarFavorito(id, novosDados) {
  const favoritos = await listarFavoritos();
  const atualizados = favoritos.map(veiculo =>
    veiculo.id === id ? { ...veiculo, ...novosDados, id } : veiculo
  );
  await AsyncStorage.setItem('@veiculos_favoritos', JSON.stringify(atualizados));
}

async function removerFavorito(id) {
  const favoritos = await listarFavoritos();
  const novaLista = favoritos.filter(veiculo => veiculo.id !== id);
  await AsyncStorage.setItem('@veiculos_favoritos', JSON.stringify(novaLista));
}

async function listarMarcas(tipoVeiculo) {
  const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas`);
  return response.data;
}

async function listarModelos(tipoVeiculo, marcaId) {
  const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos`);
  return response.data;
}

async function listarAnos(tipoVeiculo, marcaId, modeloId) {
  const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos`);
  return response.data;
}

async function consultarVeiculo(tipoVeiculo, marcaId, modeloId, anoId) {
  const response = await axios.get(`${API_BASE_URL}/${tipoVeiculo}/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
  return response.data;
}

export default {
  listarFavoritos,
  salvarFavorito,
  atualizarFavorito,
  removerFavorito,
  listarMarcas,
  listarModelos,
  listarAnos,
  consultarVeiculo,
};
