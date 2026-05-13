import React, {ReactNode} from "react";
import {ScrollView, View} from "react-native";

type PopupProps = {
  visible: boolean;
  outerClass?: string;
  innerClass?: string;
  scrollClass?: string;
  children: ReactNode;
};

export default function Popup({
                                visible,
                                outerClass = "flex-1 items-center justify-center",
                                innerClass = "h-[80%] w-[80%] bg-accent rounded-xl items-center justify-center",
                                scrollClass = "ml-[10%] w-[90%] bg-amber-500",
                                children,
                              }: PopupProps) {
  if (!visible) return null;

  return (
    <View pointerEvents="box-none" className={`center ${outerClass}`}>
      <View className={innerClass}>
        <ScrollView className={scrollClass} horizontal={false}>
          <View className="flex-row flex-wrap gap-x-5 gap-y-2 p-3">
            {children}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}