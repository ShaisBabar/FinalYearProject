import React, { useEffect } from 'react';
import {View} from 'react-native';

function LogoutScreen({ navigation: { navigate }}) {
	
	useEffect(() => {
		global.user = undefined;
		navigate('Choice');
	}, []);

	return (
		<View>
		</View>
	);
}

export default LogoutScreen;




