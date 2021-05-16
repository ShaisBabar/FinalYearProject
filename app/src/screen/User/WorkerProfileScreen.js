import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Alert,
	ToastAndroid,
} from 'react-native';
import axios  from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ReviewCard from '../../components/ReviewCard';

import colors from '../../styles/colors';
import profileImg from '../../utils/profileImg';
import LoadingIndicator from '../../components/LoadingIndicator';
import { set } from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const appointment1 = [
	{
		id: 1,
		name: 'Tuseeq Raza',
		rated: 2,
		text:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_1.jpg'),
	},
	{
		id: 2,
		name: 'Tuseeq Ahmed',
		rated: 4,
		text: 'Active',
		time: 'Oct 17, 2020 9:50 AM',
		image: require('../../assets/images/image_2.jpg'),
	},
	{
		id: 3,
		name: 'Abdullah',
		rated: 5,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_3.jpg'),
	},
	{
		id: 4,
		name: 'Humza Jameel',
		rated: 1,
		text: 'Active',
		time: 'Oct 16, 2020 11:50 AM',
		image: require('../../assets/images/image_5.jpg'),
	},
	{
		id: 5,
		name: 'Tuseeq Raza',
		rated: 0,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_6.jpg'),
	},
	{
		id: 6,
		name: 'Tuseeq Ahmed',
		rated: 5,
		text: 'Active',
		time: 'Oct 17, 2020 9:50 AM',
		image: require('../../assets/images/image_7.jpg'),
	},
	{
		id: 7,
		name: 'Abdullah',
		rated: 1,
		text: 'Active',
		time: 'Oct 23, 2020 4:50 PM',
		image: require('../../assets/images/image_8.jpg'),
	},
	{
		id: 8,
		name: 'Humza Jameel',
		rated: 5,
		text: 'Active',
		time: 'Oct 16, 2020 11:50 AM',
		image: require('../../assets/images/image_9.jpg'),
	},
];

function BarberAbout({ user, updateUser, loading }) {
	const [apiMage, setApiMage] = useState({});
	const [image, setImage] = useState(
		user?.image
			? `data:${user?.image?.type};base64,${user?.image?.data}`
			: profileImg.img,
	);
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phoneno);
	const [address, setaddress] = useState(user?.street_address);
	const [city, setcity] = useState(user?.city);
	const [getmarginBottom, setMarginBottom] = useState(1);
	const update = () => {
		const updateCurrentUser = {
			name,
			email,
			phoneno: phone,
			street_address: address,
			city:city
		};
		updateUser(updateCurrentUser);
	};

	const selectFile = () => {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.showImagePicker(options, (res) => {
			if (res.didCancel) {
				//console.log('User cancelled image picker');
			} else if (res.error) {
				//console.log('ImagePicker Error: ', res.error);
			} else {
				setApiMage({ type: res.type, data: res.data });
				const uri = `data:${res.type};base64,${res.data}`;
				setImage(uri);
			}
		});
	};

	return (
		<ScrollView style={styles.container}>
			{loading && <LoadingIndicator />}
			{!loading && (
				<View style={{ width: '100%', height: '100%' }}>
					<TouchableOpacity style={styles.imageContainer} onPress={selectFile}>
						<Image style={styles.profileImage} source={{ uri: image }} />
					</TouchableOpacity>
					<View style={styles.profileData}>
						
						<Text style={styles.text}>Name</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Ahmed'}
							maxLength={50}
							onChangeText={(text) => setName(text)}
							value={name}
						/>
						<Text style={styles.text}>Email</Text>
						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							keyboardType="email-address"
							placeholder={'e.g. abc@gmail.com'}
							maxLength={50}
							onChangeText={(text) => setEmail(text)}
							value={email}
						/>
						<Text style={styles.text}>Phone no.</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'+92'}
							keyboardType={'phone-pad'}
							maxLength={13}
							minLength={11}
							onChangeText={(text) => setPhone(text)}
							value={phone}
						/>
						<Text
							style={[
								styles.text,
								{
									fontSize: 20,
									fontWeight: 'bold',
									marginTop: 30,
									marginBottom: 15,
								},
							]}
						>
							User Address
						</Text>
						<Text style={styles.text}>Street Address</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'e.g. HairoSol'}
							maxLength={50}
							onChangeText={(text) => setaddress(text)}
							value={address}
						/>
						<Text style={styles.text}>City</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'e.g. G-9, Lane 3, Islamabad '}
							maxLength={50}
							onChangeText={(text) => setCity(text)}
							value={city}
						/>

						</View>
						<LinearGradient
							colors={[colors.orange, colors.red]}
							style={styles.button}
						>
							<TouchableOpacity
								style={{ width: '100%', alignItems: 'center' }}
								onPress={update}
							>
								<Text style={styles.textBtn}>Save</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				
			)}
		</ScrollView>
	);
}

