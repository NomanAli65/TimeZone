import React, { useEffect, useState } from 'react';
import { Alert, AlertDialog, Box, Button, CloseIcon, Text, HStack, IconButton, NativeBaseProvider, VStack, View } from 'native-base';
import { StyleSheet } from "react-native";
import theme from "../../src/configs/Theme";
import config from "../../src/configs/NBconfig";
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import BottomNav from "./BottomNavigation";
import { AlertTypes } from '../redux/ActionTypes/AlertActions';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Navigation() {
  const showAlert = useSelector((state) => state.Alert.showAlert)
  const alertOptions = useSelector((state) => state.Alert.alertOptions)
  const dispatch=useDispatch();

  useEffect(()=>{
    if(showAlert)
    {
      setTimeout(()=>{
        dispatch({type:AlertTypes.HIDE_ALERT})
      },2000)
    }
  },[showAlert])

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        <BottomNav />
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
          <View style={{...StyleSheet.absoluteFill,backgroundColor:"rgba(0,0,0,0.2)"}}>
            <Alert variant={"subtle"} w="96%" status={alertOptions?.status?alertOptions.status:"success"} position={"absolute"} bottom={60} borderRadius={10} alignSelf="center">
              <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                <Alert.Icon size="md" />
                <Text fontSize="md" fontWeight="medium">
                  {alertOptions?.title}
                </Text>

                <Box _text={{
                  textAlign: "center"
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
