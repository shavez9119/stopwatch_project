import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// Importing the components
import { TimerDisplay, ActionButton, LapList } from './components/Index';

const App: React.FC = () => {
  // creating app's local state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<{ time: number; difference?: number }[]>([]);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 100);
      }, 100);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Load saved timer data
  useEffect(() => {
    const loadTimerData = async () => {
      const storedElapsedTime = await AsyncStorage.getItem('elapsedTime');
      const storedLaps = await AsyncStorage.getItem('laps');
      const storedIsRunning = await AsyncStorage.getItem('isRunning');

      if (storedElapsedTime) setElapsedTime(parseInt(storedElapsedTime, 10));
      if (storedLaps) setLaps(JSON.parse(storedLaps));
      if (storedIsRunning === 'true') setIsRunning(true);
    };

    loadTimerData();
  }, []);

  // Save timer data
  const storeTimerData = async () => {
    await AsyncStorage.multiSet([
      ['elapsedTime', elapsedTime.toString()],
      ['laps', JSON.stringify(laps)],  // Store laps data
      ['isRunning', isRunning.toString()],
    ]);
  };

  useEffect(() => {
    storeTimerData();
  }, [elapsedTime, laps, isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const lapTimer = () => {
    const newLap = { time: elapsedTime };
    if (laps.length > 0) {
      newLap.difference = elapsedTime - laps[laps.length - 1].time;
    }
    const updatedLaps = [...laps, newLap];
    setLaps(updatedLaps);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TimerDisplay elapsedTime={elapsedTime} />
      <View style={styles.buttonContainer}>
        <ActionButton
          title={isRunning ? "Stop" : "Start"}
          onPress={isRunning ? stopTimer : startTimer}
          buttonStyle={isRunning ? styles.buttonStop : styles.buttonStart}
        />
        {isRunning ? (
          <ActionButton title="Lap" onPress={lapTimer} buttonStyle={styles.buttonLap} />
        ) : (
          elapsedTime > 0 && (
            <ActionButton title="Reset" onPress={resetTimer} buttonStyle={styles.buttonReset} />
          )
        )}
      </View>
      <LapList laps={laps} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: wp('5%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: hp('3%'),
  },
  buttonStart: {
    backgroundColor: '#28a745',
  },
  buttonStop: {
    backgroundColor: '#dc3545',
  },
  buttonReset: {
    backgroundColor: '#ffc107',
  },
  buttonLap: {
    backgroundColor: '#007bff',
  },
});

export default App;
