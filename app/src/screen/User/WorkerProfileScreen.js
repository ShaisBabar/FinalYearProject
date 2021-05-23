import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Alert,
	ToastAndroid,
} from 'react-native';
import axios  from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Animatable from 'react-native-animatable';
import GradientHeader from 'react-native-gradient-header';
import ReviewCard from '../../components/ReviewCard';
import colors from '../../styles/colors';
import profileImg from '../../utils/profileImg';
import LoadingIndicator from '../../components/LoadingIndicator';
import { set } from 'react-native-reanimated';
import CheckboxList from './../../components/checkbox/checkList';

const Tab = createMaterialTopTabNavigator();
const service_data = [
	{ id: "60534d726bd01c37c46e47dc", name: 'Plumbing' },
	{ id: "60578a34816e0b1cbc5a57e7", name: 'Gardening' },
	{ id: "608dbf89e00c57b3549bd875", name: 'Cooking' },
	{ id: "608dbfe4e00c57b3549bd876", name: 'Laundary Work' },
	{ id: "608dc018e00c57b3549bd877", name: 'Carpenting' },
	{ id: "608dc03ae00c57b3549bd878", name: 'Electrician' },
   
  ];

var sd = [];

function ProfileScreen() 
{
	const user = global.user;
	console.log(global.user)
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phoneno);
	const [address, setAddress] = useState(user?.street_address);
	const [city, setCity] = useState(user?.city);
	const [area, setArea] = useState(user?.area);
	const theme = 'red';
	const border = 'grey';
	return (
		<View style={styles.screen}>
			<View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					 				<GradientHeader
						title={`Your Profile`}
						subtitle="This is your public profile which users can view."
						gradientColors={[colors.red, colors.red]}
						imageSource={{
							uri: '../../assets/images/user.png'
						}}
					/>
				</Animatable.View>
			</View>
			<View style={styles.flatContainer}>
			<ScrollView style={styles.container}>
 						<Text style={styles.text}>Full Name</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							maxLength={50}
							onChangeText={(text) => setName(text)}
							value={name}
							editable={false}
						/>
						<Text style={styles.text}>Email</Text>
						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							keyboardType="email-address"
							placeholder={'Enter Email'}
							maxLength={50}
							onChangeText={(text) => setEmail(text)}
							value={email}
							editable={false}
						/>
						{user.show_phone==true && 
						<>
						<Text style={styles.text}>Phone no.</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Phone no.'}
							keyboardType={'phone-pad'}
							maxLength={13}
							minLength={11}
							onChangeText={(text) => setPhone(text)}
							value={phone}
							editable={false}
						/>
						</>

						}
						
						<Text style={styles.text}>City</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							maxLength={50}
							onChangeText={(text) => setCity(text)}
							value={city}
							editable={false}
						/>
						<Text style={styles.text}>Area</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							maxLength={50}
							onChangeText={(text) => setArea(text)}
							value={area}
							editable={false}
						/>
						{user.show_address==true &&
                           <>
						   <Text style={styles.text}>Street Address</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Address'}
							maxLength={20}
							onChangeText={(text) => setAddress(text)}
							value={address}
							editable={false}
						/>	
						   </>
						}

<Text style={styles.text}>Select Services</Text>
				<CheckboxList
				headerName="Select All"
				theme={theme}
				listItems={service_data}
				onChange={({ ids, items }) => {
					//settingServices(ids)
					console.log(ids);
					sd = ids;
				 }}
				onLoading={() => (
					<View
					style={{
						flex: 1,
						marginTop:20,
						justifyContent: 'center',
						alignItems: 'center'
					}}
               >
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 16, color: '#555555' }}>
                Loading....
              </Text>
            </View>
          )}
          //selectedListItems={service_data.slice(0, 4)}
          checkboxProp={Platform.select({
            // Optional
            ios: {
              // iOS (supported from v0.3.0)
              boxType: 'square',
              tintColor: border,
              onTintColor: theme,
              onCheckColor: '#fff',
              onFillColor: theme
            },
            android: {
              tintColors: { true: theme, false: border }
            }
          })}
          // listItemStyle={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}
          
        />
						
						<View style={styles.bottom}></View>
		</ScrollView>
		</View>
		</View>
	);
}

