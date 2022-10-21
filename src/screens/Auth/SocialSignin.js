import { Button, Icon, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import { post } from '../../configs/AxiosConfig';
import axios from 'axios';
import * as Notifications from "expo-notifications";
import { useDispatch } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

function SocialSignin(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState();
    const [fbLoading, setFBLoading] = useState();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        // iosClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        androidClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        webClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        redirectUri: makeRedirectUri({
            scheme: "timezone",
            //useProxy: true
        })
    }, {
        scheme: "timezone",
       // useProxy: true
    });
    
    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: "495885272460928",
        responseType: ResponseType.Token,
        redirectUri: makeRedirectUri({
            scheme: "timezone",
            useProxy: true
        })
    }, {
        scheme: "timezone",
        useProxy: true
    });

    const _GoogleSignin = async () => {
        try {
            let result = await promptAsync({
              //  useProxy: true
            });
            if (result.authentication?.accessToken) {
                setLoading(true)
                let userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: "Bearer " + result.authentication?.accessToken
                    }
                })
                let { name, picture, email, } = userData?.data;
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                dispatch(AuthMiddleware.SocialSignin({
                    onSuccess: (success, msg) => {
                        setLoading(false)
                        if (!success)
                            return;
                        navigation.navigate("Dashboard")
                    },
                    name,
                    email,
                    pic: picture,
                    token
                }))
            }
            else if (result.error) {
                setLoading(false)
                alert("Error occured. Please try again")
            }
        } catch (error) {
            setLoading(false)
            alert("Error occured")
        }
    }

    const _FacebookSignin = async () => {
        try {
            let result = await promptAsyncFB({
                useProxy: true
            });
            if (result.params?.access_token) {
                console.warn()
                setFBLoading(true)
                let userData = await axios.get("https://graph.facebook.com/v15.0/me?fields=email,name&access_token=" + result.params?.access_token)
                let { name, email, } = userData?.data;
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                dispatch(AuthMiddleware.SocialSignin({
                    onSuccess: (success, msg) => {
                        setFBLoading(false)
                        if (!success)
                            return;
                        navigation.navigate("Dashboard")
                    },
                    name,
                    email,
                    token
                }))
            }
            else if (result.error) {
                setFBLoading(false)
                alert("Error occured. Please try again")
            }
        } catch (error) {
            console.warn(error)
            setFBLoading(false)
            alert("Error occured")
        }
    }

    return (
        <VStack>
            <Button
                disabled={fbLoading}
                onPress={_FacebookSignin}
                isLoading={fbLoading}
                isLoadingText="Signing in"
                marginBottom={5} h="12" backgroundColor="#4267B2" leftIcon={<Icon as={Fontisto} name="facebook" size="4" />}>
                Facebook
            </Button>
            <Button
                disabled={loading}
                onPress={_GoogleSignin}
                isLoading={loading}
                isLoadingText="Signing in"
                backgroundColor={"#DB4437"} h="12" leftIcon={<Icon as={AntDesign} name="google" size="4" />}>
                Google
            </Button>
        </VStack>
    );
}

export default SocialSignin;