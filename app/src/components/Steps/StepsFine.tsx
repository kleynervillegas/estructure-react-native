import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width } = Dimensions.get('window');

const StepsFine: React.FC<any> = ({
    selectedService,
    protectionTypes,
    selectedProtection,
    clientData,
    setClientData,
}) => {

    return (
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

export default StepsFine