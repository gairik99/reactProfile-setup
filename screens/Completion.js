import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useUser } from "../context/userContext";

export default function Completion({ navigation }) {
  const { user } = useUser();
  // console.log("Completion screen rendered", user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Photo Saved Successfully</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.photo }} style={styles.image} />
      </View>
      <View>
        <Button
          title="edit image"
          onPress={() => navigation.goBack("PhotoUpload")}
        />
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
  text: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333",
  },
});
