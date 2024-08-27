import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  font-weight: bold;
  margin-bottom: ${RFValue(10)}px;
`;

export const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: ${RFValue(10)}px;
  margin-bottom: ${RFValue(20)}px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: ${RFValue(15)}px;
  width: 100%;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${RFValue(18)}px;
  font-weight: bold;
`;

export const styles = StyleSheet.create({
  link: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: RFValue(18),
  },
  text: {
    fontSize: RFValue(18),
  },
  textLinkContainer: {
    flexDirection: "row", // Alinha o texto e o link na mesma linha
    alignItems: "center",
    marginTop: RFValue(15),
    marginBottom: RFValue(25),
  },
  labelInput: {
    fontSize: RFValue(12),
    fontWeight: "500",
    marginRight: "auto",
  },
  inputBox: {
    flexDirection: "row",
    input: {
      width: "100%",
      // marginLeft: 20,
    },
    inputEye: {
      position: "absolute",
      right: 20,
      top: 10,
    },
  },
  input: {
    // marginTop: 10,
  },
});
