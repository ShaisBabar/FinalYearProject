import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  Switch,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { SettingsScreen, SettingsData, Chevron } from './../../components/lib'

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'

const renderHero = () => (
  <View style={styles.heroContainer}>
    <Image source={require('../../assets/images/image_1.jpg')} style={styles.heroImage} />
    <View style={{ flex: 1 }}>
      <Text style={styles.heroTitle}>Jan Söndermann</Text>
      <Text style={styles.heroSubtitle}>jan+git@primlo.com</Text>
    </View>
    <Chevron />
  </View>
)

export default class App extends React.Component {
  state = {
    refreshing: false,
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
          showDisclosureIndicator: true,
        },
        {
          title: 'Edit Profile',
          //subtitle: 'Change Account Details',
          showDisclosureIndicator: true,
        },
        // {
        //   title: 'Long title. So long long long long long long long',
        //   subtitle:
        //     'And so is the subtitle. Even longer longer longer longer longer',
        // },
        {
          title: 'Show Phone no. on Profile',
          renderAccessory: () => <Switch value onValueChange={() => {}} />,
        },
        {
            title: 'Show Address on Profile',
            renderAccessory: () => <Switch value onValueChange={() => {}} />,
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
          renderAccessory: () => (
            <Icon
              style={{ marginTop: 3, marginRight: 6 }}
              name="colours"
              size={32}
              color="black"
            />
          ),
          showDisclosureIndicator: true,
        },
        {
            title: 'Delete Account',
            renderAccessory: () => (
              <Icon
                style={{ marginTop: 3, marginRight: 6 }}
                name="colours"
                size={32}
                color="black"
              />
            ),
            showDisclosureIndicator: true,
          },
        {
            title: 'Logout',
            renderAccessory: () => (
              <Icon
                style={{ marginTop: 3, marginRight: 6 }}
                name="colours"
                size={32}
                color="black"
              />
            ),
            showDisclosureIndicator: true,
          },
      ],
    },
    {
      type: 'SECTION',
      header: 'Help'.toUpperCase(),
      rows: [
        {
          title: 'Contact us',
          showDisclosureIndicator: true,
        },
        {
            title: 'FAQs',
            showDisclosureIndicator: true,
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
        <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
        <SettingsScreen
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
