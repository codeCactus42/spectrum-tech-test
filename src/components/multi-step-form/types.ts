import type { ReactElement, ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { ZodSchema } from 'zod';

export interface MultiStepFormProps {
  children: ReactElement<StepProps>[];
  data: Record<string, any>;
  currentStep: number;
  errors?: Record<string, string>;
  onDataChange: (data: Record<string, any>) => void;
  onStepChange: (step: number) => void;
  onErrorsChange?: (errors: Record<string, string>) => void;
  onComplete: (data: Record<string, any>) => void;
  onClose?: () => void;
}

export interface StepProps {
  schema: ZodSchema;
  children: ReactNode;
  stepIndex?: number;
}

export interface FieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'tel';
}

