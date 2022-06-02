import "react-native-gesture-handler"
import React, { useEffect, useState } from 'react';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";
import Navigation from "./src/navigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);


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
        <Navigation/>
      </Provider>
    </SafeAreaView>
  );
}
