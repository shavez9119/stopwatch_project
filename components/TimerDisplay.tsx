import React from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface TimerDisplayProps {
  elapsedTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ elapsedTime }) => {
  const formatTime = (time: number) => moment.utc(time).format("mm:ss:SS");

  return (
    <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: hp('8%'),
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('3%'),
    backgroundColor: '#1e1e1e',
    borderRadius: hp("10%"),
    padding: hp('3%'),
    width: wp("90%"),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default TimerDisplay;
