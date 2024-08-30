import React, { useState } from "react";
import { View, Modal, Text, Button } from "react-native";

import { styles } from "./styles";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

type Props = {
  title: string;
  loading: boolean;
  setView: boolean;
  handleSubmit: () => void;
  handleViewModal: () => void;
};
const ConfirmModal: React.FC<Props> = ({ ...props }) => {
  return (
    <Modal transparent={true} visible={props.setView} animationType="none">
      <TouchableWithoutFeedback onPress={props.handleViewModal}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{props.title}</Text>
              <View style={styles.boxButton}>
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { opacity: props.loading ? 0.2 : 1 },
                  ]}
                  onPress={props.handleSubmit}
                  disabled={props.loading}
                >
                  <Text style={styles.textButton}>
                    {props.loading ? (
                      <ActivityIndicator size="small" color="gray" />
                    ) : (
                      "Salvar"
                    )}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={props.loading}
                  style={[
                    styles.cancelButton,
                    { opacity: props.loading ? 0.2 : 1 },
                  ]}
                  onPress={props.handleViewModal}
                >
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export { ConfirmModal };
