import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView
} from 'react-native';
import {
	Dropdown,

  } from 'sharingan-rn-modal-dropdown';
// import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';
import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/user';

function RegisterScreen({ navigation: { navigate }, token, loading, signup }) {
	const data = [
		{
			value: 'Add City',
			label: 'Add City',
		  },
		{
		  value: 'Islamabad',
		  label: 'Islamabad',
		},
		{
		  value: 'Karachi',
		  label: 'Karachi',
		},
		{
		  value: 'Lahore',
		  label: 'Lahore',
		},
		{
		  value: 'Quetta',
		  label: 'Quetta',
		},
		{
			value: 'Multan',
			label: 'Multan',
		  },
	  ];
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [city, setCity] = useState('Add City');
	const [address, setAddress] = useState('');

	useEffect(() => {
		if (token) {
			navigate('MainApp');
		}
		return () => {};
	}, [token]);

	const register = () =>{
		const user = {
			name, email, phoneno:phone, password,city,street_address:address,city 
		}
		//console.log(user)
		signup(user)
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
					source={require('../../assets/images/icon.png')}
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
				<Text style={styles.text}>Enter Street Address</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Enter Address'}
					maxLength={20}
					onChangeText={(text) => setAddress(text)}
					value={address}
				/>
				<Text style={styles.text}>Select City</Text>
				<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select City'}
					data={data}
					enableSearch
					value={city}
					onChange={setCity}
				/>
				</View>
        
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() =>
							register()
							
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
		width: 300,
		height: 300,
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

export default connect(mapStateToProps, mapActionToProps)(RegisterScreen);
