import React from "react"
import {Text,View,SafeAreaView,StatusBar} from "react-native"
import {Button} from "react-native-paper"
const LandingScreen = ({navigation}) => {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#FA505E"/>
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
    <View style={{position:"absolute",bottom:0,width:"100%",backgroundColor:"#FA505E",borderTopLeftRadius:20,borderTopRightRadius:20}}>
      <Text style={{margin:10,
        fontSize:18,
        fontWeight:"bold",
        fontFamily:"serif",
        color:"white",
        padding:10
      }}>Please click on Continue to proceed further</Text>
      <Button
        onPress={()=>navigation.navigate("Image Screen")}
        mode="contained"
        labelStyle={{padding:5,color:"#861A28",fontFamily:"serif"}}
        style={{backgroundColor:"white",margin:10,borderRadius:10,alignSelf:"flex-end"}}
      >Continue</Button>
    </View>
    </SafeAreaView>
    </>
  )
}

export default LandingScreen;