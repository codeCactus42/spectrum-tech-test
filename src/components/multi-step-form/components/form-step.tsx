import React from 'react';
import { View } from 'react-native';
import type { StepProps } from '../types';

export function Step({ children }: StepProps) {
  return <View className="flex-1">{children}</View>;
}

