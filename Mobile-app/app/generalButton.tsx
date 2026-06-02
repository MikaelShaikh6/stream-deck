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

  // Yes, this is probably not the best designed, but it works, and gets it done,
  if (id === "MAINGRID") {
    return (
      <Button
        id={id}
        disabled={disabled}
        onPress={() => {
          if (onPress) onPress(); // This is needed
        }}
      >
        {children}
      </Button>
    );
  } else if (id === "PANEL") {
    return (
      <Button id={id} onPress={onPress}>
        {children}
      </Button>
    );
  } else if (id === "MUTE") {
    return (
      <Button
        id={id}
        onPress={() => {
          if (socket) sendMessage("audioMute");
          console.log("Mute Audio Button Pressed");
        }}
      >
        <Text>Mute Button</Text>
        {children}
      </Button>
    );
  } else if (id === "SETAUDIO") {
    return (
      <Button
        id={id}
        onPress={() => {
          if (socket) sendMessage("setAudio", [audioLevel]);
          console.log("Set Audio Button Pressed");
        }}
      />
    );
  } else if (id === "FORWARD") {
  } else if (id === "BACKWARD") {
  } else if (id === "PAUSE") {
  } else if (id === "DEAFENDISCORD") {
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
