import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Linking} from 'react-native'
import { Button } from 'native-base'
import { task_register } from '../api'
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Icon } from 'react-native-elements';
import openMap from 'react-native-open-maps';
import getDirections from 'react-native-google-maps-directions'




class DetailsScreen extends Component {

  static navigationOptions = () => ({
    title: 'وين ناكل',
    headerStyle: {
      backgroundColor: '#0A4E5F'
    },
    headerTintColor: 'white',
    headerRight: <Icon name="menu" size={34} color='#fff' iconStyle={{ marginRight: 15 }}
    />
  })


  state = {
    lati: '',
    long: '',
    lat:'',
    lon:'',
    name:'',
    rate:'',
    cat:''
  }

 componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position)
              const longitude = position.coords.longitude
              const latitude = position.coords.latitude
              this.setState({ long: longitude, lati: latitude });
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

  async onButtonPressed() {
    const { lati, long } = this.state
    const result = await task_register(parseFloat(lati), parseFloat(long))
      this.setState ({
        lat: parseFloat(result.lat) || parseFloat(this.state.lati),
        lon: parseFloat(result.lon)  || parseFloat(this.state.long),
        name: result.name,
        rate: result.rating,
        cat: result.cat
    },
    () => {
      this.mapView.fitToCoordinates([{
        longitude: parseFloat(this.state.lon) || parseFloat(this.state.long),
        latitude: parseFloat(this.state.lat) || parseFloat(this.state.lati),
    }], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
    })
    }
    
    )
    console.log(this.state)   
  }

    handleGetDirections = async () => {
    const result = await task_register(parseFloat(lati), parseFloat(long))
    const { lati, long } = this.state
    const data = {
      destination: {
        latitude: parseFloat(result.lat) || parseFloat(this.state.lat) ||  parseFloat(this.state.lati),
        longitude: parseFloat(result.lon) ||  parseFloat(this.state.lon)|| parseFloat(this.state.long)
      },
      params: [
        {
          key: "travelmode",
          value: "driving"     
        },
      ]
    }
 
    getDirections(data)
  }
  

  render() {
    const { result, lati, long} = this.props.navigation.state.params;
    console.log( result, lati, long)
    return (
      <View style={styles.container}>
      
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          ref= {ref => this.mapView = ref}
          initialRegion={{
            latitude: parseFloat(this.state.lat) || parseFloat(result.lat) || parseFloat(this.state.lati) ,
            longitude: parseFloat(this.state.lon)|| parseFloat(result.lon) || parseFloat(this.state.long) ,
            latitudeDelta: 0.0070,
            longitudeDelta: Dimensions.get("window").width/Dimensions.get("window").height * 0.0070 
          }}
        >
        <MapView.Marker 
        coordinate ={{
          latitude: parseFloat(this.state.lat) || parseFloat(result.lat) || parseFloat(this.state.lati), 
          longitude: parseFloat(this.state.lon)|| parseFloat(result.lon) || parseFloat(this.state.long)
          }}/>
        </MapView>
        <Callout style={styles.callout}>
          <View style={styles.textsContainerStyle}>
            <Text style={styles.nameStyle}>{this.state.name || result.name}</Text>
            <View style={styles.textsViewStyle}>
              <View style={{flexDirection:'row', marginRight: 30}}>
                <Text style={styles.rateTextStyle}>{this.state.rate || result.rate}</Text>
                <Text style={styles.rateTextStyle}>-10</Text>
              </View>
              <Text style={styles.textStyle}>{this.state.cat || result.cat}</Text>
            </View>
          </View>

        </Callout>
        <View style={styles.DIRView}>
        <TouchableOpacity  style={{ marginBottom: 55 }}
          onPress={this.handleGetDirections}
        >
              <Icon name="directions" size={64} color='rgba(10,78,95,0.6)'/>  
          </TouchableOpacity>
        </View>
        <View style={styles.buttonView}>
            <Button bordered light
              style={styles.button}
              onPress={this.onButtonPressed.bind(this)}>
              <Text style={styles.buttonText}>اقتراح اخر</Text>
            </Button>
          </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: null,
    height: '100%'
  },
  callout: {
    width: '100%'
  },
  textsContainerStyle: {
    padding: 40,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  nameStyle: {
    color: '#0A4E5F',
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center'
  },
  textsViewStyle: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center'
  },
  rateTextStyle:{
    fontSize: 20,
    color: '#0A4E5F'
  },
  buttonView: {
    marginVertical: '140%',
    marginHorizontal: '20%',
    position:'absolute',
    flexDirection: 'column'
  },
  button: {
    width: 200,
    backgroundColor: 'rgba(10,78,95,0.6)',
    borderRadius: 8,
    margin: 5
  },
  buttonText: {
    textAlign: 'center',
    flex: 1,
    color: '#fff',
    fontSize: 20
  },
  DIRView:{
    flex:1, 
    position:'absolute',
    alignSelf:'center',
    marginVertical:420,

  }
});



export default DetailsScreen