import React, { Component } from 'react';
import { Avatar, Button, Heading, HStack, Text, View, VStack } from "native-base";
import AppBar from '../../components/Appbar';

export default class Profile extends Component {
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
                            source={require("../../../assets/user_place.png")}
                        />
                        <Heading>
                            User name
                        </Heading>
                    </VStack>
                    <VStack space={4} w="90%">
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Email</Text>
                            <Text bold fontSize="md">user@timezone.com</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Country</Text>
                            <Text bold fontSize="md">UAE</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >City</Text>
                            <Text bold fontSize="md">abu dhabi</Text>
                        </HStack>
                        <HStack w="100%" justifyContent={"space-between"} alignItems="center">
                            <Text >Address</Text>
                            <Text bold fontSize="md">adasdasdasdasdasd</Text>
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
