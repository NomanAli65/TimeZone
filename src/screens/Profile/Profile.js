import React, { Component } from 'react';
import { Avatar, Button, Heading, HStack, Icon, Pressable, Text, View, VStack, WarningIcon } from "native-base";
import AppBar from '../../components/Appbar';
import { connect } from 'react-redux';
import AlertAction from '../../redux/Actions/AlertActions';
import { img_url } from '../../configs/APIs';
import { AntDesign } from "@expo/vector-icons";
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Account Details"}
                    noCart
                    noWish
                    back
                    edit
                />
                <VStack alignItems={"center"} space={10} p={3}>
                    <VStack alignItems={"center"} space={4}>
                        <Avatar
                            size="2xl"
                            source={this.props.user?.user?.profile_pic ? { uri: this.props.user?.user?.profile_pic.startsWith("http") ? this.props.user?.user?.profile_pic : img_url + this.props.user?.user?.profile_pic } : require("../../../assets/user_place.png")}
                        />
                        <Heading>
                            {this.props.user?.user?.name}
                        </Heading>
                    </VStack>
                    <VStack space={4} w="90%">
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Email</Text>
                            <Pressable
                                onPress={() => {
                                    this.props.verifyEmail({
                                        onSuccess: (res) => {
                                            if (res)
                                                this.props.showAlert({
                                                    message: "Verification link has beent sent to your email. Please verify your email"
                                                })
                                        }
                                    })
                                }}
                            >
                                <HStack space={1} alignItems="center">
                                    <Text bold fontSize="md">{this.props.user?.user?.email}</Text>
                                    {
                                        this.props.user?.user?.email_verified_at ?
                                            null
                                            :
                                            <Icon as={AntDesign} name="exclamationcircle" size={"xs"} color="red.600" />
                                    }
                                </HStack>
                            </Pressable>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Phone</Text>
                            <Pressable
                            // onPress={() => {
                            //     this.props.navigation.navigate("VerifyPhone")
                            // }}
                            >
                                <HStack space={1} alignItems="center">
                                    <Text bold fontSize="md">{this.props.user?.user?.phone}</Text>
                                    {
                                        this.props.user?.user?.phone_verified_at ?
                                            null
                                            :
                                            this.props.user?.user?.phone ?
                                                <Icon as={AntDesign} name="exclamationcircle" size={"xs"} color="red.600" />
                                                : null
                                    }
                                </HStack>
                            </Pressable>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Country</Text>
                            <Text bold fontSize="md">{this.props.user?.user?.country}</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >City</Text>
                            <Text bold fontSize="md">{this.props.user?.user?.city}</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Address</Text>
                            <Text bold fontSize="md">{this.props.user?.user?.address}</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Passsword</Text>
                            <Button
                                onPress={() => this.props.navigation.navigate("ChangePass")}
                                variant="outline">
                                <Text bold >Change Passsword</Text>
                            </Button>
                        </HStack>
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
    verifyEmail: data => dispatch(AuthMiddleware.VerifyEmail(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);