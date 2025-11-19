import type { ReactElement, ReactNode } from 'react';
import type { TextInputProps } from 'react-native';
import type { ZodSchema } from 'zod';
import type { UseFormReturn } from 'react-hook-form';

export interface MultiStepFormProps {
  children: ReactElement<StepProps>[];
  form: UseFormReturn<any>;
  onComplete: (data: any) => void;
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

