import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "heroui-native";
interface Props extends ViewProps {
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({
  progress,
  style,
  className,
}) => {
  const clampedProgress = Math.max(0.1, Math.min(1, progress));

  return (
    <View
      className={cn(
        "h-[6px] bg-progress-inactive rounded-2xl overflow-hidden",
        className
      )}
      style={style}
    >
      <View
        className={cn("h-full bg-progress-active rounded-2xl")}
        style={{ width: `${clampedProgress * 100}%` }}
      />
    </View>
  );
};
