import React, { useState, useEffect, useCallback } from 'react';

import Button from '../Button';

import PropTypes from 'prop-types';
import { timerCounter } from '../../utils/timerCounter';
import useInterval from '../../hooks/useInterval';

import { Text, KeyboardAvoidingView, Vibration, Image } from 'react-native';

import styled from 'styled-components/native';

function Timer(props) {
    const [mainTime, setMainTime] = useState(props.pomodoro);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true)
    );

    const [inputWork, setInputWork] = useState('');
    const [inputRest, setInputRest] = useState('');

    const ONE_SECOND_IN_MS = 500;

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null
    );

    const handleWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);

        if (inputWork) setMainTime(inputWork);
        else if (!inputWork) {
            setMainTime(props.pomodoro);
        }
    }, [
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        inputWork,
        props.pomodoro,
    ]);

    const handleRestTime = useCallback(
        (restTime) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            if (restTime) {
                setMainTime(props.longTime);
            } else {
                if (inputRest) {
                    setMainTime(inputRest);
                } else if (!inputRest) {
                    setMainTime(props.shortTime);
                }
            }
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            inputRest,
            props.longTime,
            props.shortTime,
        ]
    );

    const handleStop = useCallback(() => {
        setTimeCounting(!timeCounting);
    }, [setTimeCounting, timeCounting]);

    const handleReset = useCallback(() => {
        setTimeCounting(false);
        setMainTime(props.pomodoro);
        setNumberOfPomodoros(0);
        setCompletedCycles(0);
    }, [setTimeCounting, setMainTime, props.pomodoro]);

    useEffect(() => {
        if (mainTime > 0) return;

        if (mainTime === 0) {
            Vibration.vibrate(ONE_SECOND_IN_MS);
        }

        if (working && cyclesQtdManager.length > 0) {
            handleRestTime(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            handleRestTime(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }
        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) handleWork();
    }, [
        working,
        resting,
        mainTime,
        cyclesQtdManager,
        completedCycles,
        numberOfPomodoros,
        setNumberOfPomodoros,
        handleRestTime,
        setCyclesQtdManager,
        handleWork,
        props.cycles,
    ]);

    return (
        <KeyboardAvoidingView scrollEnabled={false}>
            <InputWrapper>
                <InputValue
                    keyboardType="numeric"
                    placeholder="Trabalho (segundos)"
                    value={inputWork.toString()}
                    onChangeText={(text) => {
                        setInputWork(text);
                    }}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={true}
                    autoFocus={true}
                ></InputValue>
                <InputValue
                    keyboardType="numeric"
                    placeholder="Pausa (segundos)"
                    value={inputRest.toString()}
                    onChangeText={(text) => {
                        setInputRest(text);
                    }}
                    underlineColorAndroid={'transparent'}
                    autoCorrect={true}
                ></InputValue>
            </InputWrapper>

            <Counter>
                <CounterText>{timerCounter(mainTime)}</CounterText>
            </Counter>
            <Text
                style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 16,
                    textTransform: 'uppercase',
                }}
            >
                {working ? 'Trabalhando' : 'Descansando'}
            </Text>
            <TimerWrapper>
                <Button onPress={handleReset}>
                    <Image source={require('../../assets/reset.png')} />
                </Button>
                <Button onPress={handleStop}>
                    {timeCounting ? (
                        <Image source={require('../../assets/pause.png')} />
                    ) : (
                        <Image source={require('../../assets/play-button.png')} />
                    )}
                </Button>
                <Button onPress={handleWork}>
                    <Image source={require('../../assets/start.png')} />
                </Button>
            </TimerWrapper>

            <Dashboard>
                <DashboardText>Ciclos completados: {completedCycles}</DashboardText>
                <DashboardText>Pomodoros: {numberOfPomodoros}</DashboardText>
            </Dashboard>
        </KeyboardAvoidingView>
    );
}

const TimerWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: 20px auto;
`;

const InputValue = styled.TextInput`
  border: 2px solid #1c1f3d97;
  margin: 0px 20px;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
`;

const Counter = styled.View`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: #1c1f3d;
  margin-top: 20px;
  border-radius: 100px;
  border: 5px solid coral;
`;

const CounterText = styled.Text`
  font-size: 28px;
  color: #fff;
`;

const Dashboard = styled.View`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
  background-color: #1c1f3d;
  border-radius: 10px;
`;

const DashboardText = styled.Text`
  color: #fff;
  text-align: center;
`;

export default Timer;

Timer.propTypes = {
    timerCounter: PropTypes.func,
    mainTime: PropTypes.number,
    pomodoro: PropTypes.number,
    cycles: PropTypes.number,
    longTime: PropTypes.number,
    shortTime: PropTypes.number,
};
