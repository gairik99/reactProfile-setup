import { StyleSheet, View, Button, Alert } from "react-native";
import Input from "../components/Input";
import { useState } from "react";
import { useUser } from "../context/userContext";

export default function UserInputScreen({ navigation }) {
  const { setUser } = useUser();
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    date: "",
  });

  const inputChangeHandler = (inputIdentity, inputValue) => {
    // Handle input change
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputIdentity]: inputValue,
    }));
  };

  const saveUserData = () => {
    // Save user data to context
    const { name, date, email } = inputValues;
    const isNameInvalid = name.trim().length < 2;
    const isEmailInvalid = !email.includes("@") || !email.includes(".");
    const parsedDate = new Date(date);
    const isDateInvalid =
      isNaN(parsedDate.getTime()) || date.trim().length !== 10;

    if (isNameInvalid || isDateInvalid || isEmailInvalid) {
      Alert.alert(
        "Invalid input",
        "Please check your input values:\n- Name must 2 cahracter\n- Date must be valid (YYYY-MM-DD)\n- Email must be valid",
        [{ text: "Okay" }]
      );
      return;
    }
    setUser(inputValues);
    navigation.navigate("PhotoUpload");
  };
  // console.log("UserInputScreen rendered", user);
  return (
    <View style={styles.formContainer}>
      <Input
        label="Full Name "
        onChangeText={(value) => inputChangeHandler("name", value)}
        value={inputValues.name}
        placeholder="Enter your full name"
      />
      <Input
        label="Date of Birth "
        placeholder="YYYY-MM-DD"
        maxLength={10}
        onChangeText={(value) => inputChangeHandler("date", value)}
        value={inputValues.date}
      />
      <Input
        label="Email "
        keyboardType="email-address"
        onChangeText={(value) => inputChangeHandler("email", value)}
        value={inputValues.email}
        placeholder="Enter your email"
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveUserData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 8,
    backgroundColor: "#f0beafff",
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    color: "white",
    width: "90%",
    alignSelf: "center",
  },
});
