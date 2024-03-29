import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import AuthAction from '../../redux/Actions/AuthActions';
import theme from '../../configs/Theme';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import GetToken from './GetToken';

class Login extends Component {


    state = {
        email: "",
        password: "",
        show_pass: false,
        isInvalid: "",
        loading: false,
        show_pass: false
    }

    Login = async () => {
        let {
            email,
            password,
        } = this.state;
        if (!email || !password) {
            this.setState({ isInvalid: "Enter email and password" })
            return;
        }
        // let token = await GetToken();
        // console.warn(token)
        this.props.Login({
            email,
            password,
            onRequest: () => {
                this.setState({ loading: true })
            },
            onSuccess: (success, message) => {
                this.setState({ loading: false })
                if (!success)
                    return;
                this.props.navigation.navigate("Dashboard")
            }
        });
    }


    render() {
        return (
            <ScrollView backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <View flex={1} >
                    <Box marginTop={"5%"} marginLeft="3%" alignItems={"flex-start"}>
                        <IconButton
                            onPress={() => this.props.navigation.goBack()}
                            icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />}
                        />
                    </Box>
                    <View flex={1} justifyContent="center" p="5%">
                        <Stack>
                            <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                                Login
                            </Heading>
                            <Text color="coolGray.400" fontSize={17}>Please Login to continue</Text>
                        </Stack>
                        <Stack w="100%" marginY={50}>
                            <FormControl isInvalid={this.state.isInvalid}>
                                <Input
                                    onChangeText={(email) => {
                                        this.setState({ email, isInvalid: "" })
                                    }}
                                    InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />}
                                    placeholder="Email"
                                    marginBottom={"4"} />
                                <Input
                                    onChangeText={(password) => {
                                        this.setState({ password, isInvalid: "" })
                                    }}
                                    secureTextEntry={!this.state.show_pass}
                                    InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                    InputRightElement={<Icon
                                        onPress={() => this.setState({ show_pass: !this.state.show_pass })}
                                        as={Ionicons} name={this.state.show_pass ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                    placeholder="Password" />
                                <HStack justifyContent={"space-between"}>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        {this.state.isInvalid}
                                    </FormControl.ErrorMessage>
                                    <Button onPress={() => this.props.navigation.navigate("ForgotPass")} alignSelf={"flex-end"} variant="unstyled">Forgot Password?</Button>
                                </HStack>
                            </FormControl>

                        </Stack>
                        <LGButton
                            isLoading={this.state.loading}
                            isLoadingText={"Loging in"}
                            title={"LOGIN"} onPress={() => {
                                this.Login();
                            }} />

                        <HStack alignItems="center" justifyContent="center" my="6">
                            <Divider w="45%" />
                            <Text mx="3">OR</Text>
                            <Divider w="45%" />
                        </HStack>
                        {/* <HStack space={3} justifyContent={"center"}>
                        <IconButton
                            icon={<Icon as={FontAwesome5} name="google" color="#fff" size={"sm"} />}
                            size={"lg"} rounded="full"
                            bg="#DB4437" />
                        <IconButton
                            icon={<Icon as={FontAwesome5} name="facebook-f" color="#fff" size={"sm"} />}
                            size={"lg"}
                            rounded="full"
                            bg="#4267B2" />
                    </HStack> */}
                        <Button marginBottom={5} h="12" backgroundColor="#4267B2" leftIcon={<Icon as={Fontisto} name="facebook" size="4" />}>
                            Facebook
                        </Button>
                        <Button backgroundColor={"#DB4437"} h="12" leftIcon={<Icon as={AntDesign} name="google" size="4" />}>
                            Google
                        </Button>
                    </View>
                    <HStack alignItems="center" justifyContent="center">
                        <Text>
                            Don't have an account ?
                        </Text>
                        <Button
                            onPress={() => this.props.navigation.navigate("Signup")}
                            variant="ghost" _text={{
                                fontSize: "lg"
                            }}>
                            Signup
                        </Button>
                    </HStack>
                </View>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Login: (payload) => dispatch(AuthMiddleware.Login(payload))
    }
}


export default connect(null, mapDispatchToProps)(Login);
