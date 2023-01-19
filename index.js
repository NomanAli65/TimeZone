import { registerRootComponent } from 'expo';
import App from './App';
//import notifee, { AndroidStyle, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler((message)=>{
    console.log(message)
})
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
