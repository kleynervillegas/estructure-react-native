import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface InputStandardProps {
  id?: string;
  labelText: string;
  value: string;
  name?: string;
  onChange: (event: { target: { value: string; name?: string } }) => void;
  disabled?: boolean;
  error?: { status: boolean; message: string };
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  autofocus?: boolean;
  readonly?: boolean;
  maxlength?: number;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autocomplete?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel';
  autocorrect?: boolean;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  successColor?: string;
  errorColor?: string;
  focusColor?: string;
  blurColor?: string;
}

export const InputStandard: React.FC<InputStandardProps> = ({
  id,
  labelText,
  value,
  name,
  onChange,
  disabled = false,
  error,
  placeholder,
  type = 'text',
  autofocus = false,
  readonly = false,
  maxlength,
  autocapitalize = 'none',
  autocomplete = 'off',
  autocorrect = false,
  inputMode = 'text',
  keyboardType = 'default',
  successColor = '#4CAF50',
  errorColor = '#FF3B30',
  focusColor = '#2196F3',
  blurColor = '#9E9E9E',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderColor = useRef(new Animated.Value(0)).current;

  // Colores animados para el borde
  const borderColorInterpolation = borderColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [blurColor, focusColor, error?.status ? errorColor : successColor],
  });

  // Efecto para animar la label
  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  // Efecto para animar el color del borde
  useEffect(() => {
    let toValue = 0;
    if (isFocused) {
      toValue = 1;
    } else if (value && !error?.status) {
      toValue = 2; // Estado de éxito
    } else if (error?.status) {
      toValue = 2; // Estado de error (usamos el mismo valor pero diferente color)
    }

    Animated.timing(borderColor, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, error?.status]);

  const handleChange = (text: string) => {
    onChange({
      target: {
        value: text,
        name: name,
      },
    });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Estilos animados para la label
  const labelStyle = {
    position: 'absolute' as const,
    left: 12,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [blurColor, isFocused ? focusColor : blurColor],
    }),
    backgroundColor: 'white',
    paddingHorizontal: 4,
    zIndex: 1,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => !disabled && !readonly && handleFocus()}>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              borderColor: borderColorInterpolation,
              borderWidth: 2,
              borderRadius: 12,
              backgroundColor: disabled ? '#F5F5F5' : 'white',
            },
          ]}
        >
          <Animated.Text style={labelStyle}>
            {labelText}
            {error?.status ? ' *' : ''}
          </Animated.Text>
          <TextInput
            id={id}
            style={[
              styles.input,
              {
                paddingTop: 22,
                paddingBottom: 10,
                color: disabled ? '#9E9E9E' : '#000',
                fontSize: 16,
              },
            ]}
            placeholder={isFocused ? placeholder : ''}
            value={value}
            onChangeText={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize={autocapitalize}
            keyboardType={keyboardType}
            editable={!disabled && !readonly}
            inputMode={inputMode}
            autoComplete={autocomplete}
            autoCorrect={autocorrect}
            secureTextEntry={type === 'password'}
            maxLength={maxlength}
            selectTextOnFocus={!readonly}
            autoFocus={autofocus}
            placeholderTextColor="#9E9E9E"
          />
          
          {/* Icono de estado */}
          {value && !error?.status && (
            <View style={[styles.statusIcon, { backgroundColor: successColor }]}>
              <Text style={styles.iconText}>✓</Text>
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>

      {error?.status && error?.message ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: errorColor }]}>{error.message}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    paddingHorizontal: 12,
  },
  input: {
    width: '100%',
    paddingHorizontal: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  errorContainer: {
    marginTop: 6,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  statusIcon: {
    position: 'absolute',
    right: 12,
    top: 18,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});