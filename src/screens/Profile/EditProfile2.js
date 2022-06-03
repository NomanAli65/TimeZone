import React, { Component } from 'react';
import { Avatar, Box, Button, FormControl, Heading, HStack, Icon, IconButton, Input, ScrollView, Stack, Text, View, VStack, theme } from "native-base";
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

export default class EditProfile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box mt={"9%"} mb={"3%"} px={"2%"} alignItems="flex-start">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode=="dark"?"#000":"#fff"} />} />
                </Box>
                <ScrollView>
                    <View flex={1} justifyContent="center" p="5%">
                        <Stack>
                            <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                                Update your profile
                            </Heading>
                            <Text color="coolGray.400" fontSize={17}>Please fill required fields to continue</Text>
                        </Stack>
                        <VStack w="100%" space="md" marginY={50}>
                            <Avatar
                                alignSelf={"center"}
                                size={120}
                                source={require("../../../assets/user_place.png")}
                            />
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address" />
                        </VStack>
                        <LGButton
                            title="Update" />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


{/* <Avatar
                            size="2xl"
                            source={require("../../../assets/user_place.png")}
                        />
                        <VStack space={4} w="90%">
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address" />
                        </VStack> */}