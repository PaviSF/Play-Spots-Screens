import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProfileList = ({ label,color }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.label,{color}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 4,
    marginHorizontal:10,
  },
  label: {
    margin: 17,
    fontWeight: '500',
    fontSize: 17,
  },
});

export default ProfileList;
