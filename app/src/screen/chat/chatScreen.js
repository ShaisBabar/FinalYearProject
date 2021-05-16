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
      messages: [
        {id:1, sent: true,  msg: 'Lorem ipsum dolom nnjnjnjniiir',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:2, sent: true,  msg: 'sit amet, consectetuer',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:3, sent: false, msg: 'adipiscing elit. Aenean ', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:4, sent: true,  msg: 'commodo ligula eget dolor.',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:5, sent: false, msg: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:6, sent: true,  msg: 'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',   image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'},
        {id:7, sent: false, msg: 'rhoncus ut, imperdiet', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
        {id:8, sent: false, msg: 'a, venenatis vitae', image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'},
      ]
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem   = this._renderItem.bind(this);
  }
  componentDidMount(){
    fetch('http://192.168.0.110:5000/messages/getconversations/'+this.props.route.params.userid+'/'+this.props.route.params.workerid)
    .then((response) => response.json())
    .then((json) => {
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
      console.log('llllll')
    //this.makeRemoteRequest();
  }
  // reply() {
  //   var messages = this.state.messages;
  //   messages.push({
  //     id:Math.floor((Math.random() * 99999999999999999) + 1),
  //     sent: false,
  //     msg: 'llllll',
  //     image:'https://www.bootdey.com/img/Content/avatar/avatar6.png'
  //   });
  //   this.setState({msg:'', messages:messages});
  // }

  send() {
      // setTimeout(() => {
      //   this.reply();
      // }, 2000);
      const message_obj = {
        user_id:this.props.route.params.userid,
        worker_id:this.props.route.params.workerid,
        message:this.state.msg
      }
      fetch('http://192.168.0.110:5000/messages/sendmessage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message_obj)
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.success==true) {
          if (this.state.msg.length > 0) {
            var messages = this.state.messages;
            messages.push({
              id:Math.floor((Math.random() * 99999999999999999) + 1),
              sent: true,
              msg: this.state.msg,
              image:'https://www.bootdey.com/img/Content/avatar/avatar1.png'
            });
      
          //   this.setState({msg:''});
            this.setState({messages:messages});
          
        }
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
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{ uri: item.image}} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <Image source={{uri: item.image}} style={styles.userPic} />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
          {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <FlatList 
              style={styles.list}
              extraData={this.state}
              data={this.state.messages}
              keyExtractor = {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}/>
            <View style={styles.input}>
              <TextInput
                style={{flex: 1 }}
                value={this.state.msg}
                placeholderTextColor = "#696969"
                onChangeText={msg => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"/>
            </View>
          </KeyboardAvoidingView> */}
          {/* <View>
              <TextInput
                style={{flex: 1 }}
                value={this.state.msg}
                placeholderTextColor = "black"
                onChangeText={msg => this.setState({ msg })}
                blurOnSubmit={false}
                onSubmitEditing={() => this.send()}
                placeholder="Type a message"
                returnKeyType="send"/>
            </View> */}
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
              <Image source={{uri:"https://img.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
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
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
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