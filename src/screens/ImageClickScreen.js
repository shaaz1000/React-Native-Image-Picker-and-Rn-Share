import React,{useState,useEffect} from "react"
import {Text,View,SafeAreaView,StatusBar,Image,PermissionsAndroid,ScrollView,Modal} from "react-native"
import {Button,TextInput} from "react-native-paper"
import ImagePicker from "react-native-image-crop-picker"
import RNFetchBlob from "rn-fetch-blob"
import CameraRoll from "@react-native-community/cameraroll"
import Share from 'react-native-share';
const ImageClickScreen = () => {
    const [ImageUri,setImageUri] = useState("")
    const [GetImagePath,setImagePath] = useState("")
    const [modal,setModal] = useState(false)
    const [Tags,setTags] = useState("")
    const CheckPermissions = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      } 
      const status = await PermissionsAndroid.request(permission);
      //console.log(status,"grant")
    }
    const ShareImage = () => {
        Share.open({url : GetImagePath,saveToFiles:true,message:Tags})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
    }
    useEffect(()=>{
       
        CheckPermissions()
    },[])
    
    const clickImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(({path,mime,modificationDate})=>{
            setImagePath(path)
            let newfile = {
                uri : path,
                type : mime,
                name : modificationDate
            }
            HandleImageUpload(newfile)
        })
        .catch(Err=>alert(Err))
    }
    const HandleImageUpload = (image) => {
        const data = new FormData()
        data.append("file",image)
        data.append('upload_preset',"SalesGrowAdmin")
        data.append('cloud_name',"salesgrow")

        fetch("https://api.cloudinary.com/v1_1/salesgrow/image/upload",{
            method : "post",
            body : data
        }).then(res=>res.json())
        .then(({url}) => {
            
            setImageUri(url)
            setModal(true)
            alert("Photo uploaded")
           
        }
        )
        .catch((err)=>alert(err))
    }
    const handleImageDownload = async () => {
        
        let Imagepath = ImageUri.split("/")
        const Images = Imagepath[Imagepath.length - 1]
        let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${Images}`
        RNFetchBlob.config({
          fileCache: true,
          //appendExt: 'png',
         // path,
          addAndroidDownloads:{
            useDownloadManager:true,
            notification:true,
            path
          }
        })
          .fetch('GET',`${ImageUri}`)
          .then((res) => {
            
            if (Platform.OS === "android" && !(CheckPermissions())) {
              return;
            }
            
            //setImageUri(res.path)
            //CameraRoll.save(res.path())
            CameraRoll.save(res.path())
              .then(res =>{
                  alert("Success","Image saved successfully")
                  console.log(res,"yes")
                })
              .catch(err => alert(err))
          })
          .catch(error => console.log(error,"yaha ka h"))
      
          
        }
    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor="#FA505E"/>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
           
        {
            ImageUri===""?<>
            <Text style={{marginTop:30,
            margin:20,
            padding:5,
            backgroundColor:"#F95356",
            fontFamily:"serif",
            fontWeight:"bold",
            borderRadius:20,
            color:"white"
        }}>Click on the button below to click an image from camera</Text>
            <Button 
            mode="contained"
            onPress={()=>clickImage()}
            icon="camera"
            labelStyle={{padding:5}}
            style={{backgroundColor:"#D22733",margin:10,marginHorizontal:20,alignSelf:"center"}}
        >Click Image from Camera</Button>
            </>
            :
            <>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{uri : ImageUri}}  style={{height:500,width:400,margin:10,borderRadius:20}}/>
            <Button 
            mode="contained"
            onPress={()=>handleImageDownload()}
            icon="arrow-down"
            labelStyle={{padding:5}}
            style={{backgroundColor:"#D22733",margin:10,marginHorizontal:20,alignSelf:"center"}}
        >Download Image</Button>
            <Button 
            mode="contained"
            onPress={()=>setModal(true)}
            icon="share-variant"
            labelStyle={{padding:5}}
            style={{backgroundColor:"#138740",margin:10,marginHorizontal:20,alignSelf:"center"}}
        >Share Image</Button>
            
        </ScrollView>
        </>
        }
        <Modal animationType="slide"
                    visible={modal}
                    transparent={false}
                    onRequestClose= {()=>{
                        setModal(false)
                    }}>
                    <View style={{margin:10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TextInput 
                            placeholder="tags"
                            label = "tags"
                            onChangeText={(tags)=>setTags(tags)}/>
                            <Image source={{uri:ImageUri}} style={{height:300,width:250,margin:10}}/>
                            <Button 
            icon="share-variant"
            mode="contained"
            onPress={()=>ShareImage()}
            icon="arrow-down"
            labelStyle={{padding:5}}
            style={{backgroundColor:"#0A95A6",margin:10,marginHorizontal:20,alignSelf:"center"}}
        >Share Image</Button>
        <Button 
            mode="contained"
            onPress={()=>handleImageDownload()}
            icon="arrow-down"
            labelStyle={{padding:5}}
            style={{backgroundColor:"#D22733",margin:10,marginHorizontal:20,alignSelf:"center"}}
        >Download Image</Button>
        </ScrollView>
                    </View>
                    </Modal>
        
        </SafeAreaView>
        </>
    )
}
export default ImageClickScreen;