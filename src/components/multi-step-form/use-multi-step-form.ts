import { useState, useCallback } from 'react';

export function useMultiStepForm() {
  const [data, setData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = useCallback((key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const setError = useCallback((key: string, error: string) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  const clearError = useCallback((key: string) => {
    setErrors(prev => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const clearStepErrors = useCallback((stepIndex: number) => {
    setErrors(prev => {
      const prefix = `step-${stepIndex}.`;
      return Object.fromEntries(
        Object.entries(prev).filter(([key]) => !key.startsWith(prefix))
      );
    });
  }, []);

  const reset = useCallback(() => {
    setData({});
    setCurrentStep(0);
    setErrors({});
  }, []);

  return {
    // State
    data,
    currentStep,
    errors,
    // Setters
    setData,
    setCurrentStep,
    setErrors,
    // Helpers
    setValue,
    setError,
    clearError,
    clearStepErrors,
    reset,
  };
}

