import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useState} from 'react';
import {Modal, Pressable, Text, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "@/constants/colors";

export default function Index() {
  const main_button_prop = "hover:bg-black/10 rounded-full";
  const button_text_prop = "select-none color-text text-center text-base";
  const popup_prop_outer = "flex-1 items-center justify-center pointer-events-none";
  const popup_prop_inner = "h-[80%] w-[80%] bg-blue-500 rounded-xl items-center justify-center";
  const flex_box_prop = "flox-row flex-wrap gap-2";
  const box_prop = "w-[22%] h-24 bg-blue-700 rounded-xl select-none";

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
    console.log(buttonsVisible);
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
        <Pressable onPress={toggleSettings}
                   className="bg-black/10 rounded-xl absolute top-3 right-3">
          <View>
            <Ionicons className={settingsVisible ? "hidden" : "flex"} name="settings" size={32} color="black"/>
          </View>
        </Pressable>
        <Modal transparent={true} visible={settingsVisible} onRequestClose={toggleSettings}
               className="relative flex-1 justify-center items-center">
          <Pressable className="absolute top-2 right-5 z-10000" onPress={toggleSettings}>
            <Text className={"red text-[30px] select-none"}>X</Text>
          </Pressable>

          <View className="absolute bg-black/50 rounded-xl px-1 py-1 top-9 right-9 gap-1">
            <Pressable className={`${main_button_prop}`} onPress={toggleButtons}>
              <Text className={`${button_text_prop}`}>Buttons</Text>
            </Pressable>
            <Pressable className={`${main_button_prop}`} onPress={toggleDisplay}>
              <Text className={`${button_text_prop}`}>Display</Text>
            </Pressable>
            <Pressable className={`${main_button_prop}`} onPress={toggleAudio}>
              <Text className={`${button_text_prop}`}>Audio</Text>
            </Pressable>
          </View>

          <View className={`${buttonsVisible ? "center" : "hidden"} ${popup_prop_outer}`}>
            <View className={`${popup_prop_inner}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flex_box_prop}`}>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View className={`${displayVisible ? "center" : "hidden"} ${popup_prop_outer}`}>
            <View className={`${popup_prop_inner}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flex_box_prop}`}>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>

          <View className={`${audioVisible ? "center" : "hidden"} ${popup_prop_outer}`}>
            <View className={`${popup_prop_inner}`}>
              <ScrollView className="w-[50%] h-[50%] bg-amber-500">
                <View className={`${flex_box_prop}`}>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                  <View className={`${box_prop}`}></View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
