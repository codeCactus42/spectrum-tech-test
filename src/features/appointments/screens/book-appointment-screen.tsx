import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../navigation";
import { MultiStepForm, useMultiStepForm } from "@/components/multi-step-form";
import { z } from "zod";
import { AppointmentFormatStep } from "../components/appointment-format-step";
import { GpDetailsStep } from "../components/gp-details-step";

// Validation schemas for each step
const gpSchema = z.object({
  gpName: z.string().min(1, "GP name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
});

const appointmentSchema = z.object({
  appointmentFormat: z.enum(["video", "audio"], {
    required_error: "Please select an appointment format",
  }),
});

export default function BookAppointmentScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const form = useMultiStepForm();

  const handleComplete = (data: Record<string, any>) => {
    console.log("Form submitted:", data);
    navigation.navigate("BookingConfirmation");
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <MultiStepForm
      data={form.data}
      currentStep={form.currentStep}
      errors={form.errors}
      onDataChange={form.setData}
      onStepChange={form.setCurrentStep}
      onErrorsChange={form.setErrors}
      onComplete={handleComplete}
      onClose={handleClose}
    >
      <MultiStepForm.Step schema={gpSchema}>
        <GpDetailsStep />
      </MultiStepForm.Step>

      <MultiStepForm.Step schema={appointmentSchema}>
        <AppointmentFormatStep />
      </MultiStepForm.Step>
    </MultiStepForm>
  );
}
