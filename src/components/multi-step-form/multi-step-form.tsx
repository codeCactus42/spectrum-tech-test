import React, { Children, useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { FormProvider, useFormContext, useController } from 'react-hook-form';
import { z } from 'zod';
import { FormHeader } from './components/form-header';
import { FormFooter } from './components/form-footer';
import { Step } from './components/form-step';
import { Field } from './components/form-field';
import type { MultiStepFormProps } from './types';

function MultiStepFormComponent({
  children,
  form,
  onComplete,
  onClose,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const totalSteps = Children.count(children);

  const schemas = useMemo(
    () => Children.map(children, (child) => child.props.schema) || [],
    [children]
  );

  useEffect(() => {
    pagerRef.current?.setPage(currentStep);
  }, [currentStep]);

  const handleContinue = useCallback(async () => {
    const currentSchema = schemas[currentStep];

    // Extract field names from Zod schema to validate only current step
    let fieldsToValidate: string[] = [];
    if (currentSchema instanceof z.ZodObject) {
      fieldsToValidate = Object.keys(currentSchema.shape);
    } else if (currentSchema instanceof z.ZodEffects) {
      // Handle refined schemas if necessary, assuming underlying schema is object
      if (currentSchema._def.schema instanceof z.ZodObject) {
        fieldsToValidate = Object.keys(currentSchema._def.schema.shape);
      }
    }

    const isStepValid = await form.trigger(fieldsToValidate);

    if (isStepValid) {
      if (currentStep === totalSteps - 1) {
        onComplete(form.getValues());
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  }, [currentStep, totalSteps, schemas, form, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 0;

  return (
    <FormProvider {...form}>
      <View className="flex-1 bg-white">
        <FormHeader progress={progress} onClose={onClose} />

        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          scrollEnabled={false}
          initialPage={0}
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
    </FormProvider>
  );
}

export function useFormField(name: string) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, name });

  return {
    value: field.value,
    onChange: field.onChange,
    error: fieldState.error?.message,
  };
}

export const MultiStepForm = Object.assign(MultiStepFormComponent, {
  Step,
  Field,
});
