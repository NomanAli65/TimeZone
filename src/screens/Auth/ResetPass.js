import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class ResetPass extends Component {

    state = {
        password: "",
        c_password: "",
        invalid: "",
        show_pass:false,
        show_pass_c:false,
        loading: false
    }

    ChangePass = () => {
        let email = this.props.route.params?.email;
        let {
            password,
            c_password
        } = this.state;
        if (!password || !c_password) {
            this.setState({ invalid: "Cannot be empty" });
            return;
        }

        if (password != c_password) {
            this.setState({ invalid: "Password not match" })
            return;
        }

        this.props.ChangePass({
            email,
            password,
            c_password,
            onRequest: () => {
                this.setState({ loading: true })
            },
            onSuccess: (success, msg) => {
                this.setState({ loading: false });
                if (!success)
                    return;

                this.props.navigation.navigate("Login")
            }
        })
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
                            Reset Your Password
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Enter new password to reset your password</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={this.state.invalid}>
                            <Input
                                onChangeText={(password) => {
                                    if (this.state.c_password != password && this.state.c_password != "")
                                        this.setState({ invalid: "Password not match", password })
                                    else
                                        this.setState({ invalid: "", password })
                                }}
                                secureTextEntry={!this.state.show_pass}
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon onPress={() => this.setState({ show_pass: !this.state.show_pass })}
                                    as={Ionicons} name={this.state.show_pass ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                placeholder="Password"
                                marginBottom={4}
                            />
                            <Input
                                onChangeText={(c_password) => {
                                    if (this.state.password != c_password)
                                        this.setState({ invalid: "Password not match", c_password })
                                    else
                                        this.setState({ invalid: "", c_password })
                                }}
                                secureTextEntry={!this.state.show_pass_c}
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon
                                    onPress={() => this.setState({ show_pass_c: !this.state.show_pass_c })}
                                    as={Ionicons} name={this.state.show_pass_c ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                placeholder="Confirm Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </Stack>
                    <LGButton
                        onPress={() => {
                            this.ChangePass();
                        }}
                        isLoading={this.state.loading}
                        isLoadingText={"Changing your password"}
                        title={"Reset Password"} />
                </View>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ChangePass: (payload) => dispatch(AuthMiddleware.ResetPassword(payload))
    }
}


export default connect(null, mapDispatchToProps)(ResetPass);
