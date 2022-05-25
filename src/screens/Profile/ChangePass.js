import React, { Component } from 'react';
import { Avatar, Box, Button, FormControl, Heading, HStack, Icon, Input, Text, View, VStack, WarningOutlineIcon } from "native-base";
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

export default class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1}>
                <AppBar
                    title={"Change Password"}
                    noCart
                    noWish
                    back
                />
                <Box alignItems={"center"} >
                    <VStack space={4} w="90%" py={5}>
                        <Input
                            secureTextEntry
                            InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                            InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                            placeholder="Old Password" />
                        <FormControl isInvalid={false}>
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="New Password"
                                marginBottom={4} />
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Confirm Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Password not match
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <LGButton
                            title={"Update"}
                        />
                    </VStack>
                </Box>
            </View>
        );
    }
}
