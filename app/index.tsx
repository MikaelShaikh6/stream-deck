import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {colors} from "@/constants/colors";

export default function Index() {
  const main_button_prop = "w-20 h-5 hover:bg-black/10";

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [displayVisible, setDisplayVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };
  const toggleButtons = () => {
    setButtonsVisible(!buttonsVisible);
  }
  const toggleDisplay = () => {
    setDisplayVisible(!displayVisible);
  }
  const toggleAudio = () => {
    setAudioVisible(!audioVisible);
  }

  return (
    <View className="flex-1 border-4 border-accent">
      <SafeAreaView className="relative flex-1 justify-center items-center bg-background">
        <Pressable onPress={toggleSettings} className="bg-black/10 rounded-xl absolute top-5 right-5">
          <Ionicons name="settings" size={32} color="black"/>
          <Modal transparent={true} visible={settingsVisible} onRequestClose={toggleSettings} className="relative flex-1 justify-center items-center">
            <View className="size-30 absolute flex-1 flex-col bg-black/50 rounded-xl px-1 py-1 top-10 right-10 gap-2">
              <Pressable className={`${main_button_prop}`} onPress={toggleButtons}>
                <Text className="color-text text-center">Buttons</Text>
              </Pressable>
              <Pressable onPress={toggleAudio}>
                <Text className="color-text text-center">Audio</Text>
              </Pressable>
              <Pressable onPress={toggleDisplay}>
                <Text className="color-text text-center">Display</Text>
              </Pressable>
            </View>
          </Modal>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