function barberReviews() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		console.log("hhhhh")
		//fetch('http://192.168.1.100:5000/review/getreviewsbyworker/'+global.user._id)
		fetch('http://192.168.1.100:5000/review/getreviewsbyworker/'+"609d8335729e7532fcb00ddc")
      .then((response) => response.json())
      .then((json) => {
		//console.log("jjj",json)
        if (json.success==true) {
          setReviews(json.result)
        }
        else{
          Alert.alert(
            "Error Loading Reviews",
            "Try again.",
            [
              {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
            );
        }
      })
      .catch((error) => Alert.alert(
        "Error occured. "+error,
        "Try again later.",
        [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
        )
        );
		return () => {};
	}, []);
	return (
		<View style={styles.screen}>
			<FlatList
				contentContainerStyle={{ paddingBottom: 15 }}
				style={styles.flatScreen}
				data={reviews}
				keyExtractor={(review) => review._id.toString()}
				renderItem={({ item }) => (
					<ReviewCard
						title={item.review_text}
						time={item.user_id.name}
						image={item.sentiment==1?'like.png':'unlike.png'}
						text={item.sentiment}
						rated={item.rating}
					/>
				)}
			/>
		</View>
	);
}

function WorkerProfileScreen({ user, updateUser, loading }) {
	useEffect(() => {
		if (!user) {
			user = global.user
		}
		return () => {};
	}, []);
	return (
		<Tab.Navigator
			initialRouteName="Profile"
			tabBarOptions={{
				labelStyle: { fontSize: 14 },
				indicatorStyle: { backgroundColor: colors.white },
				activeTintColor: colors.white,
				inActiveTintColor: colors.lightRed,
				style: { backgroundColor: colors.red },
			}}
		>
			<Tab.Screen
				name="Profile"
				options={{
					tabBarLabel: 'Profile',
				}}
			>
				{(props) => (
					<ProfileScreen
						//{...props}
						// user={user}
						// updateUser={updateUser}
						// loading={loading}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Reviews"
				component={barberReviews}
				options={{
					tabBarLabel: 'Reviews',
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flatScreen: {
		flex: 1,
		paddingTop: 10,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	button: {
		backgroundColor: colors.red,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 20,
		marginHorizontal: 90,
	},
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.white,
	},
	imageContainer: {
		alignItems: 'center',
		marginHorizontal: 100,
	},
	profileImage: {
		height: 160,
		width: 160,
		borderRadius: 80,
		borderColor: colors.red,
		borderWidth: 3,
		marginVertical: 40,
	},
	CoverImage: {
		position: 'absolute',
		right: 0,
		top: 0,
		height: 250,
		width: '100%',
		borderBottomRightRadius: 50,
	},
	profileData: {
		paddingHorizontal: 15,
	},
	row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	rowInput: {
		width: 180,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,
	},
	timeRow: {
		flexDirection: 'row',
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 15,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,

		justifyContent: 'space-between',
	},
	getLocation: {
		fontSize: 14,
		color: colors.white,
		backgroundColor: colors.red,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	mapContainer: {
		// ...StyleSheet.absoluteFillObject,
		height: 400,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
		margin: 10,
		borderRadius: 10,
	},
	weekPicker: {
		paddingVertical: 30,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	day: {
		margin: 5,
		elevation: 5,
		backgroundColor: colors.light,
	},









	bottom:{
		marginBottom:40
	 },
	 heading:{
		color:colors.red,
		fontSize:40,
		fontWeight:'bold',
		textAlign:'center',
		marginTop:15
	 },
	 screen: {
		 flex: 1,
		 backgroundColor: colors.white,
	 },
	 headerScreen: {
		 flex: 1,
	 },
	 flatContainer: {
		 flex: 3,
		 zIndex: -1,
		 paddingHorizontal: 20,
	 },
	 flatScreen: {
		 flex: 1,
		 paddingTop: 10,
	 },
	 textBtn: {
		 color: colors.white,
		 fontSize: 18,
		 textTransform: 'uppercase',
	 },
	 button: {
		 backgroundColor: colors.red,
		 borderRadius: 25,
		 justifyContent: 'center',
		 alignItems: 'center',
		 padding: 10,
		 elevation: 5,
		 marginBottom: 10,
		 marginHorizontal: 90,
	 },
	 overlay: {
		 opacity: 1,
		 backgroundColor: '#000000'
	   },
	   img: {
		 width:60,
		 height: 60,
		 marginTop:10,
		 //justifyContent: 'center',
		 //alignContent: 'center',
		 position: 'absolute'
	   },
	   midstyling:{
		 top: 20,
	   },
	   firsttwo: {
		 flexDirection: 'row',
		// marginTop:10
	   },
	   container: {
		 flex: 1,
		 alignItems: 'center',
		 justifyContent: 'center',
		 //marginTop: 160
	   },
	   loginBtn:{
		 width:"40%",
		 backgroundColor: colors.red,
		 borderRadius:30,
		 height:100,
		 flexDirection: 'row',
		 alignItems:"center",
		 justifyContent:"center",
		 color:"white",
		 fontSize:50,
		 marginLeft: 20,
		 marginRight:2,
		 marginBottom:20
	   },
	   loginText:{
		 color:"white",
		 fontSize:15,
		 marginTop:70,
		 marginBottom:10,
		 borderRadius:100
		 
	   },
	   avatar: {
		 width:60,
		 height:60,
		 borderRadius: 63,
		 borderWidth: 4,
		 borderColor: "white",
		 marginBottom:10,
		 alignSelf:'center',
		 marginBottom:-100,
		marginTop:-390,
		 marginLeft: 320
	   },
	   centeredView: {
		 flex: 1,
		 justifyContent: "center",
		 alignItems: "center",
		 marginTop: 22
	   },
	   modalView: {
		 margin: 20,
		 backgroundColor: "white",
		 borderRadius: 20,
		 padding: 35,
		 alignItems: "center",
		 shadowColor: "#000",
		 shadowOffset: {
		   width: 0,
		   height: 2
		 },
		 shadowOpacity: 0.25,
		 shadowRadius: 3.84,
		 elevation: 5
	   },
	   openButton: {
		 backgroundColor: "#F194FF",
		 borderRadius: 20,
		 padding: 10,
		 elevation: 2
	   },
	   textStyle: {
		 color: "white",
		 fontWeight: "bold",
		 textAlign: "center"
	   },
	   modalText: {
		 marginBottom: 15,
		 textAlign: "center"
	   },
		   screen: {
		 flex: 1,
		 backgroundColor: colors.white,
	 },
	 flatScreen: {
		 flex: 1,
		 paddingTop: 10,
	 },
	 textBtn: {
		 color: colors.white,
		 fontSize: 18,
		 textTransform: 'uppercase',
	 },
	 button: {
		 backgroundColor: colors.red,
		 borderRadius: 25,
		 justifyContent: 'center',
		 alignItems: 'center',
		 padding: 10,
		 elevation: 5,
		 marginVertical: 20,
		 marginHorizontal: 90,
	 },
	 container: {
		 flex: 1,
		 alignContent: 'center',
		 backgroundColor: colors.white,
	 },
	 imageContainer: {
		 alignItems: 'center',
		 marginHorizontal: 100,
	 },
	 profileImage: {
		 height: 160,
		 width: 160,
		 borderRadius: 80,
		 borderColor: colors.red,
		 borderWidth: 3,
		 marginVertical: 40,
	 },
	 CoverImage: {
		 position: 'absolute',
		 right: 0,
		 top: 0,
		 height: 250,
		 width: '100%',
		 borderBottomRightRadius: 50,
	 },
	 profileData: {
		 paddingHorizontal: 15,
	 },
	 row: {
		 flexDirection: 'row',
		 alignContent: 'center',
		 justifyContent: 'space-between',
	 },
	 rowInput: {
		 width: 180,
	 },
	 text: {
		 color: colors.black,
		 fontSize: 14,
		 paddingHorizontal: 20,
		 marginBottom:10,
		 marginTop:15
	 },
	 textInput: {
		 height: 40,
		 fontSize: 14,
		 borderRadius: 25,
		 elevation: 5,
		 backgroundColor: colors.light,
		 paddingHorizontal: 20,
		 paddingVertical: 5,
		 marginHorizontal: 10,
		 marginTop: 5,
		 marginBottom: 15,
	 },
	 timeRow: {
		 flexDirection: 'row',
		 height: 40,
		 fontSize: 14,
		 borderRadius: 25,
		 elevation: 5,
		 backgroundColor: colors.light,
		 paddingHorizontal: 15,
		 marginHorizontal: 10,
		 marginTop: 5,
		 marginBottom: 15,
 
		 justifyContent: 'space-between',
	 },
	 getLocation: {
		 fontSize: 14,
		 color: colors.white,
		 backgroundColor: colors.red,
		 justifyContent: 'center',
		 alignItems: 'center',
		 textAlign: 'center',
	 },
	 mapContainer: {
		 // ...StyleSheet.absoluteFillObject,
		 height: 400,
		 width: '100%',
		 justifyContent: 'center',
		 alignItems: 'center',
	 },
	 map: {
		 ...StyleSheet.absoluteFillObject,
		 margin: 10,
		 borderRadius: 10,
	 },
	 weekPicker: {
		 paddingVertical: 30,
		 paddingHorizontal: 10,
		 justifyContent: 'space-between',
	 },
	 day: {
		 margin: 5,
		 elevation: 5,
		 backgroundColor: colors.light,
	 },
});

export default WorkerProfileScreen;
