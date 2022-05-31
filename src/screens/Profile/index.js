import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
    View,
} from "native-base";

const routeNames = [
    "My Account",
    "Order History",
    "Payment Methods",
    "Help",
]

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getIcon = (screenName) => {
        switch (screenName) {
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

    getScreenName = (screenName) => {
        switch (screenName) {
            case "Order History":
                return "OrderHistory";
            case "My Account":
                return "Profile";
            case "Help":
                return "Help";
            case "Payment Methods":
                return "Payments";
            default:
                return undefined;
        }
    };

    render() {
        return (
            <View flex={1} backgroundColor="white">
                <AppBar
                    title="Account"
                    noWish
                    noCart
                    noLeftIcon
                />
                <VStack space={10} p={3}>
                    <VStack alignItems={"center"} space={4}>
                        <Avatar
                            size="2xl"
                            source={require("../../../assets/user_place.png")}
                        />
                        <Heading>
                            User name
                        </Heading>
                    </VStack>
                    <VStack divider={<Divider />} space="4">
                        <VStack space="3">
                            {routeNames.map((name, index) => (
                                <Pressable
                                    px="5"
                                    py="3"
                                    rounded="md"
                                    bg={"transparent"}
                                    onPress={(event) => {
                                        this.props.navigation.navigate(this.getScreenName(name));
                                    }}
                                >
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color={
                                                "gray.500"
                                            }
                                            size="5"
                                            as={<MaterialIcons name={this.getIcon(name)} />}
                                        />
                                        <Text
                                            fontWeight="500"
                                            color={
                                                "gray.700"
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
            </View>
        );
    }
}
