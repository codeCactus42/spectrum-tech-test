import React from "react";
import { Pressable, Text, View } from "react-native";
import { cn } from "heroui-native";
import { useFormField } from "@/components/multi-step-form";

interface OptionButtonProps {
  value: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function OptionButton({ value, label, isSelected, onPress }: OptionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "border-2 rounded-2xl p-6",
        isSelected ? "border-accent" : "border-[#aeb0bd]"
      )}
    >
      <Text className="text-base font-bold text-[#1e1e22]">{label}</Text>
    </Pressable>
  );
}

export function AppointmentFormatStep() {
  const { value, onChange, error } = useFormField("appointmentFormat");

  return (
    <View className="px-6 py-6 gap-6">
      <Text className="text-[22px] leading-[28px] font-bold text-[#1e1e22]">
        Select your preferred appointment format
      </Text>

      <View className="gap-6">
        <OptionButton
          value="video"
          label="Video"
          isSelected={value === "video"}
          onPress={() => onChange("video")}
        />

        <OptionButton
          value="audio"
          label="Audio"
          isSelected={value === "audio"}
          onPress={() => onChange("audio")}
        />
      </View>

      {error && <Text className="text-red-500 text-sm px-1">{error}</Text>}
    </View>
  );
}
