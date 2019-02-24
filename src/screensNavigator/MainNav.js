import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from '../component/HomeScreen'
import DetailsScreen from '../component/DetailsScreen'


const MainNav = createStackNavigator({
    Home:{
        screen: HomeScreen
    },
    Details:{
        screen: DetailsScreen,
        
    }
})

export default createAppContainer(MainNav)