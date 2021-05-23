import React, { useEffect, useState } from 'react';
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Root} from 'popup-ui';
import CheckBox from '@react-native-community/checkbox';

import colors from '../../styles/colors';
import {
	Dropdown,
  } from 'sharingan-rn-modal-dropdown';
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from './../../assets/strings'
import DateTimePicker from '@react-native-community/datetimepicker';

function PostServiceScreen(props) {
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('No description added');
	const [city, setCity] = useState(global.user.city);
	const [address, setAddress] = useState(global.user.street_address);
	const [service_, setservice] = React.useState(props.route.params.service);
	const data = citydata;
	const [toggle, setToggleCheckBox] = React.useState(true);
	const [area, setArea] = useState(global.user.area);
	const [area_city, setAreaCity] = useState([ {
        value: global.user.area,
        label: global.user.area,
      },]);
	const [starting_time, setStartTime] = useState('');
	const [expected_time, setExpectedTime] = useState('');
	const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [timeshow, setTimeShow] = useState(false);
  useEffect(() => {
	setAreaforCityFunc(global.user.city);
	return () => {};
}, []);
useEffect(() => {
	setArea(global.user.area)
	return () => {};
}, []);
  const ChangeArea = (text) =>{
	  setArea(text)
	  console.log(area)
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
	// console.log(currentDate);
	// console.log(currentDate.toLocaleDateString());
	// console.log(currentDate.toLocaleTimeString());
	setStartTime('Date:'+currentDate.toLocaleDateString()+' Time:'+currentDate.toLocaleTimeString())
	setShow(false)
	setTimeShow(true);
  };
  const ontimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTimeShow(Platform.OS === 'ios');
    setDate(currentDate);
	// console.log(currentDate);
	// console.log(currentDate.toLocaleDateString());
	// console.log(currentDate.toLocaleTimeString());
	setStartTime('Date:'+currentDate.toLocaleDateString()+' Time:'+currentDate.toLocaleTimeString())
	setShow(false)
	setTimeShow(false);
	return;
  };
  const selectDate = () =>{
	setShow(true);
	setTimeShow(false);
  }
	  const setAreaforCityFunc = (city) =>{
		setCity(city);
		if(city=='Islamabad'){
			setAreaCity(isl_data);
		}
		else if(city=='Karachi'){
			setAreaCity(karachi_data);
		}
		else if(city=='Lahore'){
			setAreaCity(lahore_data);
		}
		else if(city=='Karachi'){
			setAreaCity(karachi_data);
		}
		else if(city=='Multan'){
			setAreaCity(multan_data);
		}
		else if(city=='Quetta'){
			setAreaCity(quetta_data);
		}
		setArea(global.user.area)
		
	}

	const AddNewPost = () =>{

		const post = {
			user_id:global.user._id,city,street_address:address,city,area,description,categories:[service_], starting_time:date,expected_time,
			max_payment:price
		}
		console.log(post)
		fetch('http://192.168.1.100:5000/jobs/addjob', {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			if (json.success==true) {
				Alert.alert(
					json.message,
					"",
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
			else{
				Alert.alert(
					json.message,
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
			"Error occured.",
			"Try again.",
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
		<Root>
            <View>
				<Text style={styles.heading}>Get Service</Text>
			</View>
			<View style={styles.container}>
				<ScrollView>
            <Text style={styles.text}>Service</Text>
			<View style={styles.citycontainer}>
				
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Enter job'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={service_}
                    editable={false}
				/>
				</View>
				<Text style={styles.text}>Relavent Details</Text>
				<TextInput
					style={styles.textInput}
					maxLength={255}
					numberOfLines={3}
					onChangeText={(text) => setDescription(text)}
					value={description}
				/>
				<Text style={styles.text}>Select Start Date/Time</Text>
				<TouchableOpacity
					style={[
						styles.textInput,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={selectDate}
				>
					<Text style={styles.text}>Select Date</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity
					style={[
						styles.textInput,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={showTimepicker}
				>
					<Text style={styles.text}>Select Time</Text>
				</TouchableOpacity> */}
					{show && (
					<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode='date'
					is24Hour={true}
					display="default"
					onChange={onChange}
					/>
				)}
				{timeshow && (
					<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode='time'
					is24Hour={true}
					display="default"
					onChange={ontimeChange}
					/>
				)}
				<TextInput
					style={styles.textInput}
					placeholder={'Starting date/time'}
					value={starting_time}
					editable={false}
				/>
				<Text style={styles.text}>Expected Finish Time</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'format: 2h or 3d, 4m etc.'}
					maxLength={5}
					onChangeText={(text) => setExpectedTime(text)}
					value={expected_time}
				/>
				<Text style={styles.text}>Max Budget</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. 150'}
					keyboardType="numeric"
					maxLength={5}
					onChangeText={(text) => setPrice(text)}
					value={price}
				/>
				<CheckBox
                 value={toggle}
				 onValueChange={(newValue) => setToggleCheckBox(newValue)}
				 />
				 <Text style={styles.text}>Same Address as current address</Text>
				 {!toggle &&
				    <>
					<Text style={styles.text}>Select City</Text>
				<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select City'}
					data={data}
					enableSearch
					value={city}
					onChange={setAreaforCityFunc}
				/>
				</View>
				<Text style={styles.text}>Select Area</Text>
				<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select Area'}
					data={area_city}
					enableSearch
					value={area}
					onChange={(text)=>{
						ChangeArea(text);
						}}
				/>
				<Text style={styles.text}>Enter Street Address</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Same as Account Address'}
					maxLength={20}
					onChangeText={(text) => setAddress(text)}
					value={address}
				/>
				</View>
					</>

				 }
				
				
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						onPress={() => {
							AddNewPost();
						}}
					>
						<Text style={styles.textBtn}>Post Request</Text>
					</TouchableOpacity>
				</LinearGradient>
				</ScrollView>
			</View>
		</Root>
	);
}

const styles = StyleSheet.create({
    heading:{
        color:colors.red,
        fontSize:40,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
     },
	button: {
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		elevation: 5,
		marginVertical: 10,
		marginHorizontal: 70,
	},
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignContent: 'center',
		paddingTop: 20,
		paddingHorizontal: 15,
	},
	image: {
		height: 170,
		width: 170,
		borderRadius: 10,
		borderColor: colors.red,
		borderWidth: 1,
	},
	text: {
		color: colors.black,
		fontSize: 14,
		paddingHorizontal: 20,
	},
	textBtn: {
		color: colors.white,
		fontSize: 18,
		textTransform: 'uppercase',
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
		marginBottom: 20,
	},
});

export default PostServiceScreen;
