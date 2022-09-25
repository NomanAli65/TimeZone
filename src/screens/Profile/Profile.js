import React, { Component } from 'react';
import { Avatar, Button, Heading, HStack, Text, View, VStack } from "native-base";
import AppBar from '../../components/Appbar';
import { connect } from 'react-redux';
import AlertAction from '../../redux/Actions/AlertActions';
import { img_url } from '../../configs/APIs';

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
                            source={this.props.user?.user?.profile_pic ? { uri: img_url + this.props.user?.user?.profile_pic } : require("../../../assets/user_place.png")}
                        />
                        <Heading>
                            {this.props.user?.user?.name}
                        </Heading>
                    </VStack>
                    <VStack space={4} w="90%">
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Email</Text>
                            <Text bold fontSize="md">{this.props.user?.user?.email}</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Phone</Text>
                            <Text bold fontSize="md">{this.props.user?.user?.phone}</Text>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);