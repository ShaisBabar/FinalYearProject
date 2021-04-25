import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
	ActivityIndicator,
    SafeAreaView,
    Platform,
	Alert
} from 'react-native';
import {
	Dropdown,
  } from 'sharingan-rn-modal-dropdown';
  import CheckboxList from './../../components/checkbox/checkList';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
// import DropDownPicker from 'react-native-dropdown-picker';
// import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/user';
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from './../../assets/strings'


const service_data = [
	{ id: 1, name: 'Plumbing' },
	{ id: 2, name: 'Gardening' },
	{ id: 3, name: 'Cooking' },
	{ id: 4, name: 'Laundary Work' },
	{ id: 5, name: 'Carpenting' },
	{ id: 6, name: 'Electrician' },
   
  ];

  
function WorkerRegisterScreen({ navigation: { navigate }, token, loading, signup }) {
	const data = citydata;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [city, setCity] = useState('Add City');
	const [area, setArea] = useState('Add Area');
	const [address, setAddress] = useState('');
	const [area_city, setAreaCity] = useState([ {
        value: 'Add Area',
        label: 'Add Area',
      },]);
	const theme = 'red';
	const border = 'grey';
	// useEffect(() => {
	// 	if (token) {
	// 		navigate('MainApp');
	// 	}
	// 	return () => {};
	// }, [token]);

	const register = () =>{
		const user = {
			name, email, phoneno:phone, password,city,street_address:address,city 
		}
		//console.log(user)
		signup(user)
		Alert.alert(
			"User Registered",
			"Logging in..",
		  );
		if (token) {
			navigate('WorkerApp');
		}
		else{
			Alert.alert(
				"Invalid Login",
				"Username or password is incorrect",
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
	}


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
	return (
		<View style={styles.container}>
			{/* {loading && <LoadingIndicator />} */}
			<LinearGradient
				colors={[colors.red, colors.red]}
				style={styles.header}
			>
				<Image
					style={styles.logo}
					source={require('../../assets/images/worker.png')}
				/>
			</LinearGradient>
			<Animatable.View animation="slideInUp" style={styles.footer}>
				<ScrollView>
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
				<Text style={styles.text}>Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Enter Password'}
					maxLength={20}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry={true}
					value={password}
				/>
				<Text style={styles.text}>Confirm-Password</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Confirm Password'}
					maxLength={20}
					onChangeText={(text) => setConPassword(text)}
					secureTextEntry={true}
					value={conPassword}
				/>
				<Text style={styles.text}>Select City</Text>
				<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select City'}
					data={data}
					enableSearch
					value={city}
					onChange={setAreaforCityFunc}
				/>
				</View>
				<Text style={styles.text}>Select Area</Text>
				<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select Area'}
					data={area_city}
					enableSearch
					value={area}
					onChange={setArea}
				/>
				</View>
				<Text style={styles.text}>Enter Street Address</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Enter Address'}
					maxLength={20}
					onChangeText={(text) => setAddress(text)}
					value={address}
				/>
				<Text style={styles.text}>Select Services</Text>
				<CheckboxList
          headerName="Select All"
          theme={theme}
          listItems={service_data}
          onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
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
				
        
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() =>
							register()
							// navigate('Services')
						}
					>
						<Text style={styles.textBtn}>Register</Text>
					</TouchableOpacity>
				</LinearGradient>
				</ScrollView>
			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.red,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 20,
		marginHorizontal: 40,
	},
	citycontainer: {
		height: 70,
		fontSize: 14,
		borderRadius: 2,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	  },
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.red,
	},
	row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',

		// marginVertical: 40,
		// marginHorizontal: 20,
	},
	rowInput: {
		width: 170,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
		marginBottom:10
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 2,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	},
	logo: {
		// tintColor: colors.red,
		width: 200,
		height: 220,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 30,
	},
	footer: {
		flex: 4,
		backgroundColor: colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
});

const mapStateToProps = ({ user: { token, loading } }) => ({ token, loading });

const mapActionToProps = { signup };

export default connect(mapStateToProps, mapActionToProps)(WorkerRegisterScreen);