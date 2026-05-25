import React, {ReactNode} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider'

type MySliderProps = {
  id: string;
  label: string;
  currValue: number;
  setTo: (val: number, program?: string) => void;
  vert: boolean;
  sliderProps?: string;
}

export default function MySlider({
                                   id,
                                   label,
                                   currValue,
                                   setTo,
                                   vert,
                                   sliderProps = "w-[308px] h-[96px] flex-1 justify-center items-center rounded-xl bg-accent",
                                 }: MySliderProps) {
  if (vert) {
    return (
      <View className={sliderProps}>
      </View>
    );
  }
  return (
    <View className={sliderProps}>
      <Text className={"mb-4"}>{`${label}`}</Text>
      <Slider
        style={{width: '90%', height: 5,}}
        minimumValue={0}
        maximumValue={1}
        value={currValue}
        onValueChange={(val) => setTo(val)}
        minimumTrackTintColor={"grey"}
        maximumTrackTintColor={"purple"}
        thumbTintColor={"blue"}
      />
    </View>
  );
}