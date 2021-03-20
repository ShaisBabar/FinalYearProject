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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class UserStack extends Component {
	// createServiceStack = () => (
	// 	<Stack.Navigator>
	// 		<Stack.Screen
	// 			name="Services List"
	// 			component={ServicesListScreen}
	// 			options={{
	// 				// headerStyle: { backgroundColor: colors.red },
	// 				// headerTintColor: 'white',
	// 				headerShown: false,
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Service Details"
	// 			component={ServiceDetailsScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Add Service"
	// 			component={ServicesAddScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Update Service"
	// 			component={ServicesEditScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Image View"
	// 			component={ViewImageScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: 'black' },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 	</Stack.Navigator>
	// );

	// createPackageStack = () => (
	// 	<Stack.Navigator>
	// 		<Stack.Screen
	// 			name="Packages List"
	// 			component={PackagesListScreen}
	// 			options={{
	// 				// headerStyle: { backgroundColor: colors.red },
	// 				// headerTintColor: 'white',
	// 				headerShown: false,
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Package Details"
	// 			component={PackageDetailsScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Update Package"
	// 			component={PackagesEditScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Add Package"
	// 			component={PackagesAddScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 	</Stack.Navigator>
	// );

	// createSpecialistStack = () => (
	// 	<Stack.Navigator>
	// 		<Stack.Screen
	// 			name="Specialists"
	// 			component={SpecialistScreen}
	// 			options={{
	// 				// headerStyle: { backgroundColor: colors.red },
	// 				// headerTintColor: 'white',
	// 				headerShown: false,
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Specialist Details"
	// 			component={SpecialistDetailsScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Update Specialist"
	// 			component={SpecialistEditScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 		<Stack.Screen
	// 			name="Add Specialist"
	// 			component={SpecialistAddScreen}
	// 			options={{
	// 				headerStyle: { backgroundColor: colors.red },
	// 				headerTintColor: 'white',
	// 			}}
	// 		/>
	// 	</Stack.Navigator>
	// );

	createAppointmentStack = () => (
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
		</Stack.Navigator>
	);

	// createChatStack = () => (
	//   <Stack.Navigator>
	//     <Stack.Screen
	//       name="Chat"
	//       component={Chat}
	//       options={{
	//         headerStyle: {backgroundColor: colors.red},
	//         headerTintColor: 'white',
	//       }}
	//     />
	//   </Stack.Navigator>
	// );

	render() {
		return (
			<Drawer.Navigator edgeWidth={200}>
				<Drawer.Screen name="Home" component={HomeScreen} />
				<Drawer.Screen name="Explore" component={ExploreScreen} />
				<Drawer.Screen name="Profile" component={ProfileScreen} />
				<Drawer.Screen name="Post Job" component={PackagesAddScreen}
				options={{
					headerStyle: { backgroundColor: colors.red },
					headerTintColor: 'white',
				}}/>
				<Drawer.Screen name="Chat" component={PackagesAddScreen} />
				{/* <Drawer.Screen
					name="My Jobs"
					children={this.createSpecialistStack}
				/> */}
				<Drawer.Screen
					name="My Jobs"
					children={this.createAppointmentStack}
				/>
				{/* <Drawer.Screen name="Chat" children={this.createChatStack} /> */}
				{/* <Drawer.Screen name="Logout" component={AuthStack} /> */}
			</Drawer.Navigator>
		);
	}
}
