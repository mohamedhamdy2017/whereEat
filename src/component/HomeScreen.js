import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import { task_register } from '../api'
import { Button } from 'native-base'


export default class HomeScreen extends Component {
    static navigationOptions={
        header: null
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(postion=>{
           console.log(postion.coords.latitude)
             
            // postion.coords.longitude
        })
       // this.onButtonPressed()
    }
    

    async onButtonPressed (){
        const result = await task_register()
        this.props.navigation.navigate('Details',{result})
        console.log(result)
    }

    

    render() {
        return (
            <ImageBackground
                source={require('../images/back.jpg')}
                style={{ flex: 1, width: null, height:'100%' }}
            >
                <View style={[styles.container, { backgroundColor: 'rgba(10,78,95,0.9)' }]}>

                    <StatusBar backgroundColor='#0A4E5F' />
                    <Image
                        source={require('../images/logo.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>وين ناكل؟</Text>
                    <View style={styles.buttonView}>
                        <Button bordered light
                            style={styles.button}
                            onPress={this.onButtonPressed.bind(this)}
                        >
                            <Text style={{ textAlign: 'center', flex: 1, color: '#3c8994', fontSize: 20 }}>اقترح</Text>
                        </Button>
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3c8994',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30
    },
    text: {
        color: '#ebf9fb',
        fontSize: 55,
        marginBottom: 40
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 200,
        backgroundColor: '#ebf9fb',
        borderRadius: 8
    }
});
