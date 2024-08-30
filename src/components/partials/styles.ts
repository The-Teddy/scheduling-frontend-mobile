import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: 200,
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  photoButton: {
    padding: 10,
    margin: 3,
    width: "80%",
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 10,
  },
  textButton: {
    textAlign: "center",
    color: "#007bff",
  },
});
