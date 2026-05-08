//import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Popup from './popup';

export default function Index() {
  const optionButtonProp = "hover:bg-black/10 rounded-20 p-1";
  const optionButtonTextProp = "select-none color-text text-center text-base";
  const popupOuterProp = "flex-1 items-center justify-center";
  const popupInnerProp = "h-[80%] w-[80%] bg-blue-500 rounded-xl items-center justify-center";
  const flexBoxProp = "flex-row flex-wrap justify-evenly p-2";
  const boxProp = "w-[154px] h-[96px] aspect-square bg-blue-700 rounded-xl select-none mb-2";
  const bottomBar = "absolute bottom-0 flex-row items-center justify-between px-4 bottom-0 w-full h-[10%] bg-blue-700";
  const topBar = "absolute flex-box top-0 w-full h-[90%] bg-green-700";
  const scrollPanelProp = "ml-[10%] w-[90%] bg-amber-500";

  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);

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

  return (
    <View className="flex-1 border-4 border-accent">
      <SafeAreaView className="relative flex-1 justify-center items-center bg-background">

        <View className={`${topBar}`}>
          <Popup visible={buttonsVisible}>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
          </Popup>

          <Popup visible={audioVisible}>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
          </Popup>

          <Popup visible={displayVisible}>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
            <View className={`${boxProp}`}></View>
          </Popup>
        </View>
          
        <View className={`${bottomBar}`}>
          <View className="bg-amber-50">
            <Text>
              Hello world
            </Text>
          </View>
          <View className="flex-row gap-5">
            <Pressable className={`${optionButtonProp}`} onPress={toggleButtons}>
              <Text className={`${optionButtonTextProp}`}>Buttons</Text>
            </Pressable>
            <Pressable className={`${optionButtonProp}`} onPress={toggleDisplay}>
              <Text className={`${optionButtonTextProp}`}>Display</Text>
            </Pressable>
            <Pressable className={`${optionButtonProp}`} onPress={toggleAudio}>
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
