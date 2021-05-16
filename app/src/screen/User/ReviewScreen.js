import React, { useEffect, useState } from 'react';
import { Rating, AirbnbRating } from 'react-native-ratings';

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

function ReviewScreen(props) {
	const [reviewtext, setReview] = useState('');
	const [rating, setRating] = useState('');
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
		setRating(rating);
      }
	const submitreview = () =>{
		let data ={review:reviewtext,rating:rating,user_id:global.user._id,worker_id:props.route.params.worker,job_id:props.route.params.jobid}
		console.log(data)
		fetch('http://192.168.0.110:4001/predict', {
				method: 'POST',
				headers: {
				  Accept: 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				if (json.success==true) {
					global.user = json.user
					//AsyncStorage.setItem('@Token', json.token);
					Alert.alert(
						"Review Submitted!",
						"Thank you for your feedback.",
						[
						  {
							text: "Cancel",
							onPress: () => console.log("Cancel Pressed"),
							style: "cancel"
						  },
						  { text: "OK", onPress: () => console.log("OK Pressed") }
						]
					  );
					props.navigation.navigate('Home');
				}
				else{
					Alert.alert(
						'Something Went Wrong.',
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
					source={require('../../assets/images/13.png')}
				/>
			</LinearGradient>
			<Animatable.View animation="slideInUp" style={styles.footer}>
            <Text style={styles.text}>Give Rating</Text>
            <Rating
                    type='heart'
                    ratingCount={5}
                    imageSize={60}
                    showRating
                    onFinishRating={ratingCompleted}
                    />

				<Text style={styles.text}>Give Review</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Enter Review'}
					maxLength={50}
					onChangeText={(text) => setReview(text)}
					value={reviewtext}
				/>
               
				<TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={() => submitreview()}
				>
					<Text style={styles.textBtnSignUp}>Submit Review</Text>
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


export default ReviewScreen;
