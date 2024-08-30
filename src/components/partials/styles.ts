import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: 150,
    width: "90%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButton: {
    padding: 10,
    margin: 3,
    width: 125,
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 10,
  },
  cancelButton: {
    padding: 10,
    margin: 3,
    width: 125,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
  },
  textButton: {
    textAlign: "center",
  },
  boxButton: {
    flexDirection: "row",
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});
