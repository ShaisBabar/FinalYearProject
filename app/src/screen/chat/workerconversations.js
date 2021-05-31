import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,Image,StyleSheet,Dimensions,TouchableOpacity,Alert } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import colors from '../../styles/colors';
const { width, height } = Dimensions.get('window');

class WorkerConversationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
      fetch('http://192.168.8.100:5000/messages/getallworkerconversations/'+global.user._id)
      .then((response) => response.json())
      .then((json) => {
        console.log("kkkk",json)
        if (json.success==true) {
          this.setState({
            data: json.result,
            error: json.error || null,
          });
          this.arrayholder = json.result;
          console.log(json.result)
        }
        else{
          Alert.alert(
            "Error Loading Conversations",
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
        "Error occured"+error,
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
 
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });


    const newData = this.arrayholder.filter(item => {
      return `${item.worker_id.name}`.includes(text);
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
            <>
            <TouchableOpacity 	onPress={() => this.props.navigation.navigate('Chat Details',{workerid:global.user._id, userid:item.user_id._id})} >
             <View style={styles.eachMsg}>
             <Image source={require(`./../../assets/images/avatar.png`)} style={styles.userPic} />
             <View style={styles.v}>
               <Text style={styles.msgTxt}>ID: {item.user_id._id}</Text>
               <Text style={styles.msgTxt}>Name: {item.user_id.name}</Text>
              </View>
           </View>     
          </TouchableOpacity>
          </>
          )}
          keyExtractor={item => item.user_id._id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />

        }
        {/* {this.state.data && this.state.data.length==0 &&
          <Text style={styles.msgTxt}>No Applications yet!</Text>
        } */}
        
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
v:{
marginTop:20,
flexDirection: 'column',
},
eachMsg: {
flexDirection: 'row',
//alignItems: 'flex-end',
margin: 5,
},
rightMsg: {
flexDirection: 'row',
alignItems: 'flex-end',
margin: 5,
//alignSelf: 'flex-end',
},
userPic: {
height: 70,
width: 70,
margin: 5,
borderRadius: 50,
backgroundColor: colors.red,
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

export default WorkerConversationsScreen;