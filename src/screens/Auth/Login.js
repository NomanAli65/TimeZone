import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Ionicons, FontAwesome5, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import AuthAction from '../../redux/Actions/AuthActions';
import theme from '../../configs/Theme';

class Login extends Component {
    render() {
        return (
            // <ScrollView>
            <View flex={1} backgroundColor="white" _dark={{backgroundColor:"black"}}>
                {/* <Image
                    right={"-15%"}
                    top={"-10%"}
                    position={"absolute"}
                    opacity={0.1}
                    w={"40%"}
                    h={"40%"}
                    resizeMode="contain"
                    source={require("../../../assets/watchd.png")} /> */}
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode=="dark"?"#fff":"#000"} />}
                    />
                </Box>
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{color:"#fff"}}>
                            Login
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please Login to continue</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={true}>
                            <Input
                                InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />}
                                placeholder="Email"
                                marginBottom={"4"} />
                            <Input
                                secureTextEntry
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon as={Ionicons} name='eye' size={5} color="#bbb" mr={2} />}
                                placeholder="Password" />
                            <HStack justifyContent={"space-between"}>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    Incorrect email or password
                                </FormControl.ErrorMessage>
                                <Button onPress={() => this.props.navigation.navigate("ForgotPass")} alignSelf={"flex-end"} variant="unstyled">Forgot Password?</Button>
                            </HStack>
                        </FormControl>

                    </Stack>
                    <LGButton title={"LOGIN"} onPress={() => {
                        this.props.Login({ name: "noman", email: "noman@gmail.com" });
                        this.props.navigation.navigate("Dashboard")
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
            // </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Login: (payload) => dispatch(AuthAction.Login(payload))
    }
}


export default connect(null, mapDispatchToProps)(Login);
