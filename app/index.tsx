import { Text, View } from "react-native";
import Modal from 'react-native-modal';
export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-colors-background">
      <Text style={{color: "blue"}} className="text-2xl text-primary font-bold"></Text>
      <Modal isVisible={true}>
        <View className="flex-1 ">
          
        </View>
      </Modal>
    </View>
    
  );
}
