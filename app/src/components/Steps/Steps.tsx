import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

const Steps: React.FC<any> = ({currentStep,setCurrentStep}) => {

    const steps = [
        { id: 1, title: 'Servicio', icon: 'construct-outline' },
        { id: 2, title: 'Dimensiones', icon: 'resize-outline' },
        { id: 3, title: 'Calidad', icon: 'star-outline' },
        { id: 4, title: 'Extras', icon: 'add-circle-outline' },
        { id: 5, title: 'Datos', icon: 'person-outline' },
    ];

    return (
        <View style={styles.stepContainer}>
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <TouchableOpacity
                        style={styles.stepItem}
                        onPress={() => setCurrentStep(step.id)}
                        disabled={step.id > currentStep}
                    >
                        <View style={[
                            styles.stepCircle,
                            currentStep >= step.id && styles.stepCircleActive,
                            step.id > currentStep && styles.stepCircleInactive
                        ]}>
                            <Ionicons
                                name={step.icon}
                                size={20}
                                color={currentStep >= step.id ? '#FFFFFF' : 'red'}
                            />
                        </View>
                        <Text style={[
                            styles.stepText,
                            currentStep >= step.id && styles.stepTextActive,
                            step.id > currentStep && styles.stepTextInactive
                        ]}>
                            {step.title}
                        </Text>
                    </TouchableOpacity>
                    {index < steps.length - 1 && (
                        <View style={[
                            styles.stepConnector,
                            currentStep > step.id && styles.stepConnectorActive
                        ]} />
                    )}
                </React.Fragment>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#F9FAFB',
    },
    stepItem: {
        alignItems: 'center',
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

    stepCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
});

export default Steps