import React, { ReactNode } from "react";
import { ScrollView, View } from "react-native";

type PopupProps = {
  visible: boolean;
  outerClass?: string;
  innerClass?: string;
  children?: ReactNode;
};

export default function Popup({
  visible,
  outerClass = "flex-1 items-center justify-center select-box",
  innerClass = "h-[80%] w-[80%] bg-accent rounded-xl select-box",
  children,
}: PopupProps) {
  if (!visible) return null;

  return (
    <View pointerEvents="box-none" className={`center ${outerClass}`}>
      <View pointerEvents={"box-none"} className={innerClass}>
        <ScrollView className="flex-row flex-wrap gap-x-5 gap-y-2 p-3">
          {children}
        </ScrollView>
      </View>
    </View>
  );
}
