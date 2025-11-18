import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'heroui-native';
import { BrandLogo } from '@/components/icons/brand-logo';


interface FormFooterProps {
  onPrevious?: () => void;
  onContinue?: () => void;
  disablePrevious?: boolean;
}

export function FormFooter({
  onPrevious,
  onContinue,
  disablePrevious = false,
}: FormFooterProps) {

  const renderPoweredBy = () => {
    return (
      <View className="flex-row items-center justify-center gap-1 py-4">
        <Text className="text-[#797b89] text-sm font-normal">
          Powered by
        </Text>
        <BrandLogo />
      </View>
    );
  };

  return (
    <View className="bg-white/90 backdrop-blur-md px-6 pt-6">
      {renderPoweredBy()}

      <View className="flex-row gap-4 mb-6">
        <View className="flex-1">
          <Button
            variant="tertiary"
            size="lg"
            className="rounded-[15px] border border-[#604bff]"
            onPress={onPrevious}
            isDisabled={disablePrevious}
          >
            <Text className="text-base font-semibold text-[#604bff]">
              Previous
            </Text>
          </Button>
        </View>
        <View className="flex-1">
          <Button
            variant="primary"
            size="lg"
            className="rounded-[15px]"
            onPress={onContinue}
          >
            <Text className="text-base font-semibold text-white">
              Continue
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
