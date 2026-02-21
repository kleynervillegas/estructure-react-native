import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { calculateWireLength } from "../../utils/functions";

const { width } = Dimensions.get('window');

const StepsTwo: React.FC<any> = ({
    selectedService,
    dimensionsData,
    setDimensionsData,
}) => {
    return (
        <>
            {selectedService === 1 &&
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
            }

            {selectedService === 2 &&
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
                                Metraje lineal estimado: {calculateWireLength(dimensionsData)} metros de alambre
                            </Text>
                        </View>
                    )}
                </View>
            }

            {selectedService === 3 &&
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
            }



        </>
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

export default StepsTwo