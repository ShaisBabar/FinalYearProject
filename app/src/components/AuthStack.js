import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screen/User/WelcomeScreen';
import LoginScreen from '../screen/User/LoginScreen';
import RegisterScreen from '../screen/User/RegisterScreen';
import ForgetScreen from '../screen/User/ForgetScreen';
import MainApp from './UserStack';
import WorkerApp from './WorkerStack';
import AddJobScreen from '../screen/User/Addjob';
import ChoiceScreen from '../screen/User/ChoiceScreen';
import WorkerLoginScreen from '../screen/User/WorkerLoginScreen';
import WorkerRegisterScreen from '../screen/User/WorkerRegisterScreen';

const Stack = createStackNavigator();

export default class AuthStack extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Welcome"
						component={WelcomeScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="WorkerLogin"
						component={WorkerLoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="WorkerRegister"
						component={WorkerRegisterScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Forget"
						component={ForgetScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="MainApp"
						component={MainApp}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="WorkerApp"
						component={WorkerApp}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Choice"
						component={ChoiceScreen}
						options={{
							headerShown: false,
						}}
					/>
					
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
