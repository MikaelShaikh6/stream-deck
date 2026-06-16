import React, { ReactNode, useContext, useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "./button";
import { mainGridVisibility } from "./context/context";
import { audioData, addData } from "./data/data";

type GeneralButtonProps = {
  id: string;
  buttonIndex?: number;
  onPress?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  socket?: WebSocket;
  className?: string;
};

function sendMessage(socket: WebSocket, msg: string, args: any[] = []) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: msg, data: { args } }));
  }
}

function MainGridButton({ id, disabled, onPress, className, children }: GeneralButtonProps) {
  const visible = useContext(mainGridVisibility);
  return (
    <Button
      id={id}
      className={`${!visible ? "invisible" : ""} ${className}`}
      disabled={disabled}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      {children}
    </Button>
  );
}

function PanelButton({ id, onPress, children }: GeneralButtonProps) {
  return (
    <Button
      id={id}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      {children}
    </Button>
  );
}

function MuteButton({ id, socket, children }: GeneralButtonProps) {
  return (
    <Button
      id={id}
      onPress={() => {
        if (socket) sendMessage(socket, "audioMute");
      }}
    >
      <Text>Mute Button</Text>
    </Button>
  );
}

function SetAudioButton({ id, socket, buttonIndex }: GeneralButtonProps) {
  const [audioText, setAudioText] = useState("");
  const [audioTextVisible, setAudioTextVisible] = useState(false);
  const [audioTextInputVisible, setAudioTextInputVisible] = useState(true);

  useEffect(() => {
    if (!buttonIndex) {
      console.error("Button Index is NECESSARY and is missing for this type of button");
      return;
    }


    if (audioData[buttonIndex]) {
      setAudioText(audioData[buttonIndex]);
      setAudioTextVisible(true);
      setAudioTextInputVisible(false);
    }
  }, [buttonIndex]);

  function storeAudioData(key: number, data: string) {
    addData(key, data);
  }

  return (
    <Button
      id={id}
      onPress={() => {
        if (socket) {
          console.log("Set Audio Message Sent");
          sendMessage(socket, "setAudio", [parseInt(audioText) / 100]);
        }
        console.log("Pressed Set Audio Button");
      }}
    >
      <View className={"flex-row items-center justify-center"}>
        <Text className={`${audioTextVisible ? "" : "hidden"} "color-text"`}>Set to: {audioText}</Text>
        <TextInput className={`${audioTextInputVisible ? "" : "hidden"} "w-[80%] h-[80%] text-center color-text"`} placeholder="Enter Here"
          onSubmitEditing={(e) => {
            if (!buttonIndex) {
              console.error("Button Index is NECESSARY and is missing for this type of button");
              return;
            }
            setAudioText(e.nativeEvent.text);
            storeAudioData(buttonIndex, e.nativeEvent.text);
            setAudioTextVisible(true);
            setAudioTextInputVisible(false);
          }}
        />
      </View>
    </Button >
  );
}


const buttonComponents: Record<string, React.ComponentType<any>> = {
  MUTE: MuteButton,
  SETAUDIO: SetAudioButton,
  MAINGRID: MainGridButton,
  PANEL: PanelButton,
};

export default function GeneralButton({ id, ...props }: GeneralButtonProps) {
  const Component = buttonComponents[id];
  if (!Component) return null;
  return <Component {...props} />;
}
