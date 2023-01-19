import React, { useEffect, useState } from 'react';
import { Alert, AlertDialog, Box, Button, CloseIcon, Text, HStack, IconButton, NativeBaseProvider, VStack, View, Heading } from 'native-base';
import { Image, Modal, StyleSheet } from "react-native";
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
import notifee, { AndroidStyle } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: false,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function Navigation() {
  const showAlert = useSelector((state) => state.Alert.showAlert)
  const alertOptions = useSelector((state) => state.Alert.alertOptions)
  const [appIsReady, setAppIsReady] = useState(false);
  const [hideSplash, setHideSplash] = useState(false);
  const dispatch = useDispatch();

  const LoginIfRegistered = async () => {
    try {
      let result = await AsyncStorage.getItem("@TZ-USER");
      if (result) {
        let user = JSON.parse(result);
        dispatch(AuthAction.Login(user))
        setAppIsReady(true);
        setTimeout(async () => {
          setHideSplash(true)
          //await SplashScreen.hideAsync();
        }, 6000)
      }
      else {
        console.warn("red")
        setAppIsReady(true);
        setTimeout(async () => {
          setHideSplash(true)
          // await SplashScreen.hideAsync();
        }, 6000)
      }
    } catch (error) {
      setAppIsReady(true);
      setTimeout(async () => {
        setHideSplash(true)
        // await SplashScreen.hideAsync();
      }, 6000)
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
    if (Platform.OS === 'ios') {
      // const { status: existingStatus } = await Notifications.getPermissionsAsync();
      // let finalStatus = existingStatus;
      // if (existingStatus !== 'granted') {
      //   const { status } = await Notifications.requestPermissionsAsync();
      //   finalStatus = status;
      // }
      // if (finalStatus !== 'granted') {
      //   alert('Failed to get push token for push notification!');
      //   return;
      // }
      messaging().registerDeviceForRemoteMessages();
      await notifee.requestPermission()

    }
    if (Platform.OS === 'android') {
      // Notifications.setNotificationChannelAsync('default', {
      //   name: 'default',
      //   importance: Notifications.AndroidImportance.MAX,
      //   vibrationPattern: [0, 250, 250, 250],
      //   lightColor: '#FF231F7C',
      // });
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    };
    messaging().onMessage(async remoteMessage => {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        body: remoteMessage.notification.body,
        data: remoteMessage.data,
        android: {
          channelId: "default",
          pressAction: {
            id: 'default',
            launchActivity: "default"
          },
          style:{type:AndroidStyle.BIGPICTURE,picture:remoteMessage.notification.android.imageUrl}
        },
        ios: {

        }
      });
    });
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        {
          appIsReady ?
            <BottomNav />
            : null
        }
        <Modal visible={!hideSplash}>
          <View position={"absolute"} top={0} left={0} right={0} bottom={0} backgroundColor="#000">
            <Image source={require("../../assets/tz_logo_gif.gif")} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
          </View>
        </Modal>
        {
          showAlert ?
            <View style={{ ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.2)" }}>
              <Alert variant={"subtle"} w="96%" status={alertOptions?.status ? alertOptions.status : "success"} backgroundColor="primary.100" position={"absolute"} bottom={60} borderRadius={10} alignSelf="center">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                  <Alert.Icon color={"black"} size="md" />
                  <Heading fontSize="md" color={"white"}>
                    {alertOptions?.title}
                  </Heading>

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
