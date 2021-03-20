import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screen/User/WelcomeScreen';
import LoginScreen from '../screen/User/LoginScreen';
import RegisterScreen from '../screen/User/RegisterScreen';
import ForgetScreen from '../screen/User/ForgetScreen';
import MainApp from './UserStack';

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
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
