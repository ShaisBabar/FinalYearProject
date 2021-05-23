import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  Switch,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import colors from '../../styles/colors'

import { SettingsScreen, SettingsData, Chevron } from './../../components/lib'

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'
const user = global.user;
const renderHero = () => (
  <View style={styles.heroContainer}>
    <Image source={require('../../assets/images/image_1.jpg')} style={styles.heroImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.heroTitle}>user.name</Text>
      <Text style={styles.heroSubtitle}>user.email</Text>
    </View>
    <Chevron />
  </View>
)

export default class App extends React.Component {
  state = {
    refreshing: false,
    show_add:global.user.show_address,
    show_phon:global.user.show_phone
  }
  updateshowaddress = () =>{
    fetch('http://192.168.1.100:5000/users/showaddress/'+global.user._id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({value:!this.state.show_add})
            
          })
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			if (json.success==true) {
				Alert.alert(
					"Updaed visibility of Address on Profile",
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
          var u =  global.user;
          u.show_address = !this.state.show_add;
          global.user=u;
          this.setState({show_add:!this.state.show_add})
				  //navigate('Account Settings');
			}
			else{
				Alert.alert(
					"Something went Wrong",
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
				  //navigate('Profile');
			}
		})
		.catch((error) => Alert.alert(
			"Error occured",
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
  }
  deleteservices = () =>{
    Alert.alert(
      "Are you sure you want to delete all previous completed jobs?",
      "",
      [
        {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
        },
        { text: "OK", onPress: () => {
          console.log("OK Pressed");
          fetch('http://192.168.1.100:5000/jobs/removejobuser/'+global.user._id, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          })
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			if (json.success==true) {
				Alert.alert(
					"Deleted Old Completed Jobs",
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
				//navigate('Account Settings');
			}
			else{
				Alert.alert(
					"Something went Wrong",
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
				  //navigate('Profile');
			}
		})
		.catch((error) => Alert.alert(
			"Error occured",
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
      } }
      ]
      );
    
  }

  deleteAccount = () =>{
     
  }

  settingsData= [
    // { type: 'CUSTOM_VIEW', key: 'hero', render: renderHero },
    {
      type: 'SECTION',
      header: 'Profile Settings '.toUpperCase(),
    //   footer:
    //     'Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      rows: [
        {
          title: 'View Profile',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Profile')}}>
            {/* <Icon
              style={{ marginTop: 3, marginRight: 6 }}
              name="colours"
              size={32}
              color="black"
            /> */}
            <Image source={require('./../../assets/images/arrow.png')} style={styles.img}/>
            </TouchableOpacity>
          ),
        },
        {
          title: 'Edit Profile',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Edit Profile')}}>
            {/* <Icon
              style={{ marginTop: 3, marginRight: 6 }}
              name="colours"
              size={32}
              color="black"
            /> */}
            <Image source={require('./../../assets/images/arrow.png')} style={styles.img}/>
            </TouchableOpacity>
          ),
        },
        {
          title: 'Change Password',
          //subtitle: 'Change Account Details',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('UpdatePassword')}}>
             <Image source={require('./../../assets/images/arrow.png')} style={styles.img}/>
            </TouchableOpacity>
          ),
        },
        // {
        //   title: 'Long title. So long long long long long long long',
        //   subtitle:
        //     'And so is the subtitle. Even longer longer longer longer longer',
        // },
        {
          title: 'Show Phone no. on Profile',
          renderAccessory: () => <Switch style={styles.switch} trackColor={{true: colors.red, false: 'grey'}} thumbColor='red' value={this.state.show_phon}  onValueChange={() => {
            this.updateshowphone()
          }} />,
        },
        {
            title: 'Show Address on Profile',
            renderAccessory: () => <Switch style={styles.switch} trackColor={{true: colors.red, false: 'grey'}} thumbColor='red' value={this.state.show_add} onValueChange={() => {
              this.updateshowaddress()
            }} />,
          
          },
        // {
        //   title: 'Text',
        //   renderAccessory: () => (
        //     <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
        //       Maybe
        //     </Text>
        //   ),
        // },
        // {
        //   title: 'Custom view',
        //   renderAccessory: () => (
        //     <View
        //       style={{
        //         width: 30,
        //         height: 30,
        //         backgroundColor: 'blue',
        //       }}
        //     />
        //   ),
        //   showDisclosureIndicator: true,
        // },
      ],
    },
    {
      type: 'SECTION',
      header: 'Actions'.toUpperCase(),
      rows: [
        // {
        //   title: 'Delete Account',
        //   showDisclosureIndicator: true,
        // },
        // {
        //   title: 'Ipsum Lorem Venenatis',
        //   subtitle: 'Vestibulum Inceptos Fusce Justo',
        //   renderAccessory: () => (
        //     <Text style={{ color: '#999', marginRight: 6, fontSize: 18 }}>
        //       Yes
        //     </Text>
        //   ),
        //   showDisclosureIndicator: true,
        // },
        {
          title: 'Delete Services History',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.deleteservices()}}>
           <Image source={require('./../../assets/images/11.png')} style={styles.img}/>
            </TouchableOpacity>
          )
        },
        {
          title: 'Delete Account',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Contact')}}>
           <Image source={require('./../../assets/images/11.png')} style={styles.img}/>
            </TouchableOpacity> 
          )
        },
          {
            title: 'Logout',
            //showDisclosureIndicator: true,
            renderAccessory: () => (
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Logout')}}>
             <Image source={require('./../../assets/images/10.png')} style={styles.img}/>
              </TouchableOpacity>
            )
          },
      ],
    },
    {
      type: 'SECTION',
      header: 'Help'.toUpperCase(),
      rows: [
        {
          title: 'Contact us',
          //showDisclosureIndicator: true,
          renderAccessory: () => (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Contact')}}>
           <Image source={require('./../../assets/images/arrow.png')} style={styles.img}/>
            </TouchableOpacity>
          )
        },
        {
            title: 'FAQs',
            //showDisclosureIndicator: true,
            renderAccessory: () => (
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FAQ')}}>
             <Image source={require('./../../assets/images/arrow.png')} style={styles.img}/>
              </TouchableOpacity>
            )
          },
      ],
    },
    {
      type: 'CUSTOM_VIEW',
      render: () => (
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            color: '#999',
            marginBottom: 40,
            marginTop: -30,
            fontFamily,
          }}
        >
         On Your Doorstep private Ltd.
        </Text>
      ),
    },
  ]

  render() {
    return (
      <View style={styles.container}>
        <SettingsScreen
          style={{marginTop:20}}
          data={this.settingsData}
          globalTextStyle={{ fontFamily }}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true })
                  setTimeout(() => this.setState({ refreshing: false }), 3000)
                }}
              />
            ),
          }}
        />
      </View>
    )
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0

const styles = StyleSheet.create({
  img:{
     width:32,
     height:32
  },
  switch:{
    color:colors.red
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#8c231c',
    height: 44 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'white',
    fontFamily,
    fontSize: 17,
  },
  heroContainer: {
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'black',
    marginHorizontal: 20,
  },
  heroTitle: {
    fontFamily,
    color: 'black',
    fontSize: 24,
  },
  heroSubtitle: {
    fontFamily,
    color: '#999',
    fontSize: 14,
  },
})
