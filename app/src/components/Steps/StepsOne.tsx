import { protectionTypes, services } from "@/app/const/InfoMuck";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

const StepsOne: React.FC<any> = ({
    selectedService,
    setSelectedService,
    selectedProtection,
    setSelectedProtection
}) => {

    return (
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

export default StepsOne