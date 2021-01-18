import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View ,ScrollView,} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyHeader from './MyHeader';
import {Card, List, Button, Searchbar} from 'react-native-paper';


export default class App extends React.Component {
  state={
    text:'',
    cities:[] 
  }; 

   _goBack = () => console.log('Went back');

  async Buttonclick(){
    this.props.navigation.navigate('Current City',{city:this.state.text})
    await AsyncStorage.setItem("mycity",this.state.text)

  }

  async Listclick(city){
    this.setState({
      text: city.toString(),
      
    })
       await AsyncStorage.setItem("mycity",city.toString())    
       this.props.navigation.navigate('Current City',{city:city.toString()})

  }

  fetchcities(text){
  this.setState({text})
  
  fetch(`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`)
  .then(data=>data.json())
  .then(city=>{
    this.setState({ 
      cities:city.location.address
    })
  })
}

  render(){
    RenderCity = <Card style={{margin:5}}><List.Item title="No Cities"/></Card>

     if (this.state.text.length > 0) {
      RenderCity = this.state.cities.map(city =>{
        return(
        <Card style={{margin:3}} key={city} onPress={()=>this.Listclick(city.split(",", 2))}>
          <List.Item title={city}></List.Item>
        </Card>
        )
      })
     }
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MyHeader  title="Select City"/>
            <Searchbar
              style={{margin:5,height:55}}
              placeholder="Search City"
              onChangeText={text => this.fetchcities(text)}
              value={this.state.text}
            />
          <Button icon="content-save-settings" mode="contained" onPress={() => this.Buttonclick()} style={{margin:5}}>
            Save Changes
          </Button>
        <ScrollView>{RenderCity}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f4f4f4"
  },
});