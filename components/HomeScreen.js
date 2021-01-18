import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View ,Text ,ScrollView, Alert,Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyHeader from './MyHeader';
import {Card, Title} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default class HomeScreen extends React.Component {
state={
  info:{
    name: "loading",
    temp: "loading",
    temp_min:"loading",
    temp_max:"loading",
    pressure:"loading",
    icon: "loading",
    desc:"loading",
    humidity:"loading",
    wind_speed:"loading",
  },
  err_code:''
}

    async GetWeather(){
      Mycity = await AsyncStorage.getItem("mycity")
      if (!Mycity) {
        Mycity = this.props.route.params?.city ?? 'surat';
      }
        fetch (`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=5c56fd0909f1b3875d59cc7960177b85
        `)
       .then(res=>res.json())
      .then(data=>{
        this.setState({
          info:{
            name: data.name,
            temp: data.main.temp+"°c",
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
            humidity: data.main.humidity+"%",
            temp_min: data.main.temp_min+"°c",
            temp_max: data.main.temp_max+"°c",
            pressure: data.main.pressure+" mbar",
            wind_speed: data.wind.speed+" km/h",
          } 

        })
    }).catch(err=>{
      Alert.alert("Error : "+err.message+" Please Connect Internate")
    })
    }
    componentDidMount(){

      Mycity = this.props.route.params?.city ?? 'surat';

      fetch (`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=5c56fd0909f1b3875d59cc7960177b85
      `)
       .then(res2=>res2.json())
      .then(data2=>{

        this.setState({
            err_code:data2.cod
        })
      })
        this.GetWeather()
    }

  render(){

    if(this.props.route.params?.city){
          if (this.state.err_code =="404") {
            Alert.alert("City Not Found Select Proper City")
            this.props.navigation.navigate('Select City')
            this.setState({
              err_code:''
            })
          }else{
            this.GetWeather()
          }
        }
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MyHeader title="Current Weather" />
        <Card style={{margin:20}}>
          <LinearGradient colors={['#000099', '#0099ff']}>
          <View style={{borderRadius:10, padding:20, alignItems:'center'}}>
            <Title style={{color:"white"}}>{this.state.info.name}</Title>
            <Image style={{width:120, height:120}}
                source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+'.png'}}
            />
            <Title style={styles.text}>TEMPRATURE : <Text style={styles.loadtext}>{this.state.info.temp}</Text> </Title>
            <Title style={styles.text}>PRESSURE : <Text style={styles.loadtext}>{this.state.info.pressure}</Text></Title>
            <Title style={styles.text}>WIND SPEED : <Text style={styles.loadtext}>{this.state.info.wind_speed}</Text></Title>
            <Title style={styles.text}>HUMIDITY : <Text style={styles.loadtext}>{this.state.info.humidity}</Text></Title>
            <Title style={styles.text}>DESCRIPTION : <Text style={styles.loadtext}>{this.state.info.desc}</Text></Title>
            <Title style={styles.text}>MAX TEMPRATURE : <Text style={styles.loadtext}>{this.state.info.temp_max}</Text></Title>
            <Title style={styles.text}>MIN TEMPRATURE : <Text style={styles.loadtext}>{this.state.info.temp_min}</Text></Title>

          </View>
          </LinearGradient>
        </Card>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f4f4f4"
  },
  text:{
    textAlign:'center',
    marginBottom: 10,
    color:'#E9DCD2',
    fontSize:20
  },
  loadtext:{
    color:'#E7C72A' ,
  }
});