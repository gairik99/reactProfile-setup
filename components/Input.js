import { View, Text, TextInput, StyleSheet } from "react-native";

const Input = ({ label, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 16,
    color: "#393a02ff",
    marginBottom: 4,
  },
  input: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "#e8b9b9ff",
    borderRadius: 6,
    borderColor: "red",
    borderWidth: 1,
    fontSize: 16,
    color: "#180101ff",
  },
});

export default Input;
