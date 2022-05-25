import "react-native-gesture-handler"
import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { AlertDialog, Button, Drawer, NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from "./src/configs/Theme";
import config from "./src/configs/NBconfig";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './src/navigation/DrawerNav';
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import BottomNav from "./src/navigation/BottomNavigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  let fontsLoaded = useFonts({
    'TextaAltBlack': require("./assets/fonts/TextaAltBlack.ttf"),
    'TextaAltBold': require("./assets/fonts/TextaAltBold.ttf"),
    'TextaAltBook': require("./assets/fonts/TextaAltBook.ttf"),
    'TextaAltHeavy': require("./assets/fonts/TextaAltHeavy.ttf"),
    'TextaAltLight': require("./assets/fonts/TextaAltLight.ttf"),
    'TextaAltMedium': require("./assets/fonts/TextaAltMedium.ttf"),
    'TextaAltRegular': require("./assets/fonts/TextaAltRegular.ttf"),
    'TextaAltThin': require("./assets/fonts/TextaAltThin.ttf"),
  })


  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded[0]) {
        await SplashScreen.hideAsync()
        setAppIsReady(true)
      }
    }
    prepare();
  }, [fontsLoaded[0], appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
          <NavigationContainer>
            <NativeBaseProvider theme={theme} config={config}>
              <BottomNav />
            </NativeBaseProvider>
          </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
{/* <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Error Loading Font</AlertDialog.Header>
            <AlertDialog.Body>
              Please see the code to fix it
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={onClose}>
                  OK
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog> */}
