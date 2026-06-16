import React, { ReactNode, useContext, useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "./button";
import { mainGridVisibility } from "./context/context";

type GeneralButtonProps = {
  id: string;
  onPress?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  socket?: WebSocket;
};

export default function GeneralButton({
  id,
  disabled = false,
  onPress,
  children,
  socket,
}: GeneralButtonProps) {

  const visible = useContext(mainGridVisibility);
  function sendMessage(msg: string, args: any[] = []) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: msg, arg: args }));
    }
  }
  // Audio Stuff
  const [audioLevel, setAudioLevel] = useState(-1);
  const [audioTextVisible, setAudioTextVisible] = useState(false);
  const [audioTextInputVisible, setAudioTextInputVisible] = useState(true);
  const [audioText, setAudioText] = useState("");

  async function getAudioLevel() {
    return new Promise((resolve, reject) => {
      if (!socket) {
        resolve(-1);
        return -1;
      }
      const timeout = setTimeout(() => {
        socket.removeEventListener("message", handler)
        reject(new Error("getAudioLevel timed out"));
      }, 5000)

      function handler(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (data.type === "getAudio") {
          clearTimeout(timeout);
          if (socket) {
            socket.removeEventListener("message", handler);
            resolve(data.data);
          }
        }
      }

      sendMessage("getAudioLevel");
      socket.addEventListener("message", handler);
    })

  }

  async function setAudio(newLevel: number) {
    if (socket) sendMessage("setAudio", [newLevel]);
  }


  // Yes, this is probably not the best designed, but it works, and gets it done,
  if (id === "MAINGRID") {
    return (
      <Button
        className={!visible ? "invisible" : ""}
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
    console.log("Rendering MUTE button");
    return (
      <Button
        id={id}
        onPress={() => {
          if (socket) {
            sendMessage("audioMute");
          }
          console.log("Mute Audio Button Pressed");
        }}
      >
        <Text>Mute Button</Text>
      </Button >
    );
  } else if (id === "GETAUDIO") {
    return (
      <Button
        id={id}
        onPress={() => {

        }}
      >
      </Button>
    )
  } else if (id === "SETAUDIO") {
    return (
      <Button
        id={id}
        onPress={() => {
          if (socket) {
            console.log("Set Audio Message Sent");
            sendMessage("setAudio", [parseInt(audioText) / 100]);
          }
          console.log("Pressed Set Audio Button");
        }}
      >
        <View className="flex-row items-center justify-center">
          <Text className={`${audioTextVisible ? "" : "hidden"}`}>Set to: {audioText}</Text>
          <TextInput className={`${audioTextInputVisible ? "" : "hidden"} "w-[80%] h-[80%] text-center color-text"`} placeholder="Enter Here"
            onSubmitEditing={(e) => {
              setAudioText(e.nativeEvent.text);
              setAudioTextVisible(true);
              setAudioTextInputVisible(false);
            }}
          />
        </View>
      </Button >
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
  return null;
}
