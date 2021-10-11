import React from 'react';

import Header from './src/components/Header';

import styled from 'styled-components/native';
import Timer from './src/components/Timer';
import { StatusBar, Text } from 'react-native';


export default function App() {
    return (
        <Container>
            <StatusBar />
            <Header color="#000">
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Pomodoro App</Text>
            </Header>
            <Timer pomodoro={1500} shortTime={300} longTime={900} cycles={3} />

        </Container>

    );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 40px 0;

`;

