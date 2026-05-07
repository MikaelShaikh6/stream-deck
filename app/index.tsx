//import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState} from 'react';
import {Pressable, Text, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
  const optionButtonProp = "hover:bg-black/10 rounded-full";
  const optionButtonTextProp = "select-none color-text text-center text-base";
  const popupOuterProp = "flex-1 items-center justify-center";
  const popupInnerProp = "h-[80%] w-[80%] bg-blue-500 rounded-xl items-center justify-center";
  const flexBoxProp = "flex-row flex-wrap justify-evenly p-2";
  const boxProp = "w-[23%] h-24 bg-blue-700 rounded-xl select-none mb-2";
  const bottomBar = "absolute flex-box bottom-0 w-[100%] h-[10%] bg-blue-700";
  const topBar = "absolute flex-box top-0 w-[100%] h-[90%] bg-green-700";

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);

  const toggleSettings = () => {
    setAudioVisible(false);
    setDisplayVisible(false);
    setButtonsVisible(false);
    setSettingsVisible(!settingsVisible);
  };
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

        <View className={`${bottomBar}`}>
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
        <View className={`${topBar}`}>
          <View pointerEvents="box-none" className={`${buttonsVisible ? "center" : "hidden"} ${popupOuterProp}`}>
            <View className={`${popupInnerProp}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flexBoxProp}`}>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View pointerEvents="box-none"
                className={`${displayVisible ? "center" : "hidden"} ${popupOuterProp}`}>
            <View className={`${popupInnerProp} ${"bg-purple-100"}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flexBoxProp}`}>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View pointerEvents="box-none" className={`${audioVisible ? "center" : "hidden"} ${popupOuterProp}`}>
            <View className={`${popupInnerProp}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flexBoxProp}`}>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                  <View className={`${boxProp}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
