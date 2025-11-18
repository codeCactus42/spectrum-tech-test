import React, { Children, useMemo, useRef, useCallback, useEffect, createContext, useContext } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { FormHeader } from './components/form-header';
import { FormFooter } from './components/form-footer';
import { Step } from './components/form-step';
import { Field } from './components/form-field';
import type { MultiStepFormProps } from './types';

interface FormContextValue {
  data: Record<string, any>;
  errors: Record<string, string>;
  currentStep: number;
  onValueChange: (key: string, value: any) => void;
  onClearError: (key: string) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within MultiStepForm');
  }
  return context;
}

function MultiStepFormComponent({
  children,
  data,
  currentStep,
  errors = {},
  onDataChange,
  onStepChange,
  onErrorsChange,
  onComplete,
  onClose,
}: MultiStepFormProps) {
  const pagerRef = useRef<PagerView>(null);
  const totalSteps = Children.count(children);

  const schemas = useMemo(
    () => Children.map(children, (child) => child.props.schema) || [],
    [children]
  );

  useEffect(() => {
    pagerRef.current?.setPage(currentStep);

  }, [currentStep]);

  const handleContinue = useCallback(() => {
    const schema = schemas[currentStep];
    const stepPrefix = `step-${currentStep}.`;

    const stepData = Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => key.startsWith(stepPrefix))
        .map(([key, value]) => [key.substring(stepPrefix.length), value])
    );

    const result = schema.safeParse(stepData);

    if (!result.success) {
      const newErrors = { ...errors };

      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(stepPrefix)) {
          delete newErrors[key];
        }
      });

      result.error.issues.forEach((issue) => {
        const fieldPath = `step-${currentStep}.${issue.path.join('.')}`;
        newErrors[fieldPath] = issue.message;
      });

      onErrorsChange?.(newErrors);
      return;
    }

    const clearedErrors = Object.fromEntries(
      Object.entries(errors).filter(([key]) => !key.startsWith(stepPrefix))
    );
    onErrorsChange?.(clearedErrors);

    if (currentStep === totalSteps - 1) {
      const formattedData = Array.from({ length: totalSteps }, (_, i) => {
        const prefix = `step-${i}.`;
        return [
          `step-${i}`,
          Object.fromEntries(
            Object.entries(data)
              .filter(([key]) => key.startsWith(prefix))
              .map(([key, value]) => [key.substring(prefix.length), value])
          ),
        ];
      });
      onComplete(Object.fromEntries(formattedData));
    } else {
      onStepChange(currentStep + 1);
    }
  }, [schemas, currentStep, data, errors, onErrorsChange, totalSteps, onComplete, onStepChange]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  }, [currentStep, onStepChange]);

  const handleValueChange = useCallback(
    (key: string, value: any) => {
      onDataChange({ ...data, [key]: value });
    },
    [data, onDataChange]
  );

  const handleClearError = useCallback(
    (key: string) => {
      const { [key]: _, ...rest } = errors;
      onErrorsChange?.(rest);
    },
    [errors, onErrorsChange]
  );

  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 0;

  const contextValue = useMemo(
    () => ({
      data,
      errors,
      currentStep,
      onValueChange: handleValueChange,
      onClearError: handleClearError,
    }),
    [data, errors, currentStep, handleValueChange, handleClearError]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <View className="flex-1 bg-white">
        <FormHeader progress={progress} onClose={onClose} />

        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          scrollEnabled={false}
          initialPage={currentStep}
        >
          {Children.map(children, (child, index) =>
            React.cloneElement(child, { stepIndex: index, key: index })
          )}
        </PagerView>

        <FormFooter
          onPrevious={handlePrevious}
          onContinue={handleContinue}
          disablePrevious={currentStep === 0}
        />
      </View>
    </FormContext.Provider>
  );
}

export function useFormField(name: string) {
  const { data, errors, currentStep, onValueChange, onClearError } = useFormContext();
  const fieldPath = `step-${currentStep}.${name}`;
  
  const value = data[fieldPath] || '';
  const error = errors[fieldPath];

  return {
    value,
    onChange: (value: any) => onValueChange(fieldPath, value),
    error,
    clearError: () => onClearError(fieldPath),
  };
}

export const MultiStepForm = Object.assign(MultiStepFormComponent, {
  Step,
  Field,
});

export { useFormContext };
