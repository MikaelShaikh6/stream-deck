import React, { ReactNode } from "react";
import { Text } from "react-native";
import { Button } from "./button";

type GeneralButtonProps = {
  id: string;
  boxProp?: string;
  onPress?: () => void;
  button?: string;
  disabled?: boolean;
  children?: ReactNode;
  socket?: WebSocket;
  audioLevel?: number;
};

export default function GeneralButton({
  id,
  disabled = false,
  boxProp,
  onPress,
  children,
  button,
  socket,
  audioLevel,
}: GeneralButtonProps) {
  function sendMessage(msg: string, args: any[] = []) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: msg, arg: args }));
    }
  }

  if (id === "main_grid_button") {
    console.log("made here");
    return (
      <Button
        id={id}
        disabled={disabled}
        onPress={() => {
          console.log(id, button);
          if (onPress) onPress();
        }}
      >
        {children}
      </Button>
    );
  } else if (id === "popup_button") {
    return (
      <Button id={id} onPress={onPress}>
        {children}
      </Button>
    );
  } else if (id === "mute_button") {
    return (
      <Button
        id={id}
        onPress={() => {
          sendMessage("muteAudio");
          console.log("Mute Audio Button Pressed");
        }}
      >
        <Text>Hello world</Text>
        {children}
      </Button>
    );
  } else if (id === "setAudio") {
    return (
      <Button
        id={id}
        onPress={() => {
          sendMessage("setAudio", [audioLevel]);
          console.log("Set Audio Button Pressed");
        }}
      />
    );
  } else if (id === "deafen_button") {
    return (
      <Button
        id={id}
        onPress={() => {
          sendMessage("deafenDiscord");
          console.log("this is a deafen button");
        }}
      >
        <Text>This is a deafen button</Text>
        {children}
      </Button>
    );
  }
}
