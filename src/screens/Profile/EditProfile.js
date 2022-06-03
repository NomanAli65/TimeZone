import React, { Component } from 'react';
import { Avatar, Box, Button, Heading, HStack, Icon, Input, Text, View, VStack } from "native-base";
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Account Details"}
                    noCart
                    noWish
                    back
                />
                <VStack alignItems={"center"} space={10} p={3}>
                        <Avatar
                            size="2xl"
                            source={require("../../../assets/user_place.png")}
                        />
                    <VStack space={4} w="90%">
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                        <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                        <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country" />
                        <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City" />
                        <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address" />
                    </VStack>
                    <Box w={"90%"}>
                    <LGButton
                    title={"Save"}
                    />
                    </Box>
                </VStack>
            </View>
        );
    }
}
