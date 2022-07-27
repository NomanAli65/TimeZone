
import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, theme, VStack } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';

class ChangePass2 extends Component {

    state = {
        old_pass: "",
        new_pass: "",
        c_new_pass: "",
        loading: false,
        invalid: ""
    }

    changePass = () => {
        let { old_pass, new_pass, c_new_pass } = this.state;
        if (!old_pass || !new_pass || !c_new_pass) {
            this.setState({ invalid: "Please fill all fields" });
            return;
        }
        if (!new_pass != c_new_pass) {
            this.setState({ invalid: "Password not match" });
            return;
        }
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode == "dark" ? "#000" : "#fff"} />} />
                </Box>

                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Change your password
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <VStack w="100%" space="md" marginY={50}>
                        <FormControl isInvalid={this.state.invalid}>
                            <Input
                                onChangeText={(old_pass) => this.setState({ old_pass })}
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Old Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {""}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={this.state.invalid}>
                            <Input
                                onChangeText={(new_pass) => {
                                    if (new_pass != this.state.c_new_pass && this.state.c_new_pass)
                                        this.setState({ new_pass, invalid: "Password not match" })
                                    else
                                        this.setState({ new_pass, invalid: "" })
                                }}
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="New Password"
                                marginBottom={4} />
                            <Input
                                onChangeText={(c_new_pass) => {
                                    if (c_new_pass != this.state.new_pass)
                                        this.setState({ c_new_pass, invalid: "Password not match" })
                                    else
                                        this.setState({ c_new_pass, invalid: "" })
                                }}
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Confirm Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </VStack>
                    <LGButton
                        onPress={this.changePass}
                        title="Update" />
                </View>
            </View>
        );
    }
}


export default ChangePass2;
