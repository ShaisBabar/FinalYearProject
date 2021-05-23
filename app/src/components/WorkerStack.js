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
import PostServiceScreen from '../screen/User/PostServiceScreen';
import ProfileScreen from '../screen/User/ProfileScreen';
// import SpecialistScreen from '../screen/User/SpecialistScreen';
// import SpecialistDetailsScreen from '../screen/User/SpecialistDetailsScreen';
// import SpecialistEditScreen from '../screen/User/SpecialistEditScreen';
// import SpecialistAddScreen from '../screen/User/SpecialistAddScreen';
// import AppointmentScreen from '../screen/User/AppointmentScreen';
// import AppointmentDetailScreen from '../screen/User/AppoinmentDetailScreen';
// import GalleryScreen from '../screen/User/GalleryScreen';
import ExploreScreen from '../screen/User/ExploreScreen'
// import WelcomeScreen from '../screen/User/WelcomeScreen';
// import LoginScreen from '../screen/User/LoginScreen';
// import RegisterScreen from '../screen/BarberSide/RegisterScreen';
// import Chat from '../screen/chat/Chat';
import AddJobScreen from '../screen/User/Addjob';
import chatScreen from '../screen/chat/chatScreen';
import ConversationScreen from '../screen/chat/workerconversations';
import WelcomeScreen from '../screen/User/WelcomeScreen';
import UserSettings from '../screen/User/UserSettings';
import UpdatePasswordScreen from '../screen/User/UpdatePasswordScreen';
import ReviewScreen from './../screen/User/ReviewScreen';
import JobDetailScreenW from './../screen/User/JobDetailScreenW';
import WorkerProfileScreen from './../screen/User/WorkerProfileScreen';
import WorkerActiveJobs from './../screen/User/WorkerActiveJobs';
import WorkerCompletedJobs from './../screen/User/WorkerCompletedJobs';
import WorkerEditProfileScreen from './../screen/User/WorkerEditProfileScreen';
import ContactusScreen from '../screen/User/ContactusScreen';
import FAQScreen from './../screen/User/FAQScreen';
import WorkerUpdatePasswordScreen from './../screen/User/WorkerUpdatePasswordScreen';
import WorkerSettingsScreen from './../screen/User/WokrerSettings';
import WorkerJobsScreen from './../screen/User/WorkerJobsScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class WorkerStack extends Component {
	
   
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
				name="Settings"
				component={WorkerSettingsScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Edit Profile"
				component={WorkerEditProfileScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Contact"
				component={ContactusScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="FAQ"
				component={FAQScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="UpdatePassword"
				component={WorkerUpdatePasswordScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
		</Stack.Navigator>
		);

	}

	createExploreStack = () => {
        return (
		<Stack.Navigator>
			<Stack.Screen
				name="Explore Jobs"
				component={ExploreScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="JobDetails"
				component={JobDetailScreenW}
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
				name="Jobs"
				component={WorkerJobsScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="UserActive"
				component={WorkerActiveJobs}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="UserComplete"
				component={WorkerCompletedJobs}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Home"
				component={ExploreScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="WorkerProfile"
				component={WorkerProfileScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="JobDetails"
				component={JobDetailScreenW}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			{/* <Stack.Screen
				name="UpdateDetails"
				component={UpdateJobDetailsScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/> */}
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

				<Drawer.Screen name="Home" children={this.createExploreStack} />
				<Drawer.Screen
					name="Services History"
					children={this.createAppointmentStack}
				/>
				<Drawer.Screen name="Conversations" children={this.createChatStack} 
				 />
				<Drawer.Screen name="Profile/Reviews" component={WorkerProfileScreen} />
				<Drawer.Screen name="Account Settings" children={this.createAccountStack} 
				 />
				<Drawer.Screen name="Logout" component={WelcomeScreen} />
			</Drawer.Navigator>
		);
	}
}
