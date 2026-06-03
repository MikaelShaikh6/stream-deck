import React, { ReactNode } from "react";
import { Pressable, View } from "react-native";

type Props = {
  id: string;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
  boxProp?: string;
  children?: ReactNode;
};

// TODO: Sizing for boxes may be incorrect on mobile devices, should be tested
export function Button({
  id,
  disabled = false,
  onPress,
  className,
  boxProp = "w-[154px] h-[96px] flex-grow bg-accent select-none aspect-square rounded-xl mb-2 justify-center items-center border-2 border-darkAccent overflow-clip",
  children,
}: Props) {
  return (
    <View id={id}>
      <Pressable
        disabled={disabled}
        className={`${boxProp} ${className}`}
        onPress={onPress}
      >
        {children}
      </Pressable>
    </View>
  );
}
