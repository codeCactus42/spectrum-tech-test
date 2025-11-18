import React from "react";
import { ScrollView, Text, View } from "react-native";
import { MultiStepForm } from "@/components/multi-step-form";

export function GpDetailsStep() {
  return (
    <ScrollView
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}
    >
      <View className="gap-6">
        <Text className="text-[22px] leading-7 font-bold text-[#1e1e22]">
          Please confirm or add to the below GP Contact Details
        </Text>

        <View className="gap-6">
          <MultiStepForm.Field
            name="gpName"
            label="GP Name"
            placeholder="Please enter your GP name"
            autoCapitalize="words"
          />

          <MultiStepForm.Field
            name="email"
            label="Email"
            placeholder="Please enter your email"
            type="email"
          />

          <MultiStepForm.Field
            name="contactNumber"
            label="Contact Number"
            placeholder="+353 78876 0233"
            type="tel"
          />
        </View>
      </View>
    </ScrollView>
  );
}
