import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper';
import axios from 'axios';

const ProdutoScreen = ({ route, navigation }) => {
  const { idProduto } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${idProduto}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idProduto]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* View wrapper para corrigir o problema do shadow */}
      <View style={styles.cardWrapper}>
        <Card style={styles.card}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Card.Content>
            <Title style={styles.title}>{product.title}</Title>
            <View style={styles.chipContainer}>
              <Chip icon="information" style={styles.chip}>
                {product.brand}
              </Chip>
            </View>
            <Paragraph style={styles.price}>${product.price}</Paragraph>
            <Paragraph style={styles.discount}>
              Desconto: {product.discountPercentage}%
            </Paragraph>
            <Paragraph style={styles.rating}>
              Avaliação: {product.rating}/5
            </Paragraph>
            <Paragraph style={styles.description}>
              {product.description}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" style={styles.button}>
              Adicionar ao Carrinho
            </Button>
          </Card.Actions>
        </Card>
      </View>

      {/* Galeria de imagens - modificada para exibir sem cortes */}
      <View style={styles.gallery}>
        {product.images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.galleryImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {},
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    fontWeight: 'bold',
  },
  chipContainer: {
    marginVertical: 8,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginVertical: 8,
  },
  discount: {
    color: '#d32f2f',
    fontSize: 16,
    marginBottom: 8,
  },
  rating: {
    color: '#ffa000',
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#616161',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    width: '100%',
  },
  gallery: {
    marginTop: 16,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 300, // Altura fixa para todas as imagens
    aspectRatio: 1, // Mantém a proporção da imagem
  },
});

export default ProdutoScreen;