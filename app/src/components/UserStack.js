import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import HomeScreen from '../screen/User/HomeScreen';
// import ServicesListScreen from '../screen/User/ServicesListScreen';
// import ServicesEditScreen from '../screen/User/ServicesEditScreen';
// import ServicesAddScreen from '../screen/User/ServicesAddScreen';
// import ServiceDetailsScreen from '../screen/User/ServiceDetailsScreen';
// import ViewImageScreen from '../screen/User/ViewImageScreen';
// import PackageDetailsScreen from '../screen/User/PackageDetailsScreen';
// import PackagesListScreen from '../screen/User/PackagesListScreen';
// import PackagesEditScreen from '../screen/User/PackagesEditScreen';
import PackagesAddScreen from '../screen/User/PackagesAddScreen';
import ProfileScreen from '../screen/User/ProfileScreen';
// import SpecialistScreen from '../screen/User/SpecialistScreen';
// import SpecialistDetailsScreen from '../screen/User/SpecialistDetailsScreen';
// import SpecialistEditScreen from '../screen/User/SpecialistEditScreen';
// import SpecialistAddScreen from '../screen/User/SpecialistAddScreen';
import AppointmentScreen from '../screen/User/AppointmentScreen';
import AppointmentDetailScreen from '../screen/User/AppoinmentDetailScreen';
// import GalleryScreen from '../screen/User/GalleryScreen';
import ExploreScreen from '../screen/User/ExploreScreen'
// import WelcomeScreen from '../screen/User/WelcomeScreen';
// import LoginScreen from '../screen/User/LoginScreen';
// import RegisterScreen from '../screen/BarberSide/RegisterScreen';
// import Chat from '../screen/chat/Chat';
import AddJobScreen from '../screen/User/Addjob';
import chatScreen from '../screen/chat/chatScreen';
import ConversationScreen from '../screen/chat/conversations';
import WelcomeScreen from '../screen/User/WelcomeScreen';
import UserSettings from '../screen/User/UserSettings';
import EditPasswordScreen from '../screen/User/EditPasswordScreen';
import ReviewScreen from './../screen/User/ReviewScreen';
import UserActiveJobs from '../screen/User/UserActiveJobs';
import UserCompletedJobs from '../screen/User/UserCompletedJobs';
import JobDetailScreen from '../screen/User/JobDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class UserStack extends Component {
	
   
	createChatStack = () => {
        return (
		<Stack.Navigator>
	
			<Stack.Screen
				name="Conversations"
				component={ConversationScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Chat Details"
				component={chatScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
		</Stack.Navigator>
		);

	}

	createAccountStack = () => {
        return (
		<Stack.Navigator>
	
			<Stack.Screen
				name="Account"
				component={UserSettings}
				// options={{
				// 	headerStyle: { backgroundColor: colors.red },
				// 	headerTintColor: 'white',
				// }}
			/>
			<Stack.Screen
				name="Edit Password"
				component={EditPasswordScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
		</Stack.Navigator>
		);

	}

	createAppointmentStack = () => {
        return (
		<Stack.Navigator>
			<Stack.Screen
				name="Appointment"
				component={AppointmentScreen}
				options={{
					// headerStyle: { backgroundColor: colors.red },
					// headerTintColor: 'white',
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Appointment Details"
				component={AppointmentDetailScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="UserActive"
				component={UserActiveJobs}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="UserComplete"
				component={UserCompletedJobs}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="JobDetails"
				component={JobDetailScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Review"
				component={ReviewScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Post Details"
				component={AddJobScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Chat Details"
				component={chatScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
		</Stack.Navigator>
		);
	}

	createHomeStack = () => {
        return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Post Details"
				component={AddJobScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
		</Stack.Navigator>
		);
	}
	
	render() {
		return (
			<Drawer.Navigator edgeWidth={200}
			drawerStyle={{

				backgroundColor: 'white',
				color:'white',
				activeTintColor: 'white',
                itemStyle: { marginVertical: 30 },
				
			  }}
			  drawerContentOptions={{
				activeTintColor: colors.red,
				itemStyle: { marginVertical: 10 },
				color:'white'
			  }}>

				<Drawer.Screen name="Home" children={this.createHomeStack}  />
				
				<Drawer.Screen name="Get Service" component={PackagesAddScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}/>
				<Drawer.Screen
					name="Services History"
					children={this.createAppointmentStack}
				/>
				<Drawer.Screen name="Conversations" children={this.createChatStack} 
				 />
				<Drawer.Screen name="Profile" component={ProfileScreen} />
				<Drawer.Screen name="Account Settings" children={this.createAccountStack} 
				 />
				<Drawer.Screen name="Reviews" component={ReviewScreen}
				 />
				<Drawer.Screen name="Logout" component={WelcomeScreen} />
			</Drawer.Navigator>
		);
	}
}
