import { Button, Icon, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { makeRedirectUri, ResponseType } from 'expo-auth-session';
import axios from 'axios';
import * as Notifications from "expo-notifications";
import { useDispatch } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import { useNavigation } from '@react-navigation/native';
import AlertAction from '../../redux/Actions/AlertActions';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, Linking } from 'react-native';
import jwt_decode from 'jwt-decode';
import { get, post } from '../../configs/AxiosConfig';
import { APIs, base_url } from '../../configs/APIs';

WebBrowser.maybeCompleteAuthSession();

function SocialSignin(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState();
    const [fbLoading, setFBLoading] = useState();
    const [appleLoading, setAppleLoading] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Platform.OS == "android" ? "230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com" : "230281440299-ak3v140kogbqio4jcp1r2fulcandsk3v.apps.googleusercontent.com",
        expoClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        iosClientId: '230281440299-ak3v140kogbqio4jcp1r2fulcandsk3v.apps.googleusercontent.com',
        androidClientId: '230281440299-gh9fhva6sopi9nn9i8dv23h4vbeafpjr.apps.googleusercontent.com',
        webClientId: '230281440299-n913skplf8in3pb0lnsou2vc9spt0pou.apps.googleusercontent.com',
        selectAccount: true,
        extraParams: {
            access_type: "offline"
        },
        responseType: "code",
        // redirectUri: makeRedirectUri({
        //     scheme: "timezone"
        // }),
    }, {
    });

    const [requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: "495885272460928",
        responseType: ResponseType.Token,
        scopes: ["email", "public_profile"],
        redirectUri: makeRedirectUri({
            ...Platform.OS == "ios" ? {
                scheme: "timezone",
                native: "fb495885272460928://authorize",
            } : {}
            ,
            useProxy: Platform.OS == "android"
        })
    }, {
        ...Platform.OS == "ios" ? {
            scheme: "timezone",
            native: "fb495885272460928://authorize",
        } : {}
        ,
        useProxy: Platform.OS == "android"
    });

    const _GoogleSignin = async () => {
        try {
            WebBrowser.openAuthSessionAsync(base_url + APIs.GoogleSignin);
            // let userData = await get(APIs.GoogleSignin)
            // console.warn(userData)
            // console.warn(base_url + APIs.GoogleSignin)
            //     let result = await promptAsync();
            //     console.warn(result.params)
            //     return;
            //     if (result.params?.code) {
            //         setLoading(true)
            //         let userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            //             headers: {
            //                 Authorization: "Bearer " + result.params?.code
            //             }
            //         })
            //         let { name, picture, email, } = userData?.data;

            //     }
            //     else if (result.error) {
            //         setLoading(false)
            //         alert("Error occured. Please try again")
            //     }
        } catch (error) {
            setLoading(false)
            alert("Error occured")
        }
    }

    const _FacebookSignin = async () => {
        try {
            let result = await promptAsyncFB();
            if (result.params?.access_token) {
                setFBLoading(true)
                let userData = await axios.get("https://graph.facebook.com/v15.0/me?fields=email,name&access_token=" + result.params?.access_token)
                let { name, email, id } = userData?.data;
                if (!email) {
                    dispatch(AlertAction.ShowAlert({
                        message: "Cannot access email address of your facebook account. Please give the access and try again"
                    }))
                    setFBLoading(false)
                    return;
                }
                let userPic = await axios.get("https://graph.facebook.com/v15.0/" + id + "/picture?redirect=falseheight=500&width=500&type=large")
                let pic = userPic?.data?.data?.url;
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
                    pic,
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

    const _AppleSignin = async () => {
        try {
            setAppleLoading(true);
            const result = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL, AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
            })
            const { email } = jwt_decode(result.identityToken)
            if (result?.email || email) {
                let apple_name = email ? email.split("@")[0] : "No username";
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                dispatch(AuthMiddleware.SocialSignin({
                    onSuccess: (success, msg) => {
                        setAppleLoading(false)
                        if (!success)
                            return;
                        navigation.navigate("Dashboard")
                    },
                    name: result.fullName.familyName && result.fullName.familyName != undefined ? result.fullName.familyName : apple_name,
                    email: result.email ? result.email : email,
                    pic: "",
                    token
                }))
            }
            else if (result.error) {
                setAppleLoading(false)
                alert(JSON.stringify(result.error))
            }
            else
                setAppleLoading(false)
        } catch (error) {
            setAppleLoading(false)
            alert("Apple signin not supported")
        }
    }

    return (
        <VStack space={5}>
            <Button
                disabled={fbLoading}
                onPress={_FacebookSignin}
                isLoading={fbLoading}
                isLoadingText="Signing in"
                h="12" backgroundColor="#4267B2" leftIcon={<Icon as={Fontisto} name="facebook" size="4" />}>
                Sign in with Facebook
            </Button>
            <Button
                disabled={props?.loading}
                onPress={_GoogleSignin}
                isLoading={props?.loading}
                isLoadingText="Signing in"
                backgroundColor={"#DB4437"} h="12" leftIcon={<Icon as={AntDesign} name="google" size="4" />}>
                Sign in with Google
            </Button>
            {
                Platform.OS == "ios" ?
                    <Button
                        disabled={appleLoading}
                        onPress={_AppleSignin}
                        isLoading={appleLoading}
                        isLoadingText="Signing in"
                        backgroundColor={"#555555"} h="12" leftIcon={<Icon as={AntDesign} name="apple1" size="4" />}>
                        Sign in with Apple
                    </Button>
                    : null
            }
        </VStack>
    );
}

export default SocialSignin;