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
import {service_data} from './../../assets/strings';

function ChoiceScreen({ navigation: { navigate }}) {
    
	useEffect(() => {
		// console.log("jjj",global.user)
		// if (global.user!=null && global.user != undefined) {
		// 	navigate('MainApp',{user:global.user});
		// }

		fetch('http://192.168.1.100:5000/category/categories')
		.then((response) => response.json())
		.then((json) => {
				var arr = [];
				for(var i=0;i<json.result.length; i++){
					arr.push({
						value:json.result[i]._id,
						label:json.result[i].name,
						image:json.result[i].image
					});
				}
				global.cateogries = arr;
				console.log(global.cateogries)
			}).catch((error) => global.cateogries=service_data);
		return () => {};
	}, []);
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

export default ChoiceScreen;
