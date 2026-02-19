import Steps from '@/app/src/components/Steps/Steps';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ServicesScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProtection, setSelectedProtection] = useState(null);

  // Estados para cada paso
  const [serviceData, setServiceData] = useState({
    tipoServicio: null,
    queProteger: null,
  });

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

  const steps = [
    { id: 1, title: 'Servicio', icon: 'construct-outline' },
    { id: 2, title: 'Dimensiones', icon: 'resize-outline' },
    { id: 3, title: 'Calidad', icon: 'star-outline' },
    { id: 4, title: 'Extras', icon: 'add-circle-outline' },
    { id: 5, title: 'Datos', icon: 'person-outline' },
  ];

  const services = [
    { id: 1, name: 'Cámara de Seguridad', icon: 'camera', description: 'Protege tu espacio con videovigilancia' },
    { id: 2, name: 'Cerca Eléctrica', icon: 'flash', description: 'Seguridad perimetral electrificada' },
    { id: 3, name: 'Portón Automático', icon: 'lock-closed', description: 'Automatización y control de acceso' },
  ];

  const protectionTypes = [
    { id: 'hogar', name: 'Hogar', icon: 'home', description: 'Casa particular' },
    { id: 'negocio', name: 'Negocio', icon: 'business', description: 'Local comercial, oficina' },
    { id: 'industria', name: 'Industria', icon: 'factory', description: 'Bodega, industrial' },
    { id: 'terreno', name: 'Terreno', icon: 'earth', description: 'Campo, terreno' },
  ];

  

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.sectionTitle}>¿Qué deseas proteger?</Text>
      <View style={styles.protectionGrid}>
        {protectionTypes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.protectionCard,
              selectedProtection === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedProtection(item.id)}>
            <View style={styles.protectionIconContainer}>
              <Ionicons
                name={item.icon}
                size={32}
                color={selectedProtection === item.id ? '#2563EB' : '#6B7280'}
              />
            </View>
            <Text style={[
              styles.protectionTitle,
              selectedProtection === item.id && styles.selectedText
            ]}>
              {item.name}
            </Text>
            <Text style={styles.protectionDescription}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tipo de Servicio</Text>
      <View style={styles.servicesList}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              selectedService === service.id && styles.selectedServiceCard,
            ]}
            onPress={() => setSelectedService(service.id)}>
            <View style={[
              styles.serviceIconContainer,
              selectedService === service.id && styles.selectedServiceIcon
            ]}>
              <Ionicons
                name={service.icon}
                size={28}
                color={selectedService === service.id ? '#FFFFFF' : '#2563EB'}
              />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={[
                styles.serviceName,
                selectedService === service.id && styles.selectedServiceText
              ]}>
                {service.name}
              </Text>
              <Text style={[
                styles.serviceDescription,
                selectedService === service.id && styles.selectedServiceDescription
              ]}>
                {service.description}
              </Text>
            </View>
            {selectedService === service.id && (
              <View style={styles.checkmark}>
                <Ionicons name="checkmark-circle" size={24} color="#2563EB" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => {
    if (selectedService === 1) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Dimensiones para Cámaras</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Área</Text>
            <View style={styles.buttonGroup}>
              {['Interior', 'Exterior'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    dimensionsData.tipoArea === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, tipoArea: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.tipoArea === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Largo (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={dimensionsData.largo}
                onChangeText={(text) => setDimensionsData({ ...dimensionsData, largo: text })}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Ancho (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={dimensionsData.ancho}
                onChangeText={(text) => setDimensionsData({ ...dimensionsData, ancho: text })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura de instalación (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={dimensionsData.altura}
              onChangeText={(text) => setDimensionsData({ ...dimensionsData, altura: text })}
            />
          </View>

          {dimensionsData.largo && dimensionsData.ancho && (
            <View style={styles.calculationBox}>
              <Text style={styles.calculationText}>
                Área total: {(parseFloat(dimensionsData.largo) * parseFloat(dimensionsData.ancho)).toFixed(2)} m²
              </Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>¿Necesitas reconocimiento facial?</Text>
            <View style={styles.buttonGroup}>
              {['Sí, alta definición', 'No, vigilancia general'].map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={[
                    styles.optionButton,
                    dimensionsData.reconocimientoFacial === opcion && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, reconocimientoFacial: opcion })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.reconocimientoFacial === opcion && styles.optionButtonTextActive
                  ]}>
                    {opcion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    } else if (selectedService === 2) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Dimensiones para Cerca Eléctrica</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de perímetro</Text>
            <View style={styles.buttonGroup}>
              {['Perímetro completo', 'Frente / Fachada'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    dimensionsData.tipoPerimetro === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, tipoPerimetro: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.tipoPerimetro === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Largo total del perímetro (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={dimensionsData.largoPerimetro}
              onChangeText={(text) => setDimensionsData({ ...dimensionsData, largoPerimetro: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura deseada</Text>
            <View style={styles.buttonGroup}>
              {['1.50m', '2.00m', '2.50m'].map((altura) => (
                <TouchableOpacity
                  key={altura}
                  style={[
                    styles.optionButton,
                    dimensionsData.alturaCerca === altura && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, alturaCerca: altura })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.alturaCerca === altura && styles.optionButtonTextActive
                  ]}>
                    {altura}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {dimensionsData.largoPerimetro && dimensionsData.alturaCerca && (
            <View style={styles.calculationBox}>
              <Text style={styles.calculationText}>
                Metraje lineal estimado: {calculateWireLength()} metros de alambre
              </Text>
            </View>
          )}
        </View>
      );
    } else if (selectedService === 3) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Dimensiones para Portón</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Portón</Text>
            <View style={styles.buttonGroup}>
              {['Corredizo', 'Batiente', 'Levadizo'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    dimensionsData.tipoPorton === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, tipoPorton: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.tipoPorton === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Ancho (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={dimensionsData.anchoPorton}
                onChangeText={(text) => setDimensionsData({ ...dimensionsData, anchoPorton: text })}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Alto (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={dimensionsData.altoPorton}
                onChangeText={(text) => setDimensionsData({ ...dimensionsData, altoPorton: text })}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Material del portón</Text>
            <View style={styles.buttonGroup}>
              {['Reja', 'Chapa', 'Madera'].map((material) => (
                <TouchableOpacity
                  key={material}
                  style={[
                    styles.optionButton,
                    dimensionsData.materialPorton === material && styles.optionButtonActive
                  ]}
                  onPress={() => setDimensionsData({ ...dimensionsData, materialPorton: material })}>
                  <Text style={[
                    styles.optionButtonText,
                    dimensionsData.materialPorton === material && styles.optionButtonTextActive
                  ]}>
                    {material}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {dimensionsData.anchoPorton && dimensionsData.altoPorton && dimensionsData.materialPorton && (
            <View style={styles.calculationBox}>
              <Text style={styles.calculationText}>
                Peso estimado: {calculateGateWeight()} kg
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  const renderStep3 = () => {
    if (selectedService === 1) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Calidad de Cámaras</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Resolución</Text>
            <View style={styles.buttonGroup}>
              {['1080p', '4K'].map((res) => (
                <TouchableOpacity
                  key={res}
                  style={[
                    styles.optionButton,
                    qualityData.resolucion === res && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, resolucion: res })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.resolucion === res && styles.optionButtonTextActive
                  ]}>
                    {res}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Visión Nocturna</Text>
            <View style={styles.buttonGroup}>
              {['Sí', 'No'].map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={[
                    styles.optionButton,
                    qualityData.visionNocturna === opcion && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, visionNocturna: opcion })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.visionNocturna === opcion && styles.optionButtonTextActive
                  ]}>
                    {opcion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Cámara</Text>
            <View style={styles.buttonGroup}>
              {['Fija', 'PTZ', 'Domo'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    qualityData.tipoCamara === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, tipoCamara: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.tipoCamara === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    } else if (selectedService === 2) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Especificaciones de Cerca</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Alarma</Text>
            <View style={styles.buttonGroup}>
              {['Solo alerta sonora', 'Monitoreada 24/7'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    qualityData.tipoAlarma === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, tipoAlarma: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.tipoAlarma === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Batería de respaldo</Text>
            <View style={styles.buttonGroup}>
              {['Sí', 'No'].map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={[
                    styles.optionButton,
                    qualityData.bateriaRespaldo === opcion && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, bateriaRespaldo: opcion })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.bateriaRespaldo === opcion && styles.optionButtonTextActive
                  ]}>
                    {opcion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    } else if (selectedService === 3) {
      return (
        <View style={styles.stepContent}>
          <Text style={styles.sectionTitle}>Especificaciones de Portón</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Motor</Text>
            <View style={styles.buttonGroup}>
              {['Residencial', 'Industrial'].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.optionButton,
                    qualityData.tipoMotor === tipo && styles.optionButtonActive
                  ]}
                  onPress={() => setQualityData({ ...qualityData, tipoMotor: tipo })}>
                  <Text style={[
                    styles.optionButtonText,
                    qualityData.tipoMotor === tipo && styles.optionButtonTextActive
                  ]}>
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Accesorios</Text>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                const accesorios = qualityData.accesorios.includes('Mando a distancia')
                  ? qualityData.accesorios.filter(a => a !== 'Mando a distancia')
                  : [...qualityData.accesorios, 'Mando a distancia'];
                setQualityData({ ...qualityData, accesorios });
              }}>
              <View style={[styles.checkbox, qualityData.accesorios.includes('Mando a distancia') && styles.checkboxChecked]}>
                {qualityData.accesorios.includes('Mando a distancia') && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Mando a distancia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                const accesorios = qualityData.accesorios.includes('Receptor Wi-Fi')
                  ? qualityData.accesorios.filter(a => a !== 'Receptor Wi-Fi')
                  : [...qualityData.accesorios, 'Receptor Wi-Fi'];
                setQualityData({ ...qualityData, accesorios });
              }}>
              <View style={[styles.checkbox, qualityData.accesorios.includes('Receptor Wi-Fi') && styles.checkboxChecked]}>
                {qualityData.accesorios.includes('Receptor Wi-Fi') && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Receptor Wi-Fi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                const accesorios = qualityData.accesorios.includes('Fotocélulas')
                  ? qualityData.accesorios.filter(a => a !== 'Fotocélulas')
                  : [...qualityData.accesorios, 'Fotocélulas'];
                setQualityData({ ...qualityData, accesorios });
              }}>
              <View style={[styles.checkbox, qualityData.accesorios.includes('Fotocélulas') && styles.checkboxChecked]}>
                {qualityData.accesorios.includes('Fotocélulas') && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Fotocélulas de seguridad</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.sectionTitle}>Servicios Adicionales</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Soporte Técnico</Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            instalacionProfesional: !additionalData.instalacionProfesional
          })}>
          <View style={[styles.checkbox, additionalData.instalacionProfesional && styles.checkboxChecked]}>
            {additionalData.instalacionProfesional && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Instalación Profesional</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            mantenimientoAnual: !additionalData.mantenimientoAnual
          })}>
          <View style={[styles.checkbox, additionalData.mantenimientoAnual && styles.checkboxChecked]}>
            {additionalData.mantenimientoAnual && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Mantenimiento Anual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            garantiaExtendida: !additionalData.garantiaExtendida
          })}>
          <View style={[styles.checkbox, additionalData.garantiaExtendida && styles.checkboxChecked]}>
            {additionalData.garantiaExtendida && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Garantía Extendida</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Conectividad</Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            modulo4G: !additionalData.modulo4G
          })}>
          <View style={[styles.checkbox, additionalData.modulo4G && styles.checkboxChecked]}>
            {additionalData.modulo4G && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Módulo 4G (para lugares sin internet)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            almacenamientoNube: !additionalData.almacenamientoNube
          })}>
          <View style={[styles.checkbox, additionalData.almacenamientoNube && styles.checkboxChecked]}>
            {additionalData.almacenamientoNube && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Almacenamiento en la Nube</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Integración</Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAdditionalData({
            ...additionalData,
            controlRemoto: !additionalData.controlRemoto
          })}>
          <View style={[styles.checkbox, additionalData.controlRemoto && styles.checkboxChecked]}>
            {additionalData.controlRemoto && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.checkboxLabel}>Control remoto vía app móvil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.sectionTitle}>Datos de Contacto</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          value={clientData.nombre}
          onChangeText={(text) => setClientData({ ...clientData, nombre: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={clientData.email}
          onChangeText={(text) => setClientData({ ...clientData, email: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="+56 9 1234 5678"
          keyboardType="phone-pad"
          value={clientData.telefono}
          onChangeText={(text) => setClientData({ ...clientData, telefono: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Dirección de instalación</Text>
        <TextInput
          style={styles.input}
          placeholder="Calle, número, comuna, ciudad"
          multiline
          value={clientData.direccion}
          onChangeText={(text) => setClientData({ ...clientData, direccion: text })}
        />
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Resumen de tu cotización</Text>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Servicio:</Text>
          <Text style={styles.summaryValue}>
            {selectedService === 1 ? 'Cámara de Seguridad' :
              selectedService === 2 ? 'Cerca Eléctrica' :
                selectedService === 3 ? 'Portón Automático' : 'No seleccionado'}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Protección:</Text>
          <Text style={styles.summaryValue}>
            {protectionTypes.find(p => p.id === selectedProtection)?.name || 'No seleccionado'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total estimado:</Text>
          <Text style={styles.summaryTotal}>$ 0 CLP</Text>
        </View>

        <Text style={styles.disclaimer}>
          * Este es un presupuesto estimado. Un asesor se contactará para validar las medidas y ofrecer un precio final exacto.
        </Text>
      </View>
    </View>
  );

  const calculateWireLength = () => {
    const hilos = dimensionsData.alturaCerca === '1.50m' ? 4 :
      dimensionsData.alturaCerca === '2.00m' ? 5 : 6;
    return (parseFloat(dimensionsData.largoPerimetro) * hilos).toFixed(2);
  };

  const calculateGateWeight = () => {
    const area = parseFloat(dimensionsData.anchoPorton) * parseFloat(dimensionsData.altoPorton);
    const pesoPorM2 = dimensionsData.materialPorton === 'Reja' ? 15 :
      dimensionsData.materialPorton === 'Chapa' ? 25 : 40;
    return (area * pesoPorM2).toFixed(0);
  };

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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cotizador</Text>
        <Text style={styles.headerSubtitle}>Completa los pasos para tu cotización</Text>
      </View>

      {/* Step Indicator */}
      <Steps />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
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
  },
  nextButton: {
    backgroundColor: '#2563EB',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default ServicesScreen;