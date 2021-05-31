import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GradientHeader from 'react-native-gradient-header';
import LinearGradient from 'react-native-linear-gradient';
import {
	Dropdown,

  } from 'sharingan-rn-modal-dropdown';
import colors from '../../styles/colors';
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from './../../assets/strings'

function EditProfileScreen({navigation: { goBack, navigate }}) 
{
	const user = global.user;
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phoneno);
	const [address, setAddress] = useState(user?.street_address);
	const [city, setCity] = useState(user?.city);
	const [area, setArea] = useState('Add Area');
	const [area_city, setAreaCity] = useState([ {
        value: 'Add Area',
        label: 'Add Area',
      },]);
	const data = citydata;

	const setAreaforCityFunc = (city) =>{
		setCity(city);
		if(city=='Islamabad'){
			setAreaCity(isl_data);
		}
		else if(city=='Karachi'){
			setAreaCity(karachi_data);
		}
		else if(city=='Lahore'){
			setAreaCity(lahore_data);
		}
		else if(city=='Karachi'){
			setAreaCity(karachi_data);
		}
		else if(city=='Multan'){
			setAreaCity(multan_data);
		}
		else if(city=='Quetta'){
			setAreaCity(quetta_data);
		}
		setArea('Add Area')
		
	}

	const update = () =>{
		console.log(global.user)
		const user = {
			name, email, phoneno:phone,city,street_address:address,city,area,password:global.user.password,_id:global.user._id
		}
		console.log(user)
		fetch('http://192.168.8.100:5000/users/edituser', {
			method: 'PUT',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			if (json.success==true) {
				global.user = user
				//AsyncStorage.setItem('@Token', json.token);
				Alert.alert(
					"Updated User",
					"",
					[
					  {
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel"
					  },
					  { text: "OK", onPress: () => console.log("OK Pressed") }
					]
				  );
				navigate('Profile');
			}
			else{
				Alert.alert(
					"Could not perform Update",
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
				  navigate('Profile');
			}
		})
		.catch((error) => Alert.alert(
			"Error occured",
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
		return;
	}
	
	return (
		<View style={styles.screen}>
			<View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					 				<GradientHeader
						title={`Your Profile`}
						subtitle="This is your public profile which workers can view."
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
						/>
						<Text style={styles.text}>Phone no.</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Phone no.'}
							keyboardType={'phone-pad'}
							maxLength={13}
							minLength={11}
							onChangeText={(text) => setPhone(text)}
							value={phone}
						/>
						<Text style={styles.text}>City</Text>
						<View style={styles.citycontainer}>
						<Dropdown
							placeholder={'Select City'}
							data={data}
							enableSearch
							value={city}
							onChange={setAreaforCityFunc}
						/>
						</View>
						<Text style={styles.text}>Area</Text>
						<View style={styles.citycontainer}>
						<Dropdown
							placeholder={'Select Area'}
							data={area_city}
							enableSearch
							value={area}
							onChange={setArea}
						/>
						</View>
						<Text style={styles.text}>Street Address</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Address'}
							maxLength={20}
							onChangeText={(text) => setAddress(text)}
							value={address}
						/>
						<LinearGradient
							colors={[colors.orange, colors.red]}
							style={styles.button}
						>
							<TouchableOpacity
								style={{ width: '100%', alignItems: 'center' }}
								onPress={update}
							>
								<Text style={styles.textBtn}>Save</Text>
							</TouchableOpacity>
						</LinearGradient>		
		</ScrollView>
		</View>
		</View>
	);
}

const styles = StyleSheet.create({
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

const mapStateToProps = ({
	user: { token },
	mainRecords: { user, records, loading },
}) => ({
	token,
	user,
	records,
	loading,
});


export default EditProfileScreen;
