import { Button, Icon, View, VStack } from 'native-base';
import React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

function SocialSignin(props) {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        // iosClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        //  androidClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        webClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
    });

    const [requestFb, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: '<YOUR FBID>',
        responseType: ResponseType.Code,
    });

    const _GoogleSignin = () => {
        // if (response.type == "success")
        promptAsync();
        // else
        //     alert(response.error)
    }

    const _FacebookSignin = () => {
        // if (response.type == "success")
        promptAsyncFB();
        // else
        //     alert(response.error)
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