import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'heroui-native';
import { ProgressBar } from '@/components/progress-bar';

interface FormHeaderProps {
  progress: number;
  onClose?: () => void;
}

export function FormHeader({ progress, onClose }: FormHeaderProps) {
  return (
    <>
      <View className="h-11" />
      <View className="flex-row items-center px-5 py-4 gap-5">
        <ProgressBar progress={progress} className="flex-1" />
        {onClose && (
          <Button
            variant="tertiary"
            size="sm"
            isIconOnly
            className="rounded-xl bg-[#1E1E22]/5 border-0"
            onPress={onClose}
          >
            <Ionicons name="close" size={16} color="#1e1e22" />
          </Button>
        )}
      </View>
    </>
  );
}

