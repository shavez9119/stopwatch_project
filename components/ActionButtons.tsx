import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: object;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: hp('2%'),
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});

export default ActionButton;
