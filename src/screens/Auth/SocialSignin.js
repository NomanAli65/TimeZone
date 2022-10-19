import { Button, Icon, View, VStack } from 'native-base';
import React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { ResponseType } from 'expo-auth-session';
import { post } from '../../configs/AxiosConfig';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

function SocialSignin(props) {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        // iosClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        androidClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        webClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
    });

    const [requestFb, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: 'cf69f8b1c92383d4061c57db76f48d32',
        responseType: ResponseType.Code,
    });

    const _GoogleSignin = async () => {
        let result = await promptAsync();
        if (result.authentication?.accessToken) {
            let userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: "Bearer " + result.authentication?.accessToken
                }
            })
            let { name, picture, email, } = userData?.data;
            console.warn(name, picture, email,)
        }
        else if (result.error)
            alert("Error occured. Please try again")
    }

    const _FacebookSignin = async () => {
        let result = await promptAsyncFB();
        console.warn(result.error)
        if (result.authentication?.accessToken) {
            console.warn("ok")
            // let userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            //     headers: {
            //         Authorization: "Bearer " + result.authentication?.accessToken
            //     }
            // })
            // let { name, picture, email, } = userData?.data;
            // console.warn(name, picture, email,)
        }
        else if (result.error)
            alert("Error occured. Please try again")
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