import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Badge, Card, IconButton } from 'react-native-paper';
import ic from '../../../../assets/images/fondo.png';
import useQuotation from '../../hooks/useQuotation';

const { width } = Dimensions.get('window');

const QuotationScreen: React.FC = () => {

  const { getAllQuotation } = useQuotation();

  useFocusEffect(
    useCallback(() => {
      init();
      return () => { };
    }, [])
  );

  const init = useCallback(async () => {

    const quotations: any = await getAllQuotation();

    console.log("quotations", quotations);

  }, [getAllQuotation]);

  return (

    <ImageBackground
      source={ic}
      style={styles.container}
      resizeMode="cover"
    >
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

        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item}>
            <Card style={styles.quotationCard}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <View style={styles.clientInfo}>
                    <Avatar.Text
                      size={50}
                      label="JC"
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={styles.clientName}>Juan Carlos</Text>
                      <Text style={styles.clientEmail}>juan@email.com</Text>
                    </View>
                  </View>
                  <Badge style={styles.badge}>Cámaras</Badge>
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <IconButton icon="ruler" size={20} />
                    <Text style={styles.detailText}>25x25m</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconButton icon="camera" size={20} />
                    <Text style={styles.detailText}>1080p</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconButton icon="calendar" size={20} />
                    <Text style={styles.detailText}>15/03/2024</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.price}>$2,500</Text>
                  <View style={styles.actions}>
                    <IconButton icon="eye" size={24} onPress={() => { }} />
                    <IconButton icon="download" size={24} onPress={() => { }} />
                    <IconButton icon="share" size={24} onPress={() => { }} />
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
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
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
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
  },
  statIcon: {
    backgroundColor: '#6200ee',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
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
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 2 },
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
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 12,
    backgroundColor: '#6200ee',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  clientEmail: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#e0e0e0',
    color: '#000000',
    fontSize: 12,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: -4,
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
});

export default QuotationScreen;
