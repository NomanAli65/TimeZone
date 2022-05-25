import React from "react";
import { Box, Center, HStack, Icon, IconButton, StatusBar, Text } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";


export default function AppBar({ title, back, noWish, noCart, edit, noLeftIcon, OnPressDrawerOrBack, OnPressCart, OnPressWish }) {

    const navigation = useNavigation();
    const isLogin = useSelector((state) => state.Auth.isLogin)

    return <>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        {/* <Box
            safeAreaTop={false}
            bg={{
                linearGradient: {
                    colors: ["#5c5c5c", "#414141", "#000000"],//["#dac787", "#cab876", "#bba866", "#ac9956"],
                    start: [0, 0],
                    end: [1, 0]
                }
            }}
        > */}
        <HStack bg="black" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
            <HStack>
                {
                    noLeftIcon ?
                    <Box p={5} /> :
                        back ?
                            <IconButton
                                onPress={() => navigation.goBack()}
                                icon={<Icon size="sm" as={MaterialIcons} name="chevron-left" color="white" />} />
                            :
                            <IconButton
                                onPress={() => navigation.toggleDrawer()}
                                icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
                }
                {noWish || noCart ?
                    null :
                    <Icon size="sm" as={MaterialIcons} name="menu" color="#414141" p={5} />
                }
            </HStack>
            <Text color="white" fontSize="20" fontWeight="bold" textAlign={"center"}>
                {title}
            </Text>
            <HStack>
                {noWish ?
                    null :
                    <IconButton
                        onPress={() => navigation.navigate(isLogin ? "Wishlist" : "Login")}
                        icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
                }
                {noCart ?
                    null :
                    <IconButton
                        onPress={() => navigation.navigate(isLogin ? "Cart" : "Login")}
                        icon={<Icon as={MaterialIcons} name="shopping-cart" size="sm" color="white" />} />
                }
                {edit ?
                    <IconButton
                        onPress={() => navigation.navigate("EditProfile")}
                        icon={<Icon as={MaterialCommunityIcons} name="account-edit" size="sm" color="white" />} />
                    : null
                }
                {noWish && noCart && !edit ?
                    <Box p={5} /> :
                    null
                }

            </HStack>
        </HStack>
        {/* </Box> */}
    </>;
}