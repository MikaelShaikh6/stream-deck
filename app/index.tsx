import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [settingsVisible, setSettingsVisible] = useState(false);

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <View className="flex-1 border-4 border-accent">
      <SafeAreaView className="relative flex-1 justify-center items-center bg-background">
        <Pressable onPress={toggleSettings} className="flex-1 bg-black/10 rounded-xl absolute top-5 right-5">
          <Ionicons name="settings" size={32} color="black"/>
        </Pressable>
        <Modal transparent={true} visible={settingsVisible} onRequestClose={toggleSettings} className="relative flex-1 justify-center items-center">
          <View className="absolute flex-1 flex-col bg-black/50 rounded-xl px-6 py-4 top-10 right-10 gap-2">
            <Text className="color-text">Buttons</Text>
            <Text className="color-text">Audio</Text>
            <Text className="color-text">Display</Text>
            <Pressable onPress={toggleSettings} className="flex-1 absolute top-1 left-1.5">
              <Text className="color-red-500 font-bold">X</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
