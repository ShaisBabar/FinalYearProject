import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';

function LogoutScreen({ navigation: { navigate }, token, loading, login }) {
	
	useEffect(() => {
        token = null;
		navigate('Welcome');
	}, []);

	return (
		<View style={styles.container}>
		</View>
	);
}

export default LogoutScreen;




