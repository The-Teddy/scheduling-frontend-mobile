import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 140,
    height: 140,
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 70,
  },
  logoBox: {
    width: 140,
    height: 140,
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage: {
    backgroundColor: "#f2f2f2",
    height: 200,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    position: "relative",
  },
  containerIcon: {
    position: "absolute",
    bottom: 5,
    right: -4,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 7,
    borderRadius: 30,
    backgroundColor: "#f2f2f2",
  },
  cameraIcon: {},
});
