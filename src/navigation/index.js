import React, { useEffect, useState } from 'react';
import { Alert, AlertDialog, Box, Button, CloseIcon, Text, HStack, IconButton, NativeBaseProvider, VStack, View } from 'native-base';
import { StyleSheet } from "react-native";
import theme from "../../src/configs/Theme";
import config from "../../src/configs/NBconfig";
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import BottomNav from "./BottomNavigation";
import { AlertTypes } from '../redux/ActionTypes/AlertActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";
import AuthAction from '../redux/Actions/AuthActions';
import * as SplashScreen from 'expo-splash-screen';

export default function Navigation() {
  const showAlert = useSelector((state) => state.Alert.showAlert)
  const alertOptions = useSelector((state) => state.Alert.alertOptions)
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();


  const LoginIfRegistered = async () => {
    try {
      let result = await AsyncStorage.getItem("@TZ-USER");
      if (result) {
        let user = JSON.parse(result);
        dispatch(AuthAction.Login(user))
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
      else {
        console.warn("red")
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
      console.warn(error)
    }
  }

  useEffect(() => {
    LoginIfRegistered();
    registerForPushNotificationsAsync();
  }, [])

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch({ type: AlertTypes.HIDE_ALERT })
      }, 2000)
    }
  }, [showAlert])

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    };
  }



  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        {
          appIsReady ?
            <BottomNav />
            : null
        }
        {/* <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={alertOptions?.title}
          message={alertOptions.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#000"
          onConfirmPressed={() => {
            dispatch({type:AlertTypes.HIDE_ALERT})
          }}
        /> */}
        {
          showAlert ?
            <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Alert variant={"subtle"} w="96%" status={alertOptions?.status ? alertOptions.status : "success"} backgroundColor="primary.100" position={"absolute"} bottom={60} borderRadius={10} alignSelf="center">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                  <Alert.Icon color={"black"} size="md" />
                  <Text fontSize="md" fontWeight="medium" color={"white"}>
                    {alertOptions?.title}
                  </Text>

                  <Box _text={{
                    textAlign: "center",
                    color: "white"
                  }}>
                    {alertOptions?.message}
                  </Box>
                </VStack>
              </Alert>
            </View>
            : null}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
