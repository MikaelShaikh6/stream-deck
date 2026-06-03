import React, { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

type PopupProps = {
  visible: boolean;
  outerClass?: string;
  innerClass?: string;
  textProp?: string;
  children?: ReactNode;
};

export default function Popup({
  visible,
  outerClass = "flex-1 items-center justify-center select-box",
  innerClass = "h-[80%] w-[80%] bg-accent rounded-xl select-box",
  textProp = "color-text text-2xl",
  children,
}: PopupProps) {
  if (!visible) return null;
  return (
    <View pointerEvents="box-none" className={`center ${outerClass}`}>
      <View pointerEvents={"box-none"} className={innerClass}>
        <View className="items-center justify-center">
          <Text className={textProp}>Choose your button</Text>
        </View>
        <ScrollView className="flex-row flex-wrap gap-x-5 gap-y-4 p-3">
          {children}
        </ScrollView>
      </View>
    </View>
  );
}
