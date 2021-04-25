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
import {citydata,isl_data,lahore_data,karachi_data,quetta_data,multan_data} from './../../assets/strings'
import CheckboxList from './../../components/checkbox/checkList';
const service_data = [
	{ id: 1, name: 'Plumbing' },
	{ id: 2, name: 'Gardening' },
	{ id: 3, name: 'Cooking' },
	{ id: 4, name: 'Laundary Work' },
	{ id: 5, name: 'Carpenting' },
	{ id: 6, name: 'Electrician' },
   
  ];
function AddJobScreen(props) {
	const [apiMage, setApiMage] = useState({});
	const [imagePicked, setImagePicked] = useState();
	const [title, setTitle] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [city, setCity] = useState('Add City');
	const [area, setArea] = useState('Add Area');
	const [address, setAddress] = useState('');
	const [service_, setservice] = React.useState(props.route.params.service);
	const data = citydata;
	const [area_city, setAreaCity] = useState([ {
        value: 'Add Area',
        label: 'Add Area',
      },]);
	  const theme = 'red';
	  const border = 'grey';
    // useEffect(() => {
        
	// 	console.log("jjj",props.route.params.service);
	// 	//console.log("jjj",navigation.navigate);

	// }, []);

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
				<TextInput
					style={styles.textInput}
					placeholder={'e.g. Enter job'}
					maxLength={50}
					onChangeText={(text) => setTitle(text)}
					value={service_}
                    editable={false}
				/>
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
				{/* <Text style={styles.text}>Select Services</Text>
				<CheckboxList
          headerName="Select All"
          theme={theme}
          listItems={service_data}
          onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
          onLoading={() => (
            <View
              style={{
                flex: 1,
				marginTop:20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="red" />
              <Text style={{ fontSize: 16, color: '#555555' }}>
                Loading....
              </Text>
            </View>
          )}
          //selectedListItems={service_data.slice(0, 4)}
          checkboxProp={Platform.select({
            // Optional
            ios: {
              // iOS (supported from v0.3.0)
              boxType: 'square',
              tintColor: border,
              onTintColor: theme,
              onCheckColor: '#fff',
              onFillColor: theme
            },
            android: {
              tintColors: { true: theme, false: border }
            }
          })}
          // listItemStyle={{ borderBottomColor: "#eee", borderBottomWidth: 1 }}
          
        /> */}
				<LinearGradient
					colors={[colors.orange, colors.red]}
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

export default connect(mapStateToProps, mapActionToProps)(AddJobScreen);
