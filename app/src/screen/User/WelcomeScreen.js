import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';

function WelcomeScreen({ navigation: { navigate }}) {
	const [isLoading, setLoading] = React.useState(true);

	useEffect(() => {
		console.log(global.user)
		setTimeout(() => {	
		navigate('Choice');
		}, 1000);
		return () => {};
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.background}
				source={require('../../assets/images/splash.png')}
				onLoadEnd={(isLoading) => setLoading(!isLoading)}
			>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.white,
	},
	activity: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		backgroundColor: colors.white,
	},
	background: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	buttonsContainer: {
		padding: 20,
		width: '100%',
	},
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 15,
		marginHorizontal: 10,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
	},
	logo: {
		width: 300,
		height: 300,
	},
	logoContainer: {
		position: 'absolute',
		top: -25,
		alignItems: 'center',
	},
});


export default WelcomeScreen;




