import * as React from "react";
import {
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons,MaterialIcons } from "@expo/vector-icons";
import {
    Box,
    Pressable,
    Heading,
    VStack,
    Text,
    HStack,
    Divider,
    Icon,
    Avatar,
} from "native-base";
import { useSelector } from "react-redux";

const getIcon = (screenName) => {
    switch (screenName) {
        case "Home":
            return "home";
        case "Order History":
            return "shopping-cart";
        case "My Account":
            return "person";
        case "Help":
            return "help";
        case "Payment Methods":
            return "payment";
        default:
            return undefined;
    }
};

export default function CustomDrawerContent(props) {

    const user = useSelector((state) => state.Auth.user);

    return (
        <DrawerContentScrollView {...props}>
            <VStack space="6" mt={-1}>
                <Box px="5" bg={{
                    linearGradient: {
                        colors: [ "#414141", "#000000"],
                        start: [0, 0],
                        end: [1, 0]
                    }
                }} h={150} justifyContent="center">
                    <HStack space={5} alignItems="center">
                        <Avatar size={"xl"} source={require("../../assets/user_place.png")} />
                        <VStack>
                            <Heading color="white">
                                {user?.name ? user.name : "Welcome"}
                            </Heading>
                            <Pressable>
                                <Text mt="1" color="gray.300" fontWeight="500">
                                    {user?.email ? user?.email : "Login/Signup"}
                                </Text>
                            </Pressable>
                        </VStack>
                    </HStack>
                </Box>
                <VStack divider={<Divider />} space="4">
                    <VStack space="3">
                        {props.state.routeNames.map((name, index) => (
                            <Pressable
                                px="5"
                                py="3"
                                rounded="md"
                                bg={
                                    index === props.state.index
                                        ? "#eee"
                                        : "transparent"
                                }
                                onPress={(event) => {
                                    props.navigation.navigate(name);
                                }}
                            >
                                <HStack space="7" alignItems="center">
                                    <Icon
                                        color={
                                            index === props.state.index ? "primary.500" : "gray.500"
                                        }
                                        size="5"
                                        as={<MaterialIcons name={getIcon(name)} />}
                                    />
                                    <Text
                                        fontWeight="500"
                                        color={
                                            index === props.state.index ? "primary.500" : "gray.700"
                                        }
                                    >
                                        {name}
                                    </Text>
                                </HStack>
                            </Pressable>
                        ))}
                    </VStack>
                    <VStack space="5">
                        <Pressable px="5" py="3">
                            <HStack space="7" alignItems="center">
                                <Icon
                                    color="gray.500"
                                    size="5"
                                    as={<MaterialCommunityIcons name="logout" />}
                                />
                                <Text fontWeight="500" color="gray.700">
                                    Logout
                                </Text>
                            </HStack>
                        </Pressable>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView>
    );
}
