import React, { useState } from "react";
import { View, Modal, Text, Button } from "react-native";

import { styles } from "./styles";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  setView: boolean;
  isProfile: boolean;
  handleViewPhoto: () => void;
  handleChoosePhoto: () => void;
  handleViewModal: () => void;
};
const ProfilePhotoModal: React.FC<Props> = ({ ...props }) => {
  return (
    <Modal transparent={true} visible={props.setView} animationType="none">
      <TouchableWithoutFeedback onPress={props.handleViewModal}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={props.handleViewPhoto}
              >
                <Text style={styles.textButton}>
                  Ver foto de {props.isProfile ? "Perfil" : "Capa"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={props.handleChoosePhoto}
              >
                <Text style={styles.textButton}>
                  Escolher foto de {props.isProfile ? "Perfil" : "Capa"}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.photoButton}
                onPress={props.handleTakePhoto}
              >
                <Text style={styles.textButton}>
                  Tirar foto para {props.isProfile ? "o Perfil" : "a Capa"}
                </Text>
              </TouchableOpacity> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export { ProfilePhotoModal };
