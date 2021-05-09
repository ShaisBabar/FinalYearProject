import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
import BarberAuth from './src/components/AuthStack';
import { StatusBar } from 'react-native';
import colors from './src/styles/colors';

function App({ user }) {
	LogBox.ignoreAllLogs()
	return (
		<>
			<StatusBar backgroundColor={colors.red} />
			<BarberAuth />
		</>
	);
}

export default App;
