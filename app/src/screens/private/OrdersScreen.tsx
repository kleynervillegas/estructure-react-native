import { Colors, themeGradients } from '@/constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '../../context/ThemeColorsContext';


const OrdersScreen: React.FC = () => {

  const { theme, changeTheme } = useThemeColors();

  const gradients = themeGradients[theme];
  
  const colors = Colors[theme];

  return (
    <LinearGradient
      colors={gradients.background}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header con botón de cambio de tema (solo visible en desarrollo) */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <MaterialIcons name="receipt" size={40} color={colors.icon} />
              {/* Este botón puede ser eliminado en producción, 
                  ya que el cambio se hará desde el perfil */}
              {__DEV__ && (
                <TouchableOpacity
                  onPress={() => changeTheme(theme)}
                  style={[styles.themeButton, { backgroundColor: colors.border }]}
                >
                  <MaterialIcons
                    name={theme === 'light' ? 'dark-mode' : 'light-mode'}
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Mis Órdenes
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Historial de pedidos
            </Text>
          </View>

          {/* Tarjetas de ejemplo */}
          <LinearGradient
            colors={gradients.card}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="shopping-bag" size={24} color={colors.icon} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Pedido #12345
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Estado:
              </Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  Entregado
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Fecha:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                25 Feb 2026
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Total:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                $156.00
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.detailsButton, { borderTopColor: colors.border }]}
            >
              <Text style={[styles.detailsButtonText, { color: colors.icon }]}>
                Ver detalles
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Segunda tarjeta de ejemplo */}
          <LinearGradient
            colors={gradients.card}
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <MaterialIcons name="shopping-bag" size={24} color={colors.icon} />
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Pedido #12344
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Estado:
              </Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: '#FF9800' }]} />
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  En camino
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Fecha:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                24 Feb 2026
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Total:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                $89.50
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.detailsButton, { borderTopColor: colors.border }]}
            >
              <Text style={[styles.detailsButtonText, { color: colors.icon }]}>
                Ver detalles
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          </LinearGradient>

          <Text style={[styles.footer, { color: colors.textTertiary }]}>
            Fin del historial
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  themeButton: {
    padding: 10,
    borderRadius: 30,
    opacity: 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});

export default OrdersScreen;