import { services } from '@/app/const/InfoMuck';
import { ColorFontrs, Colors, themeGradients } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Badge, Card, IconButton } from 'react-native-paper';
import ModalCustomer from '../../components/modalCustomer/ModalCustomer';
import { useThemeColors } from '../../context/ThemeColorsContext';
import useQuotation from '../../hooks/useQuotation';
import { Quotation } from '../../types/quotation';

const { width, height } = Dimensions.get('window');

const QuotationScreen: React.FC = () => {

  const { theme, changeTheme } = useThemeColors();

  const gradients = themeGradients[theme];

  const colors = Colors[theme];

  const colorFontrs = ColorFontrs[theme];

  const navigator = useNavigation();

  const [quotations, setQuotations] = useState<Quotation[]>([]);

  const { getQuotation } = useQuotation();

  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<any>(null)

  const init = useCallback(async () => {
    setQuotations(await getQuotation());
  }, [getQuotation, quotations]);

  useFocusEffect(
    useCallback(() => {
      init();
      return () => {
        setShowModal(false);
      };
    }, [])
  );

  const moreDetails = (item: Quotation) => {
    4
    setData(item);
    setShowModal(true);
  };
  const callBackModal = () => {
    setShowModal(false);
  }

  return (

    <LinearGradient
      colors={gradients.background}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ModalCustomer visible={showModal} callBackModal={callBackModal}>
        {data &&
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.modalContainer}>

              {/* Sección Cliente */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>👤 CLIENTE</Text>
                <View style={styles.modalCard}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nombre</Text>
                    <Text style={styles.infoValue}>{data.client_json.nombre}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{data.client_json.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Teléfono</Text>
                    <Text style={styles.infoValue}>{data.client_json.telefono}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Dirección</Text>
                    <Text style={styles.infoValue}>{data.client_json.direccion}</Text>
                  </View>
                </View>
              </View>

              {/* Sección Protección */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>🛡️ PROTECCIÓN</Text>
                <View style={styles.modalCard}>
                  <View style={styles.protectionHeader}>
                    <View style={styles.protectionTypeBadge}>
                      <Text style={styles.protectionTypeText}>{data.protection.toUpperCase()}</Text>
                    </View>
                    {data.image && (
                      <View style={styles.imageContainer}>
                        <Text style={styles.imageIcon}>📸</Text>
                        <Text style={styles.imageText}>{data.image}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Sección Dimensiones */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>📐 DIMENSIONES</Text>
                <View style={styles.modalCard}>
                  <View style={styles.dimensionType}>
                    <Text style={styles.dimensionTypeText}>🚪 PORTÓN {data.dimensions_json.tipoPorton}</Text>
                  </View>

                  <View style={styles.dimensionsRow}>
                    <View style={styles.dimensionBox}>
                      <Text style={styles.dimensionBoxLabel}>ANCHO</Text>
                      <Text style={styles.dimensionBoxValue}>{data.dimensions_json.anchoPorton} cm</Text>
                    </View>
                    <View style={styles.dimensionBox}>
                      <Text style={styles.dimensionBoxLabel}>ALTO</Text>
                      <Text style={styles.dimensionBoxValue}>{data.dimensions_json.altoPorton} cm</Text>
                    </View>
                    <View style={styles.dimensionBox}>
                      <Text style={styles.dimensionBoxLabel}>MATERIAL</Text>
                      <Text style={styles.dimensionBoxValue}>{data.dimensions_json.materialPorton}</Text>
                    </View>
                  </View>

                  {data.dimensions_json.largo && (
                    <>
                      <View style={styles.divider} />
                      <View style={styles.dimensionsRow}>
                        <View style={styles.dimensionBox}>
                          <Text style={styles.dimensionBoxLabel}>LARGO</Text>
                          <Text style={styles.dimensionBoxValue}>{data.dimensions_json.largo} m</Text>
                        </View>
                        <View style={styles.dimensionBox}>
                          <Text style={styles.dimensionBoxLabel}>ANCHO</Text>
                          <Text style={styles.dimensionBoxValue}>{data.dimensions_json.ancho} m</Text>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {/* Sección Calidad */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>📷 CALIDAD</Text>
                <View style={styles.modalCard}>
                  <View style={styles.qualityRow}>
                    <View style={styles.qualityBox}>
                      <Text style={styles.qualityBoxLabel}>RESOLUCIÓN</Text>
                      <Text style={styles.qualityBoxValue}>{data.quality_json.resolucion}</Text>
                    </View>
                    <View style={styles.qualityBox}>
                      <Text style={styles.qualityBoxLabel}>VISIÓN NOCTURNA</Text>
                      <Text style={[
                        styles.qualityBoxValue,
                        data.quality_json.visionNocturna === 'Sí' && styles.positiveValue
                      ]}>
                        {data.quality_json.visionNocturna}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.qualityBox}>
                    <Text style={styles.qualityBoxLabel}>TIPO DE CÁMARA</Text>
                    <Text style={styles.qualityBoxValue}>{data.quality_json.tipoCamara}</Text>
                  </View>
                </View>
              </View>

              {/* Sección plano*/}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>📷 Plano</Text>
                <View style={styles.modalCard}>
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${data.additional_json.img}` }}
                    style={styles.previewImage}
                  />
                </View>
              </View>


              {/* Sección Servicios Adicionales */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>➕ SERVICIOS ADICIONALES</Text>
                <View style={styles.modalCard}>
                  {Object.entries(data.additional_json).map(([key, value], index) => (
                    <View key={key} style={[
                      styles.serviceRow,
                      index < Object.entries(data.additional_json).length - 1 && styles.serviceRowBorder
                    ]}>
                      <Text style={styles.serviceLabel}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Text>
                      <View style={[
                        styles.serviceStatusBadge,
                        value ? styles.serviceActiveBadge : styles.serviceInactiveBadge
                      ]}>
                        <Text style={styles.serviceStatusText}>
                          {value ? '✓' : '✗'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Precio total */}
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceLabel}>TOTAL</Text>
                <Text style={styles.totalPriceValue}>$2,500</Text>
              </View>

            </View>
          </ScrollView>
        }
      </ModalCustomer>

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Cotizaciones</Text>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Avatar.Icon size={40} icon="file-document" style={styles.statIcon} />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Total</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Avatar.Icon size={40} icon="clock" style={styles.statIcon} />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Pendientes</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statCard}>
            <Card.Content>
              <Avatar.Icon size={40} icon="check-circle" style={styles.statIcon} />
              <Text style={styles.statNumber}>16</Text>
              <Text style={styles.statLabel}>Completadas</Text>
            </Card.Content>
          </Card>
        </View>

        <Text style={[styles.sectionTitle, { color: colorFontrs.color }]}>Cotizaciones Recientes</Text>
        {quotations.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#fff' }}>No hay cotizaciones disponibles.</Text>
        ) :
          quotations.map((item: Quotation, key: number) => (
            <LinearGradient
              colors={gradients.card}
              style={styles.quotationCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              key={key}
            >
              <TouchableOpacity key={key}>
                <View style={styles.cardHeader}>
                  <View style={""}>
                    <View style={styles.viewInfo}>
                      <Text style={[styles.clientName, { color: colorFontrs.color }]}>Tipo de Protección: {item.protection}</Text>
                      <Badge style={styles.badge}>{services.find(service => service.id === item.service)?.name}</Badge>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={[styles.price, { color: colorFontrs.color }]}>$2,500</Text>
                  <View style={styles.actions}>
                    <IconButton icon="eye" size={24} iconColor='gray' onPress={() => moreDetails(item)} />
                    <IconButton icon="download" size={24} iconColor='gray' onPress={() => { }} />
                    <IconButton icon="share" size={24} iconColor='gray' onPress={() => { }} />
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          ))

        }
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -10,
    marginHorizontal: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  statIcon: {
    backgroundColor: 'red',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 16,
  },
  quotationCard: {
    width: width - 32,
    height: height * 0.12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
    borderColor: '#00F2FF',
    shadowColor: '#00F2FF',
    shadowOpacity: 0.8
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badge: {
    backgroundColor: '#2563EB',
    color: '#000000',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  actions: {
    flexDirection: 'row',
  },
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#fff'
  },

  // Estilos del Modal

  modalContent: {
    width: '100%',
    maxHeight: '80%',
  },
  modalContainer: {
    padding: 16,
  },
  modalHeader: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00F2FF',
    shadowColor: '#00F2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00F2FF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00F2FF',
  },
  modalCloseIcon: {
    fontSize: 16,
    color: '#00F2FF',
    fontWeight: 'bold',
  },
  idContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  idBadge: {
    backgroundColor: 'rgba(0,242,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00F2FF',
  },
  serviceBadge: {
    borderColor: '#FF00FF',
    backgroundColor: 'rgba(255,0,255,0.1)',
  },
  idBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00F2FF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  modalCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,242,255,0.3)',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  protectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  protectionTypeBadge: {
    backgroundColor: '#00F2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  protectionTypeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  imageIcon: {
    fontSize: 16,
  },
  imageText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
  dimensionType: {
    marginBottom: 12,
  },
  dimensionTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF00FF',
    letterSpacing: 1,
  },
  dimensionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  dimensionBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,242,255,0.3)',
  },
  dimensionBoxLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
    fontWeight: '600',
  },
  dimensionBoxValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,242,255,0.2)',
    marginVertical: 12,
  },
  qualityRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  qualityBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,242,255,0.3)',
  },
  qualityBoxLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  qualityBoxValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  positiveValue: {
    color: '#00FF00',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  serviceRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,242,255,0.1)',
  },
  serviceLabel: {
    fontSize: 13,
    color: '#fff',
    textTransform: 'capitalize',
  },
  serviceStatusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceActiveBadge: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  serviceInactiveBadge: {
    backgroundColor: 'rgba(255,0,0,0.2)',
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  serviceStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modalEditButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00F2FF',
  },
  modalEditButtonText: {
    color: '#00F2FF',
    fontWeight: '600',
    fontSize: 14,
  },
  modalDownloadButton: {
    flex: 1,
    backgroundColor: '#00F2FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalDownloadButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalPriceContainer: {
    backgroundColor: 'rgba(0,242,255,0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00F2FF',
    marginBottom: 20,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00F2FF',
    letterSpacing: 1,
  },
  totalPriceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  styleTitle: { textAlign: 'center', marginTop: 20, color: '#fff' }
});

export default QuotationScreen;
