import React, { useState,Component } from 'react';
import {
	View,
	TextInput,
	FlatList,
	Button,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

import LoadingIndicator from '../../components/LoadingIndicator';
import Card from '../../components/AppointmentCard';
import colors from '../../styles/colors';
import axios from '../../../config';
import { useEffect } from 'react';
import { Text, ActivityIndicator,Image,Dimensions } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import WorkerCompletedJobs from './WorkerCompletedJobs';
import WorkerActiveJobs from './WorkerActiveJobs';
const { width, height } = Dimensions.get('window');


function ActiveScreen(props) {
	return (
	    <WorkerActiveJobs />
	);
}

function CompletedScreen(props) {
	return (
		<WorkerCompletedJobs/>
	);
}

const Tab = createMaterialBottomTabNavigator();

export default function JobsScreen(props) {
	// const [appointments, setAppointments] = useState([]);
	// const [completed, setCompleted] = useState([]);
	// const [active, setActive] = useState([]);
	// const [loading, setLoading] = useState(true);

	// const isFocused = useIsFocused();

	// useEffect(() => {
	// 	if (isFocused) {
	// 		setLoading(true);
	// 		axios.get('/appointment/barber').then((res) => {
	// 			setAppointments(
	// 				res.data.map((SS) => ({
	// 					title: SS?.user?.firstName,
	// 					image: `data:${SS?.user?.image?.type};base64,${SS?.user?.image?.data}`,
	// 					status: SS?.status,
	// 					price: SS?.bill,
	// 					time: SS?.timing,
	// 					date: SS?.date?.split('T')[0],
	// 					id: SS?._id,
	// 					specialist: SS?.specialist,
	// 					services: SS?.services,
	// 					promo: SS?.promo,
	// 					bill: SS?.bill,
	// 					review: SS?.review,
	// 				})),
	// 			);
	// 			setLoading(false);
	// 		});
	// 	}
	// 	return () => {};
	// }, [isFocused]);

	// useEffect(() => {
	// 	setActive(appointments.filter((val) => val?.status));
	// 	setCompleted(appointments.filter((val) => !val?.status));

	// 	return () => {};
	// }, [appointments]);

	return (
		<Tab.Navigator
			initialRouteName="Active"
			activeColor={colors.white}
			inactiveColor={colors.lightRed}
			barStyle={{ backgroundColor: colors.red }}
		>
			<Tab.Screen
				name="Active"
				// component={ActiveAppointmentsScreen}
				options={{
					tabBarLabel: 'Active',
					tabBarIcon: ({ color }) => (
						<Icon name="history" color={color} size={20} />
					),
				}}
			>
				{(props) => (
					// <ActiveAppointmentsScreen
					// 	{...props}
					// 	appointment={active}
					// 	loading={loading}
					// />
					<WorkerActiveJobs
						{...props}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Completed"
				options={{
					tabBarLabel: 'Completed',
					tabBarIcon: ({ color }) => (
						<Icon name="check" color={color} size={20} />
					),
				}}
			>
				{(props) => (
					<WorkerCompletedJobs
						{...props}
					/>
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container:{
        flex:1
      },
      list:{
        paddingHorizontal: 17,
        marginTop:40
      },
      footer:{
        flexDirection: 'row',
        height:60,
        backgroundColor: '#eeeeee',
        paddingHorizontal:10,
        padding:5,
      },
      btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
      },
      iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
      },
      inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
      },
      itemIn: {
        alignSelf: 'flex-start'
      },
      itemOut: {
        alignSelf: 'flex-end'
      },
      time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color:"#808080",
      },
      item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#eeeeee",
        borderRadius:300,
        padding:5,
      },
    textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 2,
		elevation: 2,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	},

  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: colors.red,
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
	screen: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flatScreen: {
		flex: 1,
		paddingTop: 10,
	},
	row: {
		alignContent: 'center',
		justifyContent: 'space-between',
		textAlign: 'center',
		flexDirection: 'row',
		backgroundColor: colors.white,
		elevation: 5,
	},
	rowInput: {
		width: '100%',
	},
	textInput: {
		flexDirection: 'row',
		height: 40,
		borderRadius: 20,
		elevation: 5,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		margin: 15,
		borderWidth: 1,
		borderColor: colors.red,
		backgroundColor: colors.white,
	},
});
