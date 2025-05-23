import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const allCategories = [
    'smartphones', 'laptops', 'fragrances', 'skincare', 
    'groceries', 'home-decoration', 'furniture', 'tops', 
    'womens-dresses', 'womens-shoes', 'mens-shirts', 
    'mens-shoes', 'mens-watches', 'womens-watches', 
    'womens-bags', 'womens-jewellery', 'sunglasses', 
    'automotive', 'motorcycle', 'lighting'
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        
        console.log('API Response:', response.data);
        
        let apiCategories = [];
        
        if (response.data && Array.isArray(response.data)) {
          apiCategories = response.data
            .filter(item => typeof item === 'string' && item.trim() !== '');
        }

        const combinedCategories = [...new Set([...apiCategories, ...allCategories])];
        
        setCategories(
          combinedCategories.map((cat, index) => ({
            id: `cat-${index}`,
            name: cat
          }))
        );

      } catch (error) {
        console.error('Erro na API:', error);
        setCategories(
          allCategories.map((cat, index) => ({
            id: `cat-${index}`,
            name: cat
          }))
        );
        Alert.alert('Aviso', 'Usando categorias locais');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableRipple
      onPress={() => navigation.navigate('ListaProdutos', { categoria: item.name })}
      style={styles.ripple}
    >
      <Card style={styles.card}>
        <Text style={styles.categoryText}>
          {formatCategoryName(item.name)}
        </Text>
      </Card>
    </TouchableRipple>
  );

  const formatCategoryName = (name) => {
    if (typeof name !== 'string') return 'Categoria';
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todas as Categorias</Text>
      
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma categoria disponível</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  ripple: {
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default HomeScreen;