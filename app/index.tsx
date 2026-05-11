//import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Popup from './popup';
import GeneralButton from "./generalButton"

export default function Index() {
  const optionButtonProp = "hover:bg-black/10";
  const optionButtonTextProp = "select-none color-text text-center text-base";
  const boxProp = "w-[154px] h-[96px] bg-blue-700 select-none aspect-square rounded-xl mb-2";
  const bottomBar = "w-full h-[10%] bg-accent";
  const topBar = "w-full h-[90%] bg-background";

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);
  let [audioMuted, setAudioMuted] = useState(false); // TODO: This shouldn't be here, if it is it needs to reflect system audio

  const toggleButtons = () => {
    setAudioVisible(false);
    setDisplayVisible(false);
    setButtonsVisible(!buttonsVisible);
  }
  const toggleDisplay = () => {
    setButtonsVisible(false);
    setAudioVisible(false);
    setDisplayVisible(!displayVisible);
  }
  const toggleAudio = () => {
    setButtonsVisible(false);
    setDisplayVisible(false);
    setAudioVisible(!audioVisible);
  }
  let triggerMute = () => {
    // TODO: This function once desktop app is set up, currently nothing should happen;
    if (!audioMuted) {
      console.log("Audio is muted");
    } else {
      console.log("Audio is unmuted");
    }
    setAudioMuted(!audioMuted);
  }

  return (
    <View className="flex-1 border-4 border-accent">
      <SafeAreaView className="relative flex-1 justify-center items-center bg-background">
        <View className={`${topBar} ${"flex-box absolute top-0"}`}>
          <Popup visible={buttonsVisible}>
            <View></View>
          </Popup>

          <Popup visible={audioVisible}>
            <GeneralButton id={"mute button"} triggerMute={triggerMute}>
              <View className={audioMuted ? "hidden select-none" : "visible select-none"}>
                <Text className={"select-none"}>Audio is not muted</Text>
              </View>
              <View className={audioMuted ? "visible select-none" : "hidden select-none"}>
                <Text>Audio is muted</Text>
              </View>
            </GeneralButton>
          </Popup>

          <Popup visible={displayVisible}>
            <View></View>
          </Popup>
        </View>

        <View className={`${bottomBar} ${"absolute bottom-0 flex-row items-center justify-between px-4"}`}>
          <View className="bg-amber-50">
            <Text>
              Hello world
            </Text>
          </View>

          <View id="bottom bar" className="flex-row items-center gap-5">
            <Pressable className={`${optionButtonProp} ${"rounded-20 p-1"}`} onPress={toggleButtons}>
              <Text className={`${optionButtonTextProp}`}>Buttons</Text>
            </Pressable>
            <Pressable className={`${optionButtonProp} ${"rounded-20 p-1"}`} onPress={toggleDisplay}>
              <Text className={`${optionButtonTextProp}`}>Display</Text>
            </Pressable>
            <Pressable className={`${optionButtonProp} ${"rounded-20 p1"}`} onPress={toggleAudio}>
              <Text className={`${optionButtonTextProp}`}>Audio</Text>
            </Pressable>
          </View>

          <View className="bg-yellow-400">
            <Text>Hello world 2</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
