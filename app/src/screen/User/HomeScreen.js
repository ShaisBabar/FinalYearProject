import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native';
import GradientHeader from 'react-native-gradient-header';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import profileImg from '../../utils/profileImg';
import HomeCard from '../../components/HomeCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import colors from '../../styles/colors';

import { connect } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { getUser, getRecords } from '../../redux/actions/mainRecords';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({
	navigation: { goBack, navigate },
	user,
	records,
	loading,
	getUser,
	getRecords,
	logout,
	token,
}) {
	useEffect(() => {
		if (!user) {
			getUser();
		}
		if(user){
		  getRecords(user._id);

		}
		
		return () => {};
	}, [goBack]);

	return (
		<View style={styles.screen}>
			{loading && <LoadingIndicator />}
			<View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					<GradientHeader
						title={`Hello, ${user ? user.name : ''}`}
						subtitle="Get started to get services at your doorstep!"
						gradientColors={[colors.red, colors.red]}
						imageSource={{
							uri: '../../assets/images/user.png'
						}}
					/>
				</Animatable.View>
			</View>
			<View>
				<Text style={styles.heading}>CHOOSE SERVICE</Text>
			</View>
			<View style={styles.flatContainer}>
				<View style={styles.midstyling}>
      <View style={styles.firsttwo}>
        <TouchableOpacity style={styles.loginBtn}  onPress={() => navigate('Post Details', {service: 'Plumbing'})}>
        <Image source={require('./../../assets/images/1.png')} style={styles.img}/>
        <Text style={styles.loginText}>Plumber</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigate('Post Details', {service: 'Laundary Work'})}>
        <Image source={require('./../../assets/images/2.png')} style={styles.img}/>
        <Text style={styles.loginText}>Laundary Worker</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.firsttwo}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigate('Post Details', {service: 'Gardening'})}>
        <Image source={require('./../../assets/images/3.png')} style={styles.img}/>
        <Text style={styles.loginText}>Gardener</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}  onPress={() => navigate('Post Details', {service: 'Cooking'})}>
        <Image source={require('./../../assets/images/4.png')} style={styles.img}/>
        <Text style={styles.loginText}>Cook</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.firsttwo}>
        <TouchableOpacity style={styles.loginBtn}  onPress={() => navigate('Post Details', {service: 'Carpenting'})}>
        <Image source={require('./../../assets/images/5.png')} style={styles.img}/>
        <Text style={styles.loginText}>Carpentor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigate('Post Details', {service: 'Electrician'})}>
        <Image source={require('./../../assets/images/6.png')} style={styles.img}/>
        <Text style={styles.loginText}>Electrician</Text>
        </TouchableOpacity>
        </View>
       </View>
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
	   marginBottom:40,
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
		marginTop: 160
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
	  }
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

const mapActionToProps = { getUser, getRecords, logout };

export default connect(mapStateToProps, mapActionToProps)(HomeScreen);
