import React, { useEffect, useState } from 'react';
import {
	Image,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Root} from 'popup-ui';
import CheckBox from '@react-native-community/checkbox';

import colors from '../../styles/colors';
import {
	Dropdown,
  } from 'sharingan-rn-modal-dropdown';
import {services_data} from '../../assets/strings';
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from '../../assets/strings'
import DateTimePicker from '@react-native-community/datetimepicker';

function PostServiceScreen(props) {
    const job = props.route.params.job;

	const [price, setPrice] = React.useState(job.max_payment);
	const [description, setDescription] = React.useState(job.description);
	const [city, setCity] = useState(job.city);
	const [address, setAddress] = useState(job.street_address);
	const [service_, setservice] = React.useState(job.categories[0].name);
	const data = citydata;
	const [toggle, setToggleCheckBox] = React.useState(true);
	const [area, setArea] = useState(job.area);
	const [area_city, setAreaCity] = useState([ {
        value: global.user.area,
        label: global.user.area,
      },]);
	const [starting_time, setStartTime] = useState('');
	const [expected_time, setExpectedTime] = useState(job.expected_time);
	const [date, setDate] = useState(job.dateCreated || new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [timeshow, setTimeShow] = useState(false);
  useEffect(() => {
      setservice(job.categories[0].name);
      console.log(job.categories[0].name);
	setAreaforCityFunc(job.city);
	return () => {};
}, []);
useEffect(() => {
	setArea(job.area)
    //setStartTime('Date:'+date?.toLocaleDateString()+' Time:'+date?.toLocaleTimeString())
    console.log(job.max_payment);
    console.log(price)
	return () => {};
}, []);
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
		setArea('Add Area')
		
	}

    useEffect(() => {
        console.log(services_data)

	}, []);
	const selectFile = () => {
		var options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.showImagePicker(options, (res) => {
			//console.log('Response = ', res);

			if (res.didCancel) {
				//console.log('User cancelled image picker');
			} else if (res.error) {
				//console.log('ImagePicker Error: ', res.error);
			} else {
				setApiMage({ type: res.type, data: res.data });
				const uri = `data:${res.type};base64,${res.data}`;
				setImagePicked(uri);
			}
		});
	};

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
				<Text style={styles.heading}>Update Service</Text>
			</View>
			<View style={styles.container}>
				<ScrollView>
            <Text style={styles.text}>Service</Text>
			<View style={styles.citycontainer}>
				<Dropdown
				    placeholder={'Select Service'}
					data={services_data}
					enableSearch
					value={service_}
					onChange={setservice}
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
				<Text style={styles.text}>Start Date/Time</Text>
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
					// keyboardType="numeric"
					// onChangeText={(text) => setPrice(text)}
					value={job.max_payment}
				/>
			
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
					onChange={setArea}
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
			
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						onPress={() => {
							AddNewPost();
						}}
					>
						<Text style={styles.textBtn}>Update Post</Text>
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
