import React, {ReactNode, useState} from 'react';
import {Text} from 'react-native';
import {Button} from './button';

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
  const [idChanged, setIdChanged] = useState(false);
  const [beenPressed, setBeenPressed] = useState(false);

  if (currId === "main_grid_button") {
    console.log("made here");
    return (
      <Button
        id={currId}
        disabled={(disabled && !beenPressed)}
        onPress={
          () => {
            console.log(currId, button);
            if (onPress)
              onPress();
            if (button && !idChanged) {
              setIdChanged(true);
              setCurrId(button);
            }
            setBeenPressed(true);
          }}>
        {children}
      </Button>
    )
  } else if (currId === "popup_button") {
    return (
      <Button id={currId} onPress={onPress}>
        {children}
      </Button>
    );
  } else if (currId === "mute_button") {
    return (
      <Button id={currId} onPress={() => {
        console.log("this is a mute mutton");
      }}>
        <Text>Hello world</Text>
        {children}
      </Button>
    )
  }
}