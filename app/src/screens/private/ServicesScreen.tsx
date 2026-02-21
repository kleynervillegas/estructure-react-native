import Steps from '@/app/src/components/Steps/Steps';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepsFine from '../../components/Steps/StepsFine';
import StepsFour from '../../components/Steps/StepsFour';
import StepsOne from '../../components/Steps/StepsOne';
import StepsThere from '../../components/Steps/StepsThere';
import StepsTwo from '../../components/Steps/StepsTwo';

const { width } = Dimensions.get('window');

const ServicesScreen = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProtection, setSelectedProtection] = useState(null);

  useEffect(() => {
    console.log("currentStep", currentStep)

  }, [currentStep]);

  useEffect(() => {
    console.log("selectedService", selectedService)

  }, [selectedService]);

  const protectionTypes = [
    { id: 'hogar', name: 'Hogar', icon: 'home', description: 'Casa particular' },
    { id: 'negocio', name: 'Negocio', icon: 'business', description: 'Local comercial, oficina' },
    { id: 'industria', name: 'Industria', icon: 'factory', description: 'Bodega, industrial' },
    { id: 'terreno', name: 'Terreno', icon: 'earth', description: 'Campo, terreno' },
  ];

  const [dimensionsData, setDimensionsData] = useState({
    // Para Cámaras
    tipoArea: null,
    largo: '',
    ancho: '',
    altura: '',
    reconocimientoFacial: null,
    // Para Cerca
    tipoPerimetro: null,
    largoPerimetro: '',
    alturaCerca: '',
    // Para Portón
    tipoPorton: null,
    anchoPorton: '',
    altoPorton: '',
    pesoPorton: '',
    materialPorton: '',
  });

  const [qualityData, setQualityData] = useState({
    // Para Cámaras
    resolucion: null,
    visionNocturna: null,
    tipoCamara: null,
    // Para Cercas
    tipoAlarma: null,
    bateriaRespaldo: null,
    // Para Portones
    tipoMotor: null,
    accesorios: [],
  });

  const [additionalData, setAdditionalData] = useState({
    instalacionProfesional: false,
    mantenimientoAnual: false,
    garantiaExtendida: false,
    modulo4G: false,
    almacenamientoNube: false,
    controlRemoto: false,
  });

  const [clientData, setClientData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Aquí iría la lógica para enviar la cotización
      console.log('Cotización completa:', {
        service: selectedService,
        protection: selectedProtection,
        dimensions: dimensionsData,
        quality: qualityData,
        additional: additionalData,
        client: clientData,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cotizador</Text>
        <Text style={styles.headerSubtitle}>Completa los pasos para tu cotización</Text>
      </View>

      <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {currentStep === 1 &&
          <StepsOne
            setSelectedService={setSelectedService}
            selectedService={selectedService}
            selectedProtection={selectedProtection}
            setSelectedProtection={setSelectedProtection}
          />
        }
        {currentStep === 2 &&
          <StepsTwo
            selectedService={selectedService}
            dimensionsData={dimensionsData}
            setDimensionsData={setDimensionsData}

          />}
        {currentStep === 3 &&
          <StepsThere
            qualityData={qualityData}
            setQualityData={setQualityData}
          />}
        {currentStep === 4 &&
          <StepsFour
            additionalData={additionalData}
            setAdditionalData={setAdditionalData}
          />}
        {currentStep === 5 &&
          <StepsFine
            selectedService={selectedService}
            protectionTypes={protectionTypes}
            selectedProtection={selectedProtection}
            clientData={clientData}
            setClientData={setClientData}
          />}
      </ScrollView>


      <View style={styles.navigation}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={[styles.navButton, styles.backButton]}
            onPress={handleBack}>
            <Ionicons name="arrow-back" size={20} color="#6B7280" />
            <Text style={styles.backButtonText}>Anterior</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            currentStep === 1 && !selectedService && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={currentStep === 1 && !selectedService}>
          <Text style={styles.nextButtonText}>
            {currentStep === 5 ? 'Finalizar' : 'Siguiente'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepCircleActive: {
    backgroundColor: '#2563EB',
  },
  stepCircleInactive: {
    backgroundColor: '#F3F4F6',
  },
  stepText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  stepTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  stepTextInactive: {
    color: '#9CA3AF',
  },
  stepConnector: {
    width: 30,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  stepConnectorActive: {
    backgroundColor: '#2563EB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  stepContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  protectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  protectionCard: {
    width: (width - 48) / 2,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  protectionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  protectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  protectionDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedText: {
    color: '#2563EB',
  },
  servicesList: {
    marginTop: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedServiceCard: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedServiceIcon: {
    backgroundColor: '#2563EB',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedServiceText: {
    color: '#2563EB',
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedServiceDescription: {
    color: '#2563EB',
  },
  checkmark: {
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    flex: 1,
    minWidth: 100,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  calculationBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  calculationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  summaryContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 12,
    fontStyle: 'italic',
  },
  navigation: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  backButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#00F2FF',
    shadowColor: '#00F2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: '#0D2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#00F2FF',
    shadowColor: '#00F2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  nextButtonText: {
    // fontSize: 16,
    // fontWeight: '600',
    // color: '#FFFFFF',
    marginRight: 8,

    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default ServicesScreen;