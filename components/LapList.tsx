import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

interface Lap {
  time: number;
  difference?: number;
}

interface LapListProps {
  laps: Lap[];
}

const LapList: React.FC<LapListProps> = ({ laps }) => {
  const lapColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#FFC300'];

  const formatTime = (time: number) => {
    const duration = moment.duration(time);
    return `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}.${String(Math.floor(duration.milliseconds() / 10)).padStart(2, '0')}`;
  };

  return (
    <FlatList
      data={laps}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.lapContainer}>
          <Text style={[styles.lapText, { color: lapColors[index % lapColors.length] }]}>
            Lap {index + 1}: {formatTime(item.time)} {item.difference !== undefined && `(+${formatTime(item.difference)})`}
          </Text>
        </View>
      )}
      style={styles.lapList}
    />
  );
};

const styles = StyleSheet.create({
  lapContainer: {
    backgroundColor: '#1e1e1e',
    padding: hp('2%'),
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  lapText: {
    fontSize: hp('2.5%'),
  },
  lapList: {
    width: '100%',
    marginTop: hp('3%'),
  },
});

export default LapList;
