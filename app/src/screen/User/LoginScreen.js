import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
	Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import colors from '../../styles/colors';
import LoadingIndicator from '../../components/LoadingIndicator';

function LoginScreen({ navigation: { navigate }}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login_user = (email,password) =>{
			const user = {
				email,password
			}
			console.log(user)
			fetch('http://192.168.8.100:5000/users/loginuser', {
				method: 'POST',
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
					global.user = json.user
					//AsyncStorage.setItem('@Token', json.token);
					Alert.alert(
						"Logged in successfully",
						"Logging in.",
						[
						  {
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel"
						  },
						  { text: "OK", onPress: () => console.log("OK Pressed") }
						]
					  );
					navigate('MainApp',{user:json.user});
				}
				else{
					Alert.alert(
						json.error,
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
					  navigate('Login');
				}
			})
			.catch((error) => Alert.alert(
				"Error occured.",
				"Try again later.",
				[
				  {
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				  },
				  { text: "OK", onPress: () => console.log("OK Pressed") }
				]
			  ));
			return;
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
					source={require('../../assets/images/user.png')}
				/>
			</LinearGradient>
			<Animatable.View animation="slideInUp" style={styles.footer}>
				<Text style={styles.text}>Email</Text>
				<TextInput
					autoCapitalize="none"
					keyboardType="email-address"
					style={styles.textInput}
					placeholder={'Enter Email'}
					maxLength={50}
					onChangeText={(text) => setEmail(text)}
					value={email}
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
				{/* <TouchableOpacity onPress={() => navigate('Forget')}>
					<Text style={styles.textforget}>Forget Password?</Text>
				</TouchableOpacity> */}
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() => login_user(email, password)}
					>
						<Text style={styles.textBtn}>Sign In</Text>
					</TouchableOpacity>
				</LinearGradient>
				<TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={() => navigate('Register')}
				>
					<Text style={styles.textBtnSignUp}>Sign Up</Text>
				</TouchableOpacity>
			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		// backgroundColor: colors.red,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 10,
		marginHorizontal: 10,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.red,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textHeading: {
		color: colors.red,
		fontSize: 25,
		fontWeight: 'bold',
		paddingHorizontal: 10,
		paddingBottom: 20,
	},
	textforget: {
		color: colors.red,
		fontSize: 14,
		fontWeight: 'bold',
		paddingHorizontal: 20,
		paddingBottom: 15,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	textBtnSignUp: {
		color: colors.red,
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
		width: 250,
		height: 200,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingVertical: 30,
	},
	footer: {
		flex: 3,
		backgroundColor: colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
});

export default LoginScreen;
