import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ProductsComponent from '../../../components/Products/ProductsComponent';

const { width } = Dimensions.get('window');

const HomeScreen = () => {

  const services = [
    { id: 1, name: 'Camaras de seguridad', icon: 'airplane' },
    { id: 2, name: 'Cercos Electricos', icon: 'medical' },
    { id: 3, name: 'Protones digitales', icon: 'person' },
    { id: 4, name: 'Redes', icon: 'git-network' },
  ];

  const showToast = (text:string='',type:string='success') => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toast />
      <ScrollView style={styles.scrollView}>

        <View style={styles.banner}>
          <View style={styles.bannerIconContainer}>
            <Ionicons name="airplane" size={24} color="#7C3AED" />
          </View>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Nuestros servicios a tu alcance</Text>
            <Text style={styles.bannerText}>
              Cotiza rapido y sencillo conoce nuestro servicios
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#7C3AED" />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="BÚSCAR..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            <TouchableOpacity>
              <Ionicons name="options" size={20} color="#999" style={styles.optionsIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <Ionicons name={service.icon as any} size={24} color="#2563EB" />
              </View>
              <Text style={styles.serviceText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />
        <ProductsComponent showToast={showToast} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFF',
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    borderRadius: 12,
  },
  bannerIconContainer: {
    backgroundColor: '#EDE9FE',
    padding: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B21B6',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: '#7C3AED',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  optionsIcon: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 16,
    marginBottom: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  serviceItem: {
    alignItems: 'center',
    width: (width - 32) / 4 - 8,
  },
  serviceIconContainer: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  seeAll: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomNavText: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default HomeScreen;