function barberReviews(props) {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.110:5000/reviews/getreviewsbyworker/'+global.user._id)
      .then((response) => response.json())
      .then((json) => {
        if (json.success==true) {
          setReviews(json.result)
        }
        else{
          Alert.alert(
            "Error Loading Reviews",
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
        }
      })
      .catch((error) => Alert.alert(
        "Error occured. "+error,
        "Try again later.",
        [
          {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
        )
        );
		return () => {};
	}, []);
	return (
		<View style={styles.screen}>
			<FlatList
				contentContainerStyle={{ paddingBottom: 15 }}
				style={styles.flatScreen}
				data={reviews}
				keyExtractor={(review) => review._id.toString()}
				renderItem={({ item }) => (
					<ReviewCard
						title={item.user_id}
						time={item.dateCreated}
						//image={item.image}
						text={item.review_text+', '+item.sentiment}
						rated={item.rating}
					/>
				)}
			/>
		</View>
	);
}

function WorkerProfileScreen({ user, updateUser, loading }) {
	useEffect(() => {
		if (!user) {
			user = global.user
		}
		return () => {};
	}, []);
	return (
		<Tab.Navigator
			initialRouteName="About"
			tabBarOptions={{
				labelStyle: { fontSize: 14 },
				indicatorStyle: { backgroundColor: colors.white },
				activeTintColor: colors.white,
				inActiveTintColor: colors.lightRed,
				style: { backgroundColor: colors.red },
			}}
		>
			<Tab.Screen
				name="About"
				options={{
					tabBarLabel: 'About',
				}}
			>
				{(props) => (
					<BarberAbout
						{...props}
						user={user}
						updateUser={updateUser}
						loading={loading}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name="Reviews"
				component={barberReviews}
				options={{
					tabBarLabel: 'Reviews',
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.white,
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
		marginVertical: 20,
		marginHorizontal: 90,
	},
	container: {
		flex: 1,
		alignContent: 'center',
		backgroundColor: colors.white,
	},
	imageContainer: {
		alignItems: 'center',
		marginHorizontal: 100,
	},
	profileImage: {
		height: 160,
		width: 160,
		borderRadius: 80,
		borderColor: colors.red,
		borderWidth: 3,
		marginVertical: 40,
	},
	CoverImage: {
		position: 'absolute',
		right: 0,
		top: 0,
		height: 250,
		width: '100%',
		borderBottomRightRadius: 50,
	},
	profileData: {
		paddingHorizontal: 15,
	},
	row: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
	},
	rowInput: {
		width: 180,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,
	},
	timeRow: {
		flexDirection: 'row',
		height: 40,
		fontSize: 14,
		borderRadius: 25,
		elevation: 5,
		backgroundColor: colors.light,
		paddingHorizontal: 15,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,

		justifyContent: 'space-between',
	},
	getLocation: {
		fontSize: 14,
		color: colors.white,
		backgroundColor: colors.red,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	mapContainer: {
		// ...StyleSheet.absoluteFillObject,
		height: 400,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
		margin: 10,
		borderRadius: 10,
	},
	weekPicker: {
		paddingVertical: 30,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	day: {
		margin: 5,
		elevation: 5,
		backgroundColor: colors.light,
	},
});

export default WorkerProfileScreen;
