import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import colors from '../../styles/colors';
const { width, height } = Dimensions.get('window');
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      messages: []
    };
    this.send = this.send.bind(this);
    this.renderItem   = this._renderItem.bind(this);
  }
  componentDidMount(){
    // console.log('user',this.props.route.params.userid)
    // console.log('worker',this.props.route.params.workerid)
    fetch('http://192.168.8.100:5000/messages/getconversations/'+this.props.route.params.userid+'/'+this.props.route.params.workerid)
    .then((response) => response.json())
    .then((json) => {
      //console.log("res",json)
      if (json.success==true) {
        this.setState({
          messages:json.result,
        });
      }
      else{
        Alert.alert(
          "Error Loading Messages",
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
      //console.log('llllll')
  }
  

  send() {
      if (this.state.msg.length == 0) {
        Alert.alert(
          "Cannot send empty message",
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
          return

      }
      const message_obj = {
        user_id:this.props.route.params.userid,
        worker_id:this.props.route.params.workerid,
        message:this.state.msg
      }
      fetch('http://192.168.8.100:5000/messages/sendmessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message_obj)
      })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json.msg)
        if (json.success==true) {
           var messages = this.state.messages;
            messages.push(json.msg);
            this.setState({msg:''});
            this.setState({messages:messages});
      }
        else{
          Alert.alert(
            "Error sending message",
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

  _renderItem = ({item}) => {
    if (item.user_id === global.user._id) {
      return (
        <View style={styles.eachMsg}>
          <Image source={require(`./../../assets/images/avatar.png`)} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.message}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.message}</Text>
          </View>
          <Image source={require(`./../../assets/images/avatar.png`)} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
         <FlatList 
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor = {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}/>

         <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Type message..."
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({msg:name_address})}
                value={this.state.msg}
                />
                
          </View>

            <TouchableOpacity style={styles.btnSend} onPress={()=>{this.send()}}>
              <Image source={require(`./../../assets/images/send.png`)} style={styles.iconSend}  />
            </TouchableOpacity>
        </View>
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
        backgroundColor:colors.red,
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
    height: 40,
    width: 47,
    margin: 5,
    borderRadius: 20,
    backgroundColor: colors.red,
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
    color: 'white',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
}); 