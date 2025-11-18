import React, { useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useFormContext } from '../multi-step-form';
import type { FieldProps } from '../types';

export const Field = React.memo(({ name, label, type, ...props }: FieldProps) => {
  const { data, errors, currentStep, onValueChange, onClearError } = useFormContext();
  const fieldPath = `step-${currentStep}.${name}`;
  
  const value = data[fieldPath] || '';
  const error = errors[fieldPath];

  const handleChange = useCallback(
    (newValue: string) => onValueChange(fieldPath, newValue),
    [fieldPath, onValueChange]
  );

  const handleFocus = useCallback(() => {
    if (error) {
      onClearError(fieldPath);
    }
  }, [error, fieldPath, onClearError]);

  const keyboardType =
    type === 'email' ? 'email-address' : type === 'tel' ? 'phone-pad' : 'default';
  const autoCapitalize = type === 'email' ? 'none' : 'sentences';

  return (
    <View className="gap-1">
      <View className="border border-[#aeb0bd] rounded-xl px-4 py-3">
        {label && (
          <Text className="text-[#797B89] font-bold text-sm mb-1">{label}</Text>
        )}
        <TextInput
          value={value}
          onChangeText={handleChange}
          onFocus={handleFocus}
          className="border-0 p-0 h-8 text-base text-[#1e1e22]"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-sm px-1">{error}</Text>}
    </View>
  );
});

Field.displayName = 'MultiStepForm.Field';

