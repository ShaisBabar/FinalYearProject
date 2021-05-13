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

function ConfirmationScreen({ navigation: { navigate }}) {
	const [price, setPrice] = useState('');
	const [visible, setVisible] = useState(false);

	const confirmpayment = () =>{
        Alert.alert(
			"Payment Confirmed!",
			"Job Completed!",
			[
			  {
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			  },
			  { text: "OK", onPress: () => console.log("OK Pressed") }
			]
        );
		setVisible(true)
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
					source={require('../../assets/images/12.png')}
				/>
			</LinearGradient>
			<Animatable.View animation="slideInUp" style={styles.footer}>
				<Text style={styles.text}>Amount Paid</Text>
				<TextInput
					keyboardType="phone-pad"
					style={styles.textInput}
					placeholder={'Enter Amount paid to worker'}
					onChangeText={(text) => setPrice(text)}
					value={price}
				/>
                <LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						style={{ width: '100%', alignItems: 'center' }}
						onPress={() => confirmpayment()}
					>
						<Text style={styles.textBtn}>Confirm Payment</Text>
					</TouchableOpacity>
				</LinearGradient>
                {visible==true &&
                  <>
                   <LinearGradient
                   colors={[colors.red, colors.red]}
                   style={[styles.button,{marginTop:40}]}
               >
                   <TouchableOpacity
                       style={{ width: '100%', alignItems: 'center' }}
                       onPress={() => navigate('Review', {payment:price})}
                   >
                       <Text style={styles.textBtn}>Add Review</Text>
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
                   onPress={() => navigate('UsersActive')}
               >
                   <Text style={styles.textBtnSignUp}>Skip</Text>
               </TouchableOpacity>
               </>
                }
				
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

export default ConfirmationScreen;
