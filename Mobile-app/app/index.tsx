// Imports that might become necessary but curr not
//import Ionicons from '@expo/vector-icons/Ionicons';
//import WebSocket from "ws";

import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainGridVisibility } from "./context/context";
import GeneralButton from "./generalButton";
import Popup from "./popup";

export default function Index() {
  const optionButtonProp = "hover:bg-hover";
  const optionButtonTextProp = "select-none color-text text-center text-base";
  const bottomBar = "w-full h-[10%] bg-accent";
  const topBar = "w-full bg-background";

  const [buttonsPanelVisible, setButtonsPanelVisible] = useState(false);
  const [displayPanelVisible, setDisplayPanelVisible] = useState(false);
  const [audioPanelVisible, setAudioPanelVisible] = useState(false);
  const [gridHeight, setGridHeight] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridButtonsDisabled, setGridButtonsDisabled] = useState(true); // To begin, buttons are disabled
  const [weblink, setWeblink] = useState("");
  const [gridButtonVisibility, setGridButtonVisibility] = useState(false); // To begin, buttons are not visible
  const [socket, setSocket] = useState<WebSocket | undefined>();

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
    setAudioPanelVisible(false);
    setDisplayPanelVisible(false);
    setButtonsPanelVisible(false);
  };

  const toggleButtons = () => {
    setAudioPanelVisible(false);
    setDisplayPanelVisible(false);
    setButtonsPanelVisible(!buttonsPanelVisible);
  };

  const toggleDisplay = () => {
    setButtonsPanelVisible(false);
    setAudioPanelVisible(false);
    setDisplayPanelVisible(!displayPanelVisible);
  };

  const toggleAudio = () => {
    setButtonsPanelVisible(false);
    setDisplayPanelVisible(false);
    setAudioPanelVisible(!audioPanelVisible);
  };

  function save(args: Record<number, string>) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "save", arg: args }));
    } else console.log("Save request could not be sent, SOCKET ERROR");
  }

  function load(ws?: WebSocket) {
    const target = ws ?? socket;

    if (target && target.readyState === WebSocket.OPEN) {
      target.send(JSON.stringify({ type: "load", arg: [] }));
    } else {
      console.log("Socket Error");
      if (!target) console.log("Socket does not exist");
      else if (target.readyState !== WebSocket.OPEN) {
        console.log("Socket not in ready state");
      }
    }
  }

  const [newButton, setNewButton] = useState("");
  const [buttonAssignment, setButtonAssignment] = useState<
    Record<number, string>
  >({});

  const handleGridButtonPress = (index: number) => {
    console.log("NewButton value: ", newButton);
    setButtonAssignment((prev) => ({
      ...prev,
      [index]: newButton,
    }));
    toggleDisableGridButtons();
    setGridButtonVisibility(false);
  };


  function setConnection(weblink: string) {
    setWeblink(weblink);
    const ws = new WebSocket(weblink);

    ws.addEventListener("open", () => {
      console.log("Client Connected to Server");
      setSocket(ws);
      console.log("socket:", socket);
      ws.send(JSON.stringify({ type: "load", arg: [] })); // This has to be direct to ws
    });

    ws.addEventListener("ping", (data) => {
      //socket.pong(); // Not needed for browser level
      console.log("Client got ping");
    });

    ws.addEventListener("message", (event) => {
      console.log("Before parse:", event.data);
      setButtonAssignment(JSON.parse(event.data));
      console.log("After parse:", JSON.parse(event.data));
    });

    ws.addEventListener("close", (event) => {
      console.log("Diconnceted with code:", event.code, event.reason);
      setTimeout(() => setWeblink(""), 3000);
    });
  }
  function disableAndSetNewButton(id: string) {
    setNewButton(id);
    toggleDisableGridButtons();
    setGridButtonVisibility(true);
  }
  return (
    <View className="flex-1 border-4 border-accent">
      <mainGridVisibility.Provider value={gridButtonVisibility}>
        <SafeAreaView className="relative flex-1 justify-center items-center bg-background">
          <View
            className={`${topBar} ${"absolute top-0 h-[90%] overflow-hidden"}`}
          >
            <View
              id={"MAINGRID"}
              className={`${!buttonsPanelVisible && !audioPanelVisible && !displayPanelVisible ? "flex-1" : "hidden"} ${"justify-center items-center"}`}
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
                      id={buttonAssignment[index] ?? "MAINGRID"}
                      disabled={gridButtonsDisabled && !buttonAssignment[index]}
                      onPress={() => handleGridButtonPress(index)}
                      button={newButton}
                    />
                  );
                })}
              </View>
            </View>

            <>
              <Popup visible={buttonsPanelVisible}></Popup>
              <Popup visible={audioPanelVisible}>
                <GeneralButton
                  id={"PANEL"}
                  onPress={() => disableAndSetNewButton("MUTE")}
                >
                  <Text>Mute Button</Text>
                </GeneralButton>

                <GeneralButton
                  id={"PANEL"}
                  onPress={() => disableAndSetNewButton("SETAUDIO")}
                >
                  <Text>Set Audio Button</Text>
                </GeneralButton>

                <GeneralButton
                  id={"PANEL"}
                  onPress={() => disableAndSetNewButton("FORWARD")}
                >
                  <Text>Skip Forward</Text>
                </GeneralButton>
              </Popup>
              <Popup visible={displayPanelVisible}></Popup>
            </>
          </View>

          <View
            className={`${bottomBar} ${"absolute bottom-0 flex-row items-center justify-between px-4"}`}
          >
            <View className="flex-col gap-0">
              <Pressable
                id="Save button"
                className="hover:bg-hover p-2 rounded-xl"
                onPress={() => save(buttonAssignment)}
              >
                <Text className="color-text">Save</Text>
              </Pressable>
              <Pressable
                id="Load Button"
                className="hover:bg-hover p-2 rounded-xl"
                onPress={() => load()}
              >
                <Text className="color-text">Load</Text>
              </Pressable>
            </View>
            <View id="bottom bar" className="flex-row items-center gap-1">
              <Pressable
                className={`${optionButtonProp} ${"rounded-xl p-2"}`}
                onPress={toggleButtons}
              >
                <Text className={`${optionButtonTextProp}`}>Buttons</Text>
              </Pressable>
              <Pressable
                className={`${optionButtonProp} ${"rounded-xl p-2"}`}
                onPress={toggleDisplay}
              >
                <Text className={`${optionButtonTextProp}`}>Display</Text>
              </Pressable>
              <Pressable
                className={`${optionButtonProp} ${"rounded-xl p-2"}`}
                onPress={toggleAudio}
              >
                <Text className={`${optionButtonTextProp}`}>Audio</Text>
              </Pressable>
            </View>

            <View
              id={"connection-weblink"}
              className="bg-background rounded-xl p-1"
            >
              <View className="flex-row items-center">
                <TextInput
                  style={{ color: "#B0A990" }}
                  onSubmitEditing={(e) => {
                    setConnection(e.nativeEvent.text);
                  }}
                  placeholder="Enter Link Here"
                />
                <Image
                  source={
                    weblink
                      ? require("../assets/images/Basic_green_dot.png")
                      : require("../assets/images/Basic_red_dot.png")
                  }
                  style={{ width: 15, height: 15 }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </mainGridVisibility.Provider>
    </View>
  );
}
