
import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, theme, VStack } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

class ChangePass2 extends Component {
    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode=="dark"?"#000":"#fff"} />} />
                </Box>

                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Change your password
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <VStack w="100%" space="md" marginY={50}>
                        <FormControl isInvalid={false}>
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Old Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Old password is incorrect
                            </FormControl.ErrorMessage>
                        </FormControl>
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
                    </VStack>
                    <LGButton
                        title="Update" />
                </View>
            </View>
        );
    }
}


export default ChangePass2;
