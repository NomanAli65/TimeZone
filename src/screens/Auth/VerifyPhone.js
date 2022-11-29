import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import AlertAction from '../../redux/Actions/AlertActions';

class VerifyPhone extends Component {

    state = {
        code: "",
        verification_code: "",
        inavlid: "",
        loading: false,
        inputs: [true, false, false, false, false]
    }

    componentDidMount() {
        let signup = this.props.route.params?.signup;

        if (!signup) {
            this.props.sendCode({
                onSuccess: (req) => {
                    if (req) {
                        console.warn(req)
                        this.props.showAlert({
                            message: "Verification code has been sent to your phone number"
                        })
                        this.setState({ verification_code: req })
                    }
                }
            })
        }
        else {
            let code = this.props.route.params?.code;
            console.warn(code)
            this.setState({ verification_code: code });
        }
    }

    VerifyCode = () => {
        let {
            code,
            verification_code
        } = this.state;
        let signup = this.props.route.params?.signup;
        if (!code) {
            this.setState({ inavlid: "Cannot be empty" });
            return;
        }
        if (code == verification_code) {
            this.setState({ loading: true })
            this.props.verifyPhone({
                onSuccess: (success) => {
                    this.setState({ loading: false })

                    if (!success)
                        return;
                    else {
                        this.props.showAlert({
                            message: "Your phone number has been verified successfully"
                        })
                        if (signup)
                            this.props.navigation.navigate("Dashboard")
                        else
                            this.props.navigation.goBack();
                    }

                },
                old_data: this.props.user
            })
        }
        else {
            this.setState({ inavlid: "Code is incorrect" });
        }

    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <Box mt={"5%"} ml="3%" alignSelf={"flex-start"}>
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />}
                    />
                </Box>
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Verify Phone Number
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Verification code has been sent to your phone number</Text>
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
                                        if (code.length == 5)
                                            return;

                                        let copy = [...this.state.inputs];
                                        if (this.PressedKey == "Backspace") {
                                            if (code.length != 4)
                                                copy[code.length + 1] = false

                                            copy[code.length] = true
                                        }
                                        else {
                                            copy[code.length - 1] = false
                                            copy[code.length] = true
                                        }
                                        this.PressedKey = undefined;
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
                        isLoading={this.state.loading}
                        isLoadingText={"Verifying"}
                        onPress={() => {
                            this.VerifyCode();
                        }}
                        title={"Verify"} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    verifyPhone: data => dispatch(AuthMiddleware.VerifyPhone(data)),
    sendCode: (data) => dispatch(AuthMiddleware.SendVerificationCode(data)),
    showAlert: data => dispatch(AlertAction.ShowAlert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);