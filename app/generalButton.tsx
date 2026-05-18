import React, {ReactNode, useState} from 'react';
import {TextInput, View, Pressable} from 'react-native';
import {Button} from './button'

type GeneralButtonProps = {
  id: string;
  boxProp?: string;
  onPress?: () => void;
  button?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export default function GeneralButton({
                                        id,
                                        disabled = false,
                                        boxProp,
                                        onPress,
                                        children,
                                        button,
                                      }: GeneralButtonProps) {

  const [currId, setCurrId] = useState(id);
  const [firstTime, setFirstTime] = useState(false);

  if (currId === "main_grid_button") {
    return (
      <Button
        id={currId}
        disabled={(disabled && !firstTime)}
        onPress={
          () => {
            console.log(disabled, !firstTime);
            setFirstTime(true);
            if (onPress)
              onPress();
            if (button)
              setCurrId(button);
            console.log(`pressed, ${button}`);
            console.log(disabled, !firstTime);
          }}>
        {children}
      </Button>
    );
  } else if (id === "popup_button") {
    return (
      <Button id={currId} onPress={onPress}>
        {children}
      </Button>
    );
  }
}