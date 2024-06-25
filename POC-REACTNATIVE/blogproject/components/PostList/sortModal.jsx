import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

const SortModal = ({ isVisible, toggleModal, handleSortOptionChange }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 300,
            backgroundColor: "white",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
            Sort Options
          </Text>
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() => handleSortOptionChange("latest")}
          >
            <Text style={{ fontSize: 16 }}>Latest Posts First</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() => handleSortOptionChange("oldest")}
          >
            <Text style={{ fontSize: 16 }}>Oldest Posts First</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSortOptionChange("name")}>
            <Text style={{ fontSize: 16 }}>Sort by Name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 16, alignSelf: "flex-end" }}
            onPress={toggleModal}
          >
            <Text style={{ fontSize: 16, color: "blue" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SortModal;
