import React, { useEffect, useState } from 'react';
import {
	Image,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { Root, Popup } from 'popup-ui';

import colors from '../../styles/colors';
import {
	Dropdown,
  } from 'sharingan-rn-modal-dropdown';
import { connect } from 'react-redux';
import { addPackage } from '../../redux/actions/packageAction';
import { getRecords } from '../../redux/actions/mainRecords';
import {services_data} from './../../assets/strings';
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from './../../assets/strings'

function PackagesAddScreen(props) {
	const [apiMage, setApiMage] = useState({});
	const [imagePicked, setImagePicked] = useState();
	const [title, setTitle] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [city, setCity] = useState('Add City');
	const [address, setAddress] = useState('');
	const [service_, setservice] = React.useState('Select Service');
	const data = citydata;
	const [area, setArea] = useState('Add Area');
	const [area_city, setAreaCity] = useState([ {
        value: 'Add Area',
        label: 'Add Area',
      },]);
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

	const addNewPackage = () => {
		const newPackage = {
			name: title,
			cost: price,
			picture: apiMage,
			status: true,
			description,
		};
		addPackage(newPackage);
	};

	return (
		<Root>
            <View>
				<Text style={styles.heading}>Get Service</Text>
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
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Enter job'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={title}
				/>
				<Text style={styles.text}>Expected Finish Time</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Enter job'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={title}
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
				<Text style={styles.text}>Enter Street Address</Text>
				<TextInput
					style={styles.textInput}
					placeholder={'Same as Account Address'}
					maxLength={20}
					onChangeText={(text) => setAddress(text)}
					value={address}
					editable={false}
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
				</View>
				
				<LinearGradient
					colors={[colors.red, colors.red]}
					style={[styles.button]}
				>
					<TouchableOpacity
						onPress={() => {
							addNewPackage();
							getRecords();
							Popup.show({
								type: 'Success',
								title: 'Post Added',
								// button: false,
								textBody: 'New post added successfully.',
								buttonText: 'Ok',
								callback: () => {
									Popup.hide();
									props.navigation.goBack();
								},
							});
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

const mapStateToProps = ({ packageReducer: { packages, loading } }) => ({
	packages,
	loading,
});

const mapActionToProps = { addPackage, getRecords };

export default connect(mapStateToProps, mapActionToProps)(PackagesAddScreen);
