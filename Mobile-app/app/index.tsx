// Imports that might become necessary but curr not
//import Ionicons from '@expo/vector-icons/Ionicons';
//import WebSocket from "ws";

import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralButton from "./generalButton";
import Popup from "./popup";

export default function Index() {
  const optionButtonProp = "hover:bg-black/10";
  const optionButtonTextProp = "select-none color-text text-center text-base";
  const bottomBar = "w-full h-[10%] bg-accent";
  const topBar = "w-full bg-background";

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);
  const [gridHeight, setGridHeight] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridButtonsDisabled, setGridButtonsDisabled] = useState(true);
  const [weblink, setWeblink] = useState("");

  const BUTTON_WIDTH = 156;
  const BUTTON_HEIGHT = 96;
  const GAP = 24; // gap-6
  const numColumns = Math.max(
    1,
    Math.floor((gridWidth + GAP) / (BUTTON_WIDTH + GAP)),
  );
  const numRows = Math.max(
    1,
    Math.floor((gridHeight + GAP) / (BUTTON_HEIGHT + GAP)),
  );

  const buttons = Array.from(
    { length: numRows * numColumns },
    (_, i) => `Btn ${i + 1}`,
  );

  const toggleDisableGridButtons = () => {
    setGridButtonsDisabled(!gridButtonsDisabled);
    setAudioVisible(false);
    setDisplayVisible(false);
    setButtonsVisible(false);
  };

  const toggleButtons = () => {
    setAudioVisible(false);
    setDisplayVisible(false);
    setButtonsVisible(!buttonsVisible);
  };

  const toggleDisplay = () => {
    setButtonsVisible(false);
    setAudioVisible(false);
    setDisplayVisible(!displayVisible);
  };

  const toggleAudio = () => {
    setButtonsVisible(false);
    setDisplayVisible(false);
    setAudioVisible(!audioVisible);
  };

  const [newButton, setNewButton] = useState("");

  const [buttonAssignment, setButtonAssignment] = useState<
    Record<number, string>
  >({});

  const handleGridButtonPress = (index: number) => {
    setButtonAssignment((prev) => ({
      ...prev,
      [index]: newButton,
    }));
    toggleDisableGridButtons();
  };

  const [socket, setSocket] = useState<WebSocket | undefined>();
  function setConnection(weblink: string) {
    setWeblink(weblink);

    const ws = new WebSocket(weblink);
    ws.addEventListener("open", () => {
      console.log("connected to server");
    });
    ws.addEventListener("ping", (data) => {
      //socket.pong();
      console.log("got ping");
    });

    ws.addEventListener("close", (event) => {
      console.log("Diconnceted with code:", event.code, event.reason);
      setTimeout(() => setWeblink(""), 3000);
    });
    setSocket(ws);
  }

  return !weblink ? (
    <View id={"Weblink Page"}>
      <TextInput
        onSubmitEditing={(e) => {
          setConnection(e.nativeEvent.text);
        }}
        placeholder="Enter Weblink found on desktop app"
      />
    </View>
  ) : (
    <View className="flex-1 border-4 border-accent">
      <SafeAreaView className="relative flex-1 justify-center items-center bg-background">
        <View
          className={`${topBar} ${"absolute top-0 h-[90%] overflow-hidden"}`}
        >
          <View
            id={"main grid"}
            className={`${!buttonsVisible && !audioVisible && !displayVisible ? "flex-1" : "hidden"} ${"justify-center items-center"}`}
            onLayout={(e) => {
              setGridHeight(e.nativeEvent.layout.height);
              setGridWidth(e.nativeEvent.layout.width);
            }}
          >
            <View
              className={
                "flex-row flex-wrap gap-x-8 gap-y-4 justify-center items-center overflow-hidden select-none"
              }
            >
              {buttons.map((btn, index) => {
                return (
                  <GeneralButton
                    key={index}
                    socket={socket}
                    id={buttonAssignment[index] ?? "main_grid_button"}
                    disabled={gridButtonsDisabled && !buttonAssignment[index]}
                    onPress={() => handleGridButtonPress(index)}
                    button={newButton}
                  />
                );
              })}
            </View>
          </View>

          <Popup visible={buttonsVisible}>
            <GeneralButton
              id={"popup_button"}
              onPress={() => {
                setNewButton("mute_button");
                toggleDisableGridButtons();
              }}
            ></GeneralButton>
            <GeneralButton
              id={"popup_button"}
              onPress={() => {
                setNewButton("deafen_button");
                toggleDisableGridButtons();
              }}
            ></GeneralButton>
          </Popup>

          <Popup visible={audioVisible}></Popup>

          <Popup visible={displayVisible}></Popup>
        </View>

        <View
          className={`${bottomBar} ${"absolute bottom-0 flex-row items-center justify-between px-4"}`}
        >
          <View className="bg-amber-50">
            <Text>Hello world</Text>
          </View>

          <View id="bottom bar" className="flex-row items-center gap-5">
            <Pressable
              className={`${optionButtonProp} ${"rounded-20 p-1"}`}
              onPress={toggleButtons}
            >
              <Text className={`${optionButtonTextProp}`}>Buttons</Text>
            </Pressable>
            <Pressable
              className={`${optionButtonProp} ${"rounded-20 p-1"}`}
              onPress={toggleDisplay}
            >
              <Text className={`${optionButtonTextProp}`}>Display</Text>
            </Pressable>
            <Pressable
              className={`${optionButtonProp} ${"rounded-20 p1"}`}
              onPress={toggleAudio}
            >
              <Text className={`${optionButtonTextProp}`}>Audio</Text>
            </Pressable>
          </View>

          <View id={"connection-weblink"} className="bg-yellow-400">
            <Text>{weblink}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
