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
    ScrollView,
    AlertDialog,
    Button,
    Spinner,
} from "native-base";
import { connect } from 'react-redux';
import { img_url } from '../../configs/APIs';
import AlertAction from '../../redux/Actions/AlertActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTypes } from '../../redux/ActionTypes/AuthTypes';
import { ProductTypes } from '../../redux/ActionTypes/ProductTypes';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

const routeNames = [
    "My Account",
    "Order History",
    "Payment Methods",
    "Contact Us",
    "Terms & Conditions",
    "Privacy Policy",
    "Help",
]

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            deleting: false
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
            case "Terms & Conditions":
                return "content-paste";
            case "Privacy Policy":
                return "privacy-tip";
            case "Contact Us":
                return "contact-support";
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
            case "Terms & Conditions":
                return "TermsAndCondition";
            case "Privacy Policy":
                return "PrivacyPolicy";
            case "Contact Us":
                return "ContactUs";
            default:
                return undefined;
        }
    };

    onLogout = async () => {
        await AsyncStorage.removeItem("@TZ-USER");
        this.props.Logout();
    }

    DeleteAccount = () => {
        this.setState({ deleting: true })
        this.props.deleteAccount({
            onSuccess: (status) => {
                this.setState({ deleting: false })
                if (status)
                    this.onLogout();
                else
                    this.props.showAlert({ message: "Couldn't delete your account please try again." })
            }
        });
    }

    render() {
        console.warn(this.props.user)
        return (
            <View flex={1} _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title="Account"
                    noWish
                    noCart
                    noLeftIcon
                />
                <ScrollView>
                    <VStack space={10} p={3}>
                        <VStack alignItems={"center"} space={4}>
                            <Avatar
                                size="2xl"
                                source={this.props.user?.user?.profile_pic ? { uri: this.props.user?.user?.profile_pic.startsWith("http") ? this.props.user?.user?.profile_pic : img_url + this.props.user?.user?.profile_pic } : require("../../../assets/user_place.png")}
                            />
                            <Heading>
                                {this.props.user?.user?.name ? this.props.user?.user?.name : "Login"}
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
                                            if (name == "Terms & Conditions" || name == "Privacy Policy") {
                                                this.props.navigation.navigate(this.getScreenName(name));
                                                return;
                                            }
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
                            <VStack>
                                {
                                    this.props.user?.user ?
                                        <VStack space="5">
                                            <Pressable px="5" py="3" onPress={() => this.setState({ isOpen: true })}>
                                                <HStack space="7" alignItems="center">
                                                    <Icon
                                                        color="gray.500"
                                                        size="5"
                                                        as={<MaterialCommunityIcons name="delete" />}
                                                    />
                                                    <Text
                                                        _dark={{
                                                            color: "gray.400"
                                                        }}
                                                        fontWeight="500"
                                                        color="gray.700">
                                                        Delete Account
                                                    </Text>
                                                </HStack>
                                            </Pressable>
                                        </VStack>
                                        : null}
                                {
                                    this.props.user?.user ?
                                        <VStack space="5">
                                            <Pressable px="5" py="3" onPress={() => this.onLogout()}>
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
                    </VStack>
                </ScrollView>
                <AlertDialog isOpen={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header _text={{ fontWeight: "bold" }}>Delete Account</AlertDialog.Header>
                        <AlertDialog.Body >
                            Are you sure you want to delete your account?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button variant="unstyled" onPress={() => this.setState({ isOpen: false })}>
                                    Cancel
                                </Button>
                                <Button backgroundColor={"primary.100"} onPress={() => {
                                    this.DeleteAccount();
                                    this.setState({ isOpen: false });
                                }}>
                                    Remove
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
                {
                    this.state.deleting ?
                        <View position={"absolute"} top={0} right={0} left={0} bottom={0} justifyContent={"center"} alignItems={"center"} backgroundColor="rgba(255,255,255,0.4)">
                            <Spinner size={70} color="#000" />
                        </View>
                        :
                        null
                }
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    showAlert: data => dispatch(AlertAction.ShowAlert(data)),
    Logout: () => {
        dispatch({ type: AuthTypes.LOGOUT })
        dispatch({ type: ProductTypes.EMPTY_CART })
    },
    deleteAccount: (data) => dispatch(AuthMiddleware.deleteUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
