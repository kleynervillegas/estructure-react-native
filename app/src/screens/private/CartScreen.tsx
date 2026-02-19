import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ic from '../../../../assets/images/fondo.png';
import { useSqlite } from '../../hooks/useSqlite';
import { Product } from '../../types/products';
import { formatPrice } from '../../utils/functions';

const { width } = Dimensions.get('window');

const SHIPPING_COST = 5000;
const EMPTY_CART_MESSAGE = 'Tu carrito está vacío';

const CartScreen = ({ navigation }) => {
  const { getAllProductCart, deleteOneProductCart, updateProductQuantity, deleteAllProductCart } = useSqlite();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadCartProducts();
      return () => { };
    }, [])
  );

  const loadCartProducts = useCallback(async () => {

    setLoading(true);

    const productsCart: any = await getAllProductCart();

    setProducts(productsCart);

    setLoading(false);

    setRefreshing(false);

  }, [getAllProductCart]);


  const calculateSubtotal = (): number => {

    return products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  };

  // Actualizar cantidad
  const handleUpdateQuantity = async (item: Product, newQuantity: number) => {

    if (newQuantity < 1) return;

    await updateProductQuantity(item.id_product, newQuantity);

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === item.id ? { ...p, quantity: newQuantity } : p
      )
    );

  };


  const handleDeleteProduct = async (item: Product) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que deseas eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteOneProductCart(item.id);
              setProducts(prevProducts => prevProducts.filter(p => p.id !== item.id));
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          }
        }
      ]
    );
  };


  const handleClearCart = () => {
    if (products.length === 0) return;

    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que deseas eliminar todos los productos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAllProductCart();
              setProducts([]);
            } catch (error) {
              console.error('Error clearing cart:', error);
              Alert.alert('Error', 'No se pudo vaciar el carrito');
            }
          }
        }
      ]
    );
  };


  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        {item.brand && (
          <View style={styles.brandBadge}>
            <Text style={styles.brandText}>{item.brand}</Text>
          </View>
        )}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>
            {item.brand ? item.brand.charAt(0).toUpperCase() : 'P'}
          </Text>
        </View>
      </View>

      <View style={styles.itemDetails}>
        {item.category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}

        <Text style={styles.itemName} numberOfLines={2}>
          {item.name || 'Producto sin nombre'}
        </Text>

        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>$ {formatPrice(item.price)}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
              onPress={() => handleUpdateQuantity(item, (item.quantity || 1) - 1)}
              disabled={item.quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity || 1}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(item, (item.quantity || 1) + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );


  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>{EMPTY_CART_MESSAGE}</Text>
      <Text style={styles.emptySubtitle}>
        Agrega productos para comenzar tu compra
      </Text>
      <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('Tienda')}>
        <Text style={styles.shopButtonText}>Ir a tienda</Text>
      </TouchableOpacity>
    </View>
  );


  const renderCartHeader = () => (
    <View style={styles.cartHeader}>
      <Text style={styles.cartHeaderText}>
        {products.length} {products.length === 1 ? 'producto' : 'productos'}
      </Text>
      {products.length > 0 && (
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearCartText}>Vaciar carrito</Text>
        </TouchableOpacity>
      )}
    </View>
  );


  const renderSummary = () => {
    if (products.length === 0) return null;

    const subtotal = calculateSubtotal();
    const total = subtotal + SHIPPING_COST;

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen de compra</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>$ {formatPrice(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envío</Text>
          <Text style={styles.summaryValue}>$ {formatPrice(SHIPPING_COST)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$ {formatPrice(total)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceder al pago</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2C3E50" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={ic}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <FlatList
            data={products}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.cartList,
              products.length === 0 && styles.emptyList
            ]}
            ListHeaderComponent={renderCartHeader}
            ListEmptyComponent={renderEmptyList}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadCartProducts();
            }}
          />

          {renderSummary()}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerIcon: {
    padding: 8,
  },
  headerIconText: {
    fontSize: 24,
    color: '#333333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  container: {
    flex: 1,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cartHeaderText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  clearCartText: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '500',
  },
  cartList: {
    paddingBottom: 20,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  brandBadge: {
    position: 'absolute',
    top: -8,
    left: -8,
    backgroundColor: '#2C3E50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  categoryContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  quantityText: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  checkoutButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
    color: '#999999',
  },
  navText: {
    fontSize: 10,
    color: '#999999',
    textTransform: 'lowercase',
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
  },
  activeNavIcon: {
    color: '#2C3E50',
  },
  activeNavText: {
    color: '#2C3E50',
    fontWeight: '600',
  },
});

export default CartScreen;