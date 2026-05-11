import React, {ReactNode} from "react";
import {View, Pressable} from 'react-native';

type GeneralButtonProps = {
  triggerMute: () => void;
  id: string;
  boxProp?: string;
  children: ReactNode;
};

export default function GeneralButton({
                                        id,
                                        triggerMute,
                                        boxProp = "w-[154px] h-[96px] bg-accent select-none aspect-square rounded-xl mb-2 justify-center items-center",
                                        children,
                                      }: GeneralButtonProps) {

  return (
    <View id={id}>
      <Pressable onPress={triggerMute} className={`${boxProp}`}>
        {children}
      </Pressable>
    </View>
  );
}