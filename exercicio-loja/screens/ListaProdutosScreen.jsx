import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import axios from 'axios';

const ListaProdutosScreen = ({ route, navigation }) => {
  const { categoria } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${categoria}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria]);

  const renderItem = ({ item }) => (
    <TouchableRipple
      onPress={() => navigation.navigate('Produto', { idProduto: item.id })}
      style={styles.itemContainer}
    >
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <Card.Content>
          <Title style={styles.title}>{item.title}</Title>
          <Paragraph style={styles.price}>${item.price}</Paragraph>
          <Paragraph style={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              i < Math.floor(item.rating) ? '★' : '☆'
            ))} ({item.rating})
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    elevation: 3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  rating: {
    color: '#ffc107',
  },
  listContent: {
    paddingBottom: 16,
    paddingTop: 8,
  },
});

export default ListaProdutosScreen;