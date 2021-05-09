import * as React from 'react';
import { List } from 'react-native-paper';
import {
	View,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import GradientHeader from 'react-native-gradient-header';
import colors from '../../styles/colors';

const FAQScreen = () => {

  return (
    <View style={styles.screen}>
        <View style={styles.headerScreen}>
				<Animatable.View animation="slideInDown">
					 				<GradientHeader
						title={`FAQs`}
						subtitle=""
						gradientColors={[colors.red, colors.red]}
						imageSource={{
							uri: '../../assets/images/user.png'
						}}
					/>
				</Animatable.View>
			</View>
    <List.Section title="If you're still confused, feel free to contact us!" style={{marginTop:180}}>
      <List.Accordion
        title="Q1"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q2"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q3"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q4"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q5"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q6"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q7"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q8"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q9"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
      <List.Accordion
        title="Q10"
        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
        
         >
        <List.Item title="First item" />
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>

    </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FAQScreen;