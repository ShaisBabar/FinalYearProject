import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
} from 'react-native';

import { Rating, AirbnbRating } from 'react-native-ratings';

import colors from '../styles/colors';

function ReviewCard({ title, text, rated, time, image }) {
	return (
		<TouchableHighlight
			style={styles.screen}
			underlayColor={colors.light}
			// onPress={onPress}
		>
			<View style={styles.card}>
				{image=='like.png' && 
				 <Image style={styles.image} source={require(`./../assets/images/like.png`)} />
				}
				{image=='unlike.png' && 
				 <Image style={styles.image} source={require(`./../assets/images/unlike.png`)} />
				}
				
				<View style={{ flex: 1 }}>
					<View style={styles.detailsContainer}>
						<View style={styles.leftContainer}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.time}>By: {time}</Text>
						</View>
						<View style={styles.rightContainer}>
							<Rating
							    type='heart'
								style={styles.rating}
								imageSize={18}
								ratingCount={5}
								startingValue={rated}
								readonly={true}
							/>
						</View>
					</View>
					{text==1 &&
					<Text style={styles.text}>Sentiment: Positive</Text>
					}
					{text==0 &&
					<Text style={styles.text}>Sentiment: Negative</Text>
					}
					
				</View>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	completed: {
		color: colors.orange,
	},
	screen: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 15,
	},
	card: {
		flex: 1,
		borderRadius: 10,
		backgroundColor: colors.white,
		elevation: 10,
		flexDirection: 'row',
		// marginHorizontal: 5,
		// marginTop: 20,
		overflow: 'hidden',
		shadowRadius: 20,
	},
	detailsContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingBottom: 10,
		paddingHorizontal: 10,
	},
	leftContainer: {
		flex: 2,
		alignItems: 'flex-start',
		marginVertical: 10,
		// backgroundColor: colors.red,
	},
	rightContainer: {
		flex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		// alignItems: 'flex-end',
		// marginVertical: 10,
		// marginRight: 10,
		// backgroundColor: colors.red,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 20,
		margin: 10,
		padding:30
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	time: {
		color: colors.medium,
		fontWeight: '100',
		fontSize: 15,
		marginTop: 5,
	},
	text: {
		textAlign: 'justify',
		color: colors.dark,
		paddingBottom: 10,
		marginRight: 5,
		paddingHorizontal: 10,
		fontSize: 15,
		// backgroundColor: colors.red,
	},
	rating: {
		// color: colors.dark,
		// fontWeight: '200',
		// marginBottom: 6,
		alignItems: 'flex-end',
		marginTop: 10,
		marginHorizontal: 20,
		// backgroundColor: colors.red,
	},
	status: {
		fontWeight: '700',
		fontSize: 15,
		marginTop: 10,
	},
});

export default ReviewCard;
