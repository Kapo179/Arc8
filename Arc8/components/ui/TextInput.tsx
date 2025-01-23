import React from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  StyleSheet, 
  TextInputProps as RNTextInputProps 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

export function TextInput({ 
  label, 
  error, 
  style, 
  ...props 
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <ThemedText style={styles.label}>{label}</ThemedText>
      )}
      <RNTextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#9CA3AF',
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
}); 