import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import HomeScreen from '../screen/User/HomeScreen';
import PostServiceScreen from '../screen/User/PostServiceScreen';
import ProfileScreen from '../screen/User/ProfileScreen';
import ExploreScreen from '../screen/User/ExploreScreen'
import AddJobScreen from '../screen/User/Addjob';
import chatScreen from '../screen/chat/chatScreen';
import ConversationScreen from '../screen/chat/workerconversations';
import WelcomeScreen from '../screen/User/WelcomeScreen';
import UserSettings from '../screen/User/UserSettings';
import UpdatePasswordScreen from '../screen/User/UpdatePasswordScreen';
import ReviewScreen from './../screen/User/ReviewScreen';
import UserActiveJobs from '../screen/User/UserActiveJobs';
import UserCompletedJobs from '../screen/User/UserCompletedJobs';
import JobDetailScreen from '../screen/User/JobDetailScreen';
import LogoutScreen from '../screen/User/LogoutScreen';
import ContactusScreen from '../screen/User/ContactusScreen';
import FAQScreen from './../screen/User/FAQScreen';
import EditProfileScreen from './../screen/User/EditProfileScreen';
import ApplicationsScreen from './../screen/User/ApplicationsScreen';
import WorkerProfileScreen from './../screen/User/WorkerProfileScreen';
import UpdateJobDetailsScreen from './../screen/User/UpdateJobDetailsScreen';
import ConfirmationScreen from './../screen/User/ConfirmationScreen';
import SearchWorker from './../screen/User/SearchWorker';
import SearchResults from './../screen/User/SearchResults';
import JobsScreen from '../screen/User/JobsScreen';

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
				name="Settings"
				component={UserSettings}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Edit Profile"
				component={EditProfileScreen}
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
				component={UpdatePasswordScreen}
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
				component={JobsScreen}
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
				name="Applications"
				component={ApplicationsScreen}
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
				name="Confirmation"
				component={ConfirmationScreen}
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
				name="UpdateDetails"
				component={UpdateJobDetailsScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Results"
				component={SearchResults}
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

	createSearchStack = () => {
        return (
		<Stack.Navigator>
			<Stack.Screen
				name="Search"
				component={SearchWorker}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}
			/>
			<Stack.Screen
				name="Results"
				component={SearchResults}
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
				
				<Drawer.Screen name="Get Service" component={PostServiceScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}/>
				<Drawer.Screen name="Search Worker" children={this.createSearchStack}  />
				<Drawer.Screen
					name="Services History"
					children={this.createAppointmentStack}
				/>
				<Drawer.Screen name="Conversations" children={this.createChatStack} 
				 />
				<Drawer.Screen name="Profile" component={ProfileScreen} />
				<Drawer.Screen name="Account Settings" children={this.createAccountStack} 
				 />
				{/* <Drawer.Screen name="Reviews" component={ReviewScreen}
				 /> */}
				<Drawer.Screen name="Logout" component={LogoutScreen} />
			</Drawer.Navigator>
		);
	}
}
