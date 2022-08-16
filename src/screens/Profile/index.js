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
import { connect } from 'react-redux';
import { img_url } from '../../configs/APIs';
import AlertAction from '../../redux/Actions/AlertActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTypes } from '../../redux/ActionTypes/AuthTypes';

const routeNames = [
    "My Account",
    "Order History",
    "Payment Methods",
    "Help",
]

class index extends Component {
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

    onLogout = async () => {
        await AsyncStorage.removeItem("@TZ-USER");
        this.props.Logout();
    }

    render() {
        return (
            <View flex={1} _dark={{ backgroundColor: "black" }}>
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
                            source={this.props.user?.user?.profile_pic ? { uri: img_url + this.props.user?.user?.profile_pic } : require("../../../assets/user_place.png")}
                        />
                        <Heading>
                            {this.props.user?.user?.name}
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
                                        if (this.props.user?.user)
                                            this.props.navigation.navigate(this.getScreenName(name));
                                        else
                                            this.props.navigation.navigate("Login");
                                        // this.props.showAlert({
                                        //     title: "Warning",
                                        //     message: "Please login to continue",
                                        //     status: "error"
                                        // })
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
                                            _dark={{
                                                color: "gray.400"
                                            }}
                                        >
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                            ))}
                        </VStack>
                        {
                            this.props.user?.user ?
                                <VStack space="5">
                                    <Pressable px="5" py="3" onPress={()=>this.onLogout()}>
                                        <HStack space="7" alignItems="center">
                                            <Icon
                                                color="gray.500"
                                                size="5"
                                                as={<MaterialCommunityIcons name="logout" />}
                                            />
                                            <Text
                                                _dark={{
                                                    color: "gray.400"
                                                }}
                                                fontWeight="500"
                                                color="gray.700">
                                                Logout
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                </VStack>
                                : <VStack space="5">
                                    <Pressable onPress={() => this.props.navigation.navigate("Login")} px="5" py="3">
                                        <HStack space="7" alignItems="center">
                                            <Icon
                                                color="gray.500"
                                                size="5"
                                                as={<MaterialCommunityIcons name="logout" />}
                                            />
                                            <Text
                                                _dark={{
                                                    color: "gray.400"
                                                }}
                                                fontWeight="500"
                                                color="gray.700">
                                                Login
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                </VStack>
                        }
                    </VStack>
                </VStack>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    showAlert: data => dispatch(AlertAction.ShowAlert(data)),
    Logout: () => dispatch({ type: AuthTypes.LOGOUT })
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
