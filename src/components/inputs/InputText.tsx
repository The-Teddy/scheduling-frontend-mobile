import React from "react";
import { TextInput, View } from "react-native";

const InputText: React.FC = () => {
  return (
    <View>
      <TextInput
        placeholder="teste"
        style={{ backgroundColor: "#f2f2f2", height: 50 }}
      />
    </View>
  );
};

export { InputText };
