import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class VerifyCode extends Component {

    state = {
        code: "",
        inavlid: "",
        loading: false,
        inputs: [true, false, false, false, false]
    }

    VerifyCode = () => {
        this.props.navigation.navigate("ResetPass", { email });
        return;
        let confirmation_code = this.props.route.params?.code;
        let email = this.props.route.params?.email;
        let {
            code
        } = this.state;
        if (!code) {
            this.setState({ inavlid: "Cannot be empty" });
            return;
        }
        if (code == "12345") {
            this.props.navigation.navigate("ResetPass", { email })
        }
        else {
            this.setState({ inavlid: "Code is incorrect" });
        }

    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />}
                    />
                </Box>
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Verify Email
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Verification code has been sent to your email</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={this.state.inavlid}>
                            <HStack space={"md"}>

                                {
                                    this.state.inputs.map((val, index) => (
                                        <Input
                                            isFocused={val}
                                            editable={false}
                                            fontSize={"2xl"}
                                            flex={1}
                                            textAlign="center"
                                            value={this.state.code[index]}
                                            placeholder={(index + 1) + ""} />
                                    ))
                                }

                            </HStack>
                            <Input
                                position={"absolute"}
                                left={0}
                                right={0}
                                top={0}
                                bottom={0}
                                maxLength={5}
                                backgroundColor={"#fff"}
                                opacity={0}
                                keyboardType="numeric"
                                onKeyPress={(e) => {
                                    // if (e.nativeEvent.key == "Backspace") {
                                    this.PressedKey = e.nativeEvent.key;
                                    // let copy = [...this.state.inputs];
                                    // copy[this.state.code.length - 1] = false
                                    // copy[this.state.code.length - 2] = true
                                    // this.setState({ inputs: copy })
                                    // }
                                }}
                                onChangeText={(code) => {
                                    this.setState(state => ({ code, inavlid: "" }), () => {
                                        if (this.state.code.length == 5)
                                            return;

                                        let copy = [...this.state.inputs];
                                        if (this.PressedKey == "Backspace") {
                                            copy[this.state.code.length] = false
                                            copy[this.state.code.length - 1] = true
                                        }
                                        else {
                                            copy[this.state.code.length - 1] = false
                                            copy[this.state.code.length] = true
                                        }
                                        this.setState({ inputs: copy })
                                    })
                                }}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.inavlid}
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </Stack>
                    <LGButton
                        onPress={() => {
                            this.VerifyCode();
                        }}
                        title={"Verify"} />
                </View>
            </View>
        );
    }
}

export default VerifyCode;
