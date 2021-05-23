import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import GradientHeader from 'react-native-gradient-header';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import colors from '../../styles/colors';
function JobDetailScreenW(props) 
{
	const job = props.route.params.job;
	const user = global.user;
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phoneno);
	const [address, setAddress] = useState(user?.street_address);
	const [city, setCity] = useState(user?.city);
	const [area, setArea] = useState(user?.area);
    const [exists, setExists] = useState(false);
    useEffect(() => {
        if (job.applicants.filter(e => e.worker_id === user._id).length > 0) {
             setExists(true)
          }
          else{
              setExists(false)
          }
        //console.log(job.applicants.include(global.user._id))


    },[]);
	const applyforjob = () =>{
        const user = {
            id:job._id,
            application:{worker_id:global.user._id}
        }
        job.applicants.push({worker_id:global.user._id})
        console.log(user)
        fetch('http://192.168.1.100:5000/jobs/applyjob', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.success==true) {
                Alert.alert(
                    "Applied for Job",
                    "Best of luck.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                props.navigation.navigate('Explore Jobs');
            }
            else{
                Alert.alert(
                    "Something Went Wrong.",
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
                  props.navigation.navigate('Explore Jobs');
            }
        })
        .catch((error) => Alert.alert(
            "Error occured."+error,
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

    const unapplyforjob = () =>{
        const user = {
            id:job._id,
            workerid:global.user._id
        }
        job.applicants = job.applicants.filter(r=>r.worker_id!=global.user._id)
        console.log(user)
        fetch('http://192.168.1.100:5000/jobs/unapplyjob', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.success==true) {
                Alert.alert(
                    "Unapplied for Job",
                    "Try another job.",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                props.navigation.navigate('Explore Jobs');
            }
            else{
                Alert.alert(
                    "Something Went Wrong.",
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
                  props.navigation.navigate('Explore Jobs');
            }
        })
        .catch((error) => Alert.alert(
            "Error occured."+error,
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
		<View style={styles.screen}>
			<View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					 				<GradientHeader
						title={`Job Details`}
						subtitle=""
						gradientColors={[colors.red, colors.red]}
						imageSource={{
							uri: '../../assets/images/user.png'
						}}
					/>
				</Animatable.View>
			</View>
			<View style={styles.flatContainer}>
			<ScrollView style={styles.container}>
 						<Text style={styles.text}>Job ID</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							maxLength={50}
							onChangeText={(text) => setName(text)}
							value={job._id}
							editable={false}
						/>
						<Text style={styles.text}>Category</Text>
						<TextInput
							style={styles.textInput}
							autoCapitalize="none"
							keyboardType="email-address"
							placeholder={'Enter Email'}
							maxLength={50}
							onChangeText={(text) => setEmail(text)}
							value={job.categories[0].name}
							editable={false}
						/>
						<Text style={styles.text}>Date Created</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Phone no.'}
							onChangeText={(text) => setPhone(text)}
							value={job.dateCreated}
							editable={false}
						/>
						<Text style={styles.text}>Description</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							onChangeText={(text) => setCity(text)}
							value={job.description}
							editable={false}
						/>
						<Text style={styles.text}>User Address</Text>
						<TextInput
							style={styles.textInput}
							placeholder={'Enter Full Name '}
							onChangeText={(text) => setArea(text)}
							value={job.street_address+", "+job.area+", "+job.city}
							editable={false}
						/>
                        {exists==true && 
                        <LinearGradient
                        colors={[colors.red, colors.red]}
                        style={[styles.button]}
                    >
                        <TouchableOpacity
                            style={{ width: '100%', alignItems: 'center' }}
                            onPress={() => unapplyforjob()}
                        >
                            <Text style={styles.textBtn}>Unpply for Job</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                        
                    }
                    {exists==false && 
                        <LinearGradient
                        colors={[colors.red, colors.red]}
                        style={[styles.button]}
                    >
                        <TouchableOpacity
                            style={{ width: '100%', alignItems: 'center' }}
                            onPress={() => applyforjob()}
                        >
                            <Text style={styles.textBtn}>Apply for Job</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                        
                    }
						
				
						<View style={styles.bottom}></View>
		</ScrollView>
		</View>
		</View>
	);
}

const styles = StyleSheet.create({
	bottom:{
       marginBottom:40
	},
	heading:{
       color:colors.red,
	   fontSize:40,
	   fontWeight:'bold',
	   textAlign:'center',
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
		//marginTop: 160
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
	  },
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
		marginBottom:10,
		marginTop:15
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
});

export default JobDetailScreenW;
