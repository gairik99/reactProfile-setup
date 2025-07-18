import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  Image,
  Button,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useUser } from "../context/userContext";

export default function ImagePickers({ navigation, router }) {
  const { setUser } = useUser();
  const [pickedImage, setPickedImage] = useState("");
  // const user = router?.params || {};

  async function verifyPermissions(forCamera = false) {
    if (forCamera) {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status === ImagePicker.PermissionStatus.UNDETERMINED) {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
      }
      if (status === ImagePicker.PermissionStatus.DENIED) {
        showPermissionAlert("Camera access is needed to take a photo.");
        return false;
      }
    } else {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status === ImagePicker.PermissionStatus.UNDETERMINED) {
        const { granted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
      }
      if (status === ImagePicker.PermissionStatus.DENIED) {
        showPermissionAlert("Media library access is needed to pick a photo.");
        return false;
      }
    }
    return true;
  }

  const processImage = async (uri) => {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 256, height: 256 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    const timestamp = Date.now();
    const fileName = `${timestamp}.jpg`;
    const newPath = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({
      from: manipulated.uri,
      to: newPath,
    });

    return newPath;
  };

  function showPermissionAlert(message) {
    Alert.alert("Permission required", message, [
      { text: "Cancel", style: "cancel" },
      { text: "Open Settings", onPress: () => Linking.openSettings() },
    ]);
  }
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions(false);
    // console.log("hasPermission", hasPermission);
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // console.log(result);
    if (!result.canceled) {
      const resizedUri = await processImage(result.assets[0].uri);
      setPickedImage(resizedUri);
      // Pass the image URI to the parent component
    }
  };

  const pickImageFromGalleryHandler = async () => {
    const hasPermission = await verifyPermissions(false);
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const resizedUri = await processImage(result.assets[0].uri);
      setPickedImage(resizedUri);
    }
  };

  const handleSave = () => {
    if (!pickedImage) {
      Alert.alert("No image selected", "Please select an image before saving.");
      return;
    }
    // Here you can handle the save logic, e.g., upload the image to a server
    setUser((prevUser) => ({
      ...prevUser,
      photo: pickedImage,
    }));
    navigation.navigate("Completion");
  };

  let imagePreview = <Text>No image picked yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  // console.log("ImagePickers rendered", pickedImage);
  // console.log("User photo:", user);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button onPress={takeImageHandler} title="Take Image" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={pickImageFromGalleryHandler} title="Gallery" />
        </View>
      </View>
      <View style={styles.saveButton}>
        <Button onPress={handleSave} title="Save Image" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0beafff",
  },
  imageContainer: {
    width: 256,
    height: 256,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
    color: "white",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonWrapper: {
    marginHorizontal: 8,
    flex: 1,
  },
  saveButton: {
    marginTop: 16,
    color: "white",
    width: "90%",
    alignSelf: "center",
  },
});
