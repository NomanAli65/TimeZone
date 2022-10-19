import { Button, Icon, View, VStack } from 'native-base';
import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { ResponseType } from 'expo-auth-session';
import { post } from '../../configs/AxiosConfig';
import axios from 'axios';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';

WebBrowser.maybeCompleteAuthSession();

function SocialSignin(props) {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        // iosClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        androidClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        webClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
    });

    useEffect(() => {
        Settings.setAppID('495885272460928');
        Settings.initializeSDK();
    }, [])

    const _GoogleSignin = async () => {
        let result = await promptAsync();
        if (result.authentication?.accessToken) {
            let userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: "Bearer " + result.authentication?.accessToken
                }
            })
            let { name, picture, email, } = userData?.data;
            alert(name + "\n" + picture + "\n" + email,)
        }
        else if (result.error)
            alert("Error occured. Please try again")
    }

    const _FacebookSignin = async () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    Profile.getCurrentProfile().then((prof) => {
                        alert(prof.email + "\n" + prof.name + "\n" + prof.imageURL);
                    })
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    return (
        <VStack>
            <Button
                onPress={_FacebookSignin}
                marginBottom={5} h="12" backgroundColor="#4267B2" leftIcon={<Icon as={Fontisto} name="facebook" size="4" />}>
                Facebook
            </Button>
            <Button
                onPress={_GoogleSignin}
                backgroundColor={"#DB4437"} h="12" leftIcon={<Icon as={AntDesign} name="google" size="4" />}>
                Google
            </Button>
        </VStack>
    );
}

export default SocialSignin;