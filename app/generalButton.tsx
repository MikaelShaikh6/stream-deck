import React, {ReactNode, useState} from 'react';
import {TextInput, View, Pressable} from 'react-native';

type GeneralButtonProps = {
  func?: (bool?: boolean) => unknown;
  id?: string;
  boxProp?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export default function GeneralButton({
                                        id,
                                        func,
                                        disabled = false,
                                        boxProp = "w-[154px] h-[96px] flex-grow bg-accent select-none aspect-square rounded-xl mb-2 justify-center items-center border-2 border-blue overflow-clip",
                                        children,
                                      }: GeneralButtonProps) {


  let [enabled, setEnabled] = useState(false);

  const buttonEnabled = () => {
    setEnabled(true);
  }
  const functions = () => {
    if (func)
      func(enabled);
    buttonEnabled();
    console.log("pressed");
  }

  return (
    <View id={id}>
      <Pressable disabled={!enabled ? disabled : false} onPress={functions} className={`${boxProp}`}>
        {children}
      </Pressable>
    </View>
  );
}