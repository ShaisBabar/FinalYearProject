import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,Image,StyleSheet,Dimensions,TouchableOpacity,Alert } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import colors from '../../styles/colors';
const { width, height } = Dimensions.get('window');
//import {images} from './../../assets/strings';

const images_name = [
  'electrician.png',
  'plumbing.png',
  'carpenter.png',
  'cooking.png',
  'laundary.png',
  'gardening.png'
];

const images = [
  require(`./../../assets/categories/electrician.png`),
  require(`./../../assets/categories/plumbing.png`),
  require(`./../../assets/categories/carpenter.png`),
  require(`./../../assets/categories/cooking.png`),
  require(`./../../assets/categories/laundary.png`),
  require(`./../../assets/categories/gardening.png`)
];
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: this.props.route.params.workers,
      error: null,
    };

    this.arrayholder = this.props.route.params.workers;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: 'grey',
          marginLeft: '14%',
        }}
      />
    );
  };
 
  assignjob = (workerid) =>{
    var data = {id:this.props.route.params.jobid,workerid:workerid}
    console.log(data)
    fetch('http://192.168.8.100:5000/jobs/addworker', {
			method: 'PUT',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
    .then((response) => response.json())
    .then((json) => {
      if (json.success==true) {
        Alert.alert(
          "Worker Assigned.",
          "Hope this worker is suited to your needs!",
          [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
          );
          this.props.navigation.navigate('UserActive')
      }
      else{
        Alert.alert(
          "Error Assigning Job",
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
          this.props.navigation.navigate('UserActive')
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
      )
      );
  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });


    const newData = this.arrayholder.filter(item => {
      return `${item.name}`.includes(text);
    });
    console.log(newData);

    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search by name..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        {this.state.data &&
          <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.eachMsg}>
            <Image source={require(`./../../assets/categories/worker.png`)} style={styles.userPic} />
            <View>
              <Text style={styles.msgTxt}>Worker Id: {item._id.$oid}</Text>
              <Text style={styles.msgTxt}>Worker Name: {item.name}</Text>
              <Text style={styles.msgTxt}>Average Rating: {item.avg_rating}</Text>
              <TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={() => this.props.navigation.navigate('Chat Details',{workerid:item._id.$oid,userid:global.user._id})}
				>
					<Text style={styles.textBtnSignUp}>Message</Text>
				</TouchableOpacity>
        <TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: colors.light,
							borderColor: colors.red,
							borderWidth: 1,
						},
					]}
					onPress={() => this.props.navigation.navigate('WorkerProfile',{workerid:item._id.$oid})}
				>
					<Text style={styles.textBtnSignUp}>View Profile</Text>
				</TouchableOpacity>
            </View>
           
          </View>     
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />

        }
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex:1
      },
      list:{
        paddingHorizontal: 17,
        marginTop:40
      },
      footer:{
        flexDirection: 'row',
        height:60,
        backgroundColor: '#eeeeee',
        paddingHorizontal:10,
        padding:5,
      },
      btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
      },
      iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
      },
      inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
      },
      itemIn: {
        alignSelf: 'flex-start'
      },
      itemOut: {
        alignSelf: 'flex-end'
      },
      time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color:"#808080",
      },
      item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#eeeeee",
        borderRadius:300,
        padding:5,
      },
    textInput: {
		height: 40,
		fontSize: 14,
		borderRadius: 2,
		elevation: 2,
		backgroundColor: colors.light,
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginHorizontal: 10,
		marginTop: 5,
		marginBottom: 20,
	},

  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    borderColor:'#696969',
    borderWidth:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 70,
    width: 70,
    margin: 5,
    borderRadius: 50,
    backgroundColor: '#f8f8f8',
  },
  textBtnSignUp: {
		color: colors.red,
		fontSize: 18,
		textTransform: 'uppercase',
	},
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: colors.red,
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
}); 

export default SearchResults;