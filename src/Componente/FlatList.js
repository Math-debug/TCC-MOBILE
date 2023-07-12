import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native'
import { withNavigation } from 'react-navigation';

export default function renderItem(item, navigation, nextpage, idsave){
    return(
        <View style = {style.container}>
            <TouchableOpacity style = {style.buttom} 
            onPress= {async()=>{
                var data = {
                    id: item.id,
                    title: item.title
                }
                await AsyncStorage.setItem(
                    '@'+idsave,
                    JSON.stringify(data)
                )
                navigation.navigate(nextpage, {
                    keyname: item.title
                })
            }}
            >
            <Text style={style.texto}> {item.id} - {item.title} </Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "98%",
    },
    texto: {
        color:"white",
        fontSize: 18,
        justifyContent: "center",
        padding: 5
    },
    buttom:{
        backgroundColor: '#006525',
        width: "98%",
        height: 55,
        alignItems: 'baseline',
        justifyContent: 'center',
        borderRadius: 7
    }
})