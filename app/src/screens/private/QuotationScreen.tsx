import { services } from '@/app/const/InfoMuck';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Badge, Card, IconButton } from 'react-native-paper';
import ic from '../../../../assets/images/fondo.png';
import ModalCustomer from '../../components/modalCustomer/ModalCustomer';
import useQuotation from '../../hooks/useQuotation';
import { Quotation } from '../../types/quotation';

const { width, height } = Dimensions.get('window');

const QuotationScreen: React.FC = () => {

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
      return () => { };
    }, [])
  );

  const moreDetails = (item: Quotation) => {
    setData(item);
    setShowModal(true);
  };
  const callBackModal = () => {
    setShowModal(false);
  }

  return (

    <ImageBackground
      source={ic}
      style={styles.container}
      resizeMode="cover"
    >
      <ModalCustomer visible={showModal} callBackModal={callBackModal}>
        {data &&
          <ScrollView style={styles.modalContent}>
            <View style={''}>

              {/* Header con título y botón cerrar */}
              <View style={styles.header}>
                <View style={styles.headerTop}>
                  <Text style={styles.headerTitle}>📋 Detalle de Cotización</Text>
                  <Pressable onPress={callBackModal} style={styles.closeButton}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </Pressable>
                </View>
                <View style={styles.badgeContainer}>
                  <View style={styles.badgeModal}>
                    <Text style={styles.badgeText}>ID: #{data.id}</Text>
                  </View>
                  <View style={[styles.badgeModal, styles.badgeService]}>
                    <Text style={styles.badgeText}>Servicio #{data.service}</Text>
                  </View>
                </View>
              </View>

              {/* Info del Cliente */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>👤 Cliente</Text>
                <View style={styles.card}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoValue}>{data.client_json.nombre}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{data.client_json.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Teléfono:</Text>
                    <Text style={styles.infoValue}>{data.client_json.telefono}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Dirección:</Text>
                    <Text style={styles.infoValue}>{data.client_json.direccion}</Text>
                  </View>
                </View>
              </View>

              {/* Tipo de Protección */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>🛡️ Protección</Text>
                <View style={styles.card}>
                  <View style={styles.protectionBadge}>
                    <Text style={styles.protectionText}>{data.protection.toUpperCase()}</Text>
                  </View>
                  {data.image && (
                    <Text style={styles.imageText}>📸 {data.image}</Text>
                  )}
                </View>
              </View>

              {/* Dimensiones */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>📐 Dimensiones</Text>
                <View style={styles.card}>

                  {/* Portón */}
                  <Text style={styles.subSectionTitle}>🚪 Portón {data.dimensions_json.tipoPorton}</Text>
                  <View style={styles.dimensionsGrid}>
                    <View style={styles.dimensionItem}>
                      <Text style={styles.dimensionLabel}>Ancho</Text>
                      <Text style={styles.dimensionValue}>{data.dimensions_json.anchoPorton} cm</Text>
                    </View>
                    <View style={styles.dimensionItem}>
                      <Text style={styles.dimensionLabel}>Alto</Text>
                      <Text style={styles.dimensionValue}>{data.dimensions_json.altoPorton} cm</Text>
                    </View>
                    <View style={styles.dimensionItem}>
                      <Text style={styles.dimensionLabel}>Material</Text>
                      <Text style={styles.dimensionValue}>{data.dimensions_json.materialPorton}</Text>
                    </View>
                  </View>

                  {/* Mostrar otras dimensiones si existen */}
                  {data.dimensions_json.largo && (
                    <View style={styles.dimensionsGrid}>
                      <View style={styles.dimensionItem}>
                        <Text style={styles.dimensionLabel}>Largo</Text>
                        <Text style={styles.dimensionValue}>{data.dimensions_json.largo} m</Text>
                      </View>
                      <View style={styles.dimensionItem}>
                        <Text style={styles.dimensionLabel}>Ancho</Text>
                        <Text style={styles.dimensionValue}>{data.dimensions_json.ancho} m</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {/* Calidad */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>📷 Calidad</Text>
                <View style={styles.card}>
                  <View style={styles.qualityGrid}>
                    <View style={styles.qualityItem}>
                      <Text style={styles.qualityLabel}>Resolución</Text>
                      <Text style={styles.qualityValue}>{data.quality_json.resolucion}</Text>
                    </View>
                    <View style={styles.qualityItem}>
                      <Text style={styles.qualityLabel}>Visión Nocturna</Text>
                      <Text style={[styles.qualityValue, data.quality_json.visionNocturna === 'Sí' && styles.positiveValue]}>
                        {data.quality_json.visionNocturna}
                      </Text>
                    </View>
                    <View style={styles.qualityItem}>
                      <Text style={styles.qualityLabel}>Tipo Cámara</Text>
                      <Text style={styles.qualityValue}>{data.quality_json.tipoCamara}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Servicios Adicionales */}
              <View style={styles.section}>
                <Text style={styles.sectionTitleModal}>➕ Servicios Adicionales</Text>
                <View style={styles.card}>
                  <View style={styles.servicesList}>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Instalación Profesional</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.instalacionProfesional && styles.serviceActive]}>
                        {data.additional_json.instalacionProfesional ? '✓' : '✗'}
                      </Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Mantenimiento Anual</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.mantenimientoAnual && styles.serviceActive]}>
                        {data.additional_json.mantenimientoAnual ? '✓' : '✗'}
                      </Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Garantía Extendida</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.garantiaExtendida && styles.serviceActive]}>
                        {data.additional_json.garantiaExtendida ? '✓' : '✗'}
                      </Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Módulo 4G</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.modulo4G && styles.serviceActive]}>
                        {data.additional_json.modulo4G ? '✓' : '✗'}
                      </Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Almacenamiento Nube</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.almacenamientoNube && styles.serviceActive]}>
                        {data.additional_json.almacenamientoNube ? '✓' : '✗'}
                      </Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <Text style={styles.serviceLabel}>Control Remoto</Text>
                      <Text style={[styles.serviceStatus, data.additional_json.controlRemoto && styles.serviceActive]}>
                        {data.additional_json.controlRemoto ? '✓' : '✗'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Botones de acción */}
              <View style={styles.actionButtons}>
                <Pressable style={styles.editButton}>
                  <Text style={styles.editButtonText}>✏️ Editar</Text>
                </Pressable>
                <Pressable style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>📥 Descargar PDF</Text>
                </Pressable>
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

        <Text style={styles.sectionTitle}>Cotizaciones Recientes</Text>
        {quotations.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#fff' }}>No hay cotizaciones disponibles.</Text>
        ) :
          quotations.map((item: Quotation, key: number) => (
            <TouchableOpacity key={key}>
              <Card style={styles.quotationCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.clientInfo}>
                    <View style={styles.viewInfo}>
                      <Text style={styles.clientName}>Tipo de Protección: {item.protection}</Text>
                      <Badge style={styles.badge}>{services.find(service => service.id === item.service)?.name}</Badge>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.price}>$2,500</Text>
                  <View style={styles.actions}>
                    <IconButton icon="eye" size={24} iconColor='gray' onPress={() => moreDetails(item)} />
                    <IconButton icon="download" size={24} iconColor='gray' onPress={() => { }} />
                    <IconButton icon="share" size={24} iconColor='gray' onPress={() => { }} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))

        }
      </ScrollView>
    </ImageBackground>
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
    color: '#333',
  },
  quotationCard: {
    width: width - 32,
    height: height * 0.12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: '#FFFFFF',
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
    fontWeight: 'bold',
    color: '#000000',
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
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeModal: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeService: {
    backgroundColor: '#4A90E2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitleModal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  protectionBadge: {
    backgroundColor: '#4A90E2',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  protectionText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  imageText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  dimensionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  dimensionItem: {
    flex: 1,
    minWidth: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  dimensionLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  dimensionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  qualityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  qualityItem: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  qualityLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  qualityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  positiveValue: {
    color: '#4CAF50',
  },
  servicesList: {
    gap: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  serviceLabel: {
    fontSize: 14,
    color: '#444',
    textTransform: 'capitalize',
  },
  serviceStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff4444',
  },
  serviceActive: {
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default QuotationScreen;
