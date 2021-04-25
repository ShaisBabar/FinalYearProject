import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	View,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import colors from '../../styles/colors';
import LoadingIndicator from '../../components/LoadingIndicator';

import { connect } from 'react-redux';
import { login } from '../../redux/actions/user';

function ChoiceScreen({ navigation: { navigate }, token, loading, login }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// useEffect(() => {
	// 	if (token) {
	// 		navigate('MainApp');
	// 	}
	// 	return () => {};
	// }, [token]);

	return (
		<View style={styles.container}>
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
            <View>
				<Text style={styles.heading}>SELECT ACCOUNT TYPE</Text>
			</View>
                <LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() => navigate('Login')}
					>
						<Text style={styles.textBtn}>I'm a User</Text>
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
					onPress={() => navigate('WorkerLogin')}
				>
					<Text style={styles.textBtnSignUp}>I'm a Worker</Text>
				</TouchableOpacity>

			</Animatable.View>
		</View>
	);
}

const styles = StyleSheet.create({
    heading:{
        color:colors.red,
        fontSize:35,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:90
     },
	button: {
		// backgroundColor: colors.red,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
        height:60,
		marginVertical: 10,
		marginHorizontal: 10,
        marginBottom:30
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
		flex: 3,
		backgroundColor: colors.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
});

const mapStateToProps = ({ user: { token, loading } }) => ({ token, loading });

const mapActionToProps = { login };

export default connect(mapStateToProps, mapActionToProps)(ChoiceScreen);
