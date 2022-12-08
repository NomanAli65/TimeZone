import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, Image } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { ImageBackground } from 'react-native';
import theme from '../../configs/Theme';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import { connect } from 'react-redux';
import * as Notifications from "expo-notifications";
import AlertAction from '../../redux/Actions/AlertActions';

class Signup extends Component {


    state = {
        f_name: "",
        l_name: "",
        email: "",
        phone: "",
        password: "",
        c_password: "",
        country: "",
        city: "",
        address: "",
        no_match: false,
        invalid: "",
        show_pass: false,
        show_pass_c: false,
        loading: false
    }

    Signup = async () => {
        let {
            f_name,
            l_name,
            email,
            phone,
            city,
            country,
            address,
            password,
            c_password
        } = this.state;
        if (!f_name || !l_name || !email || !phone || !password || !c_password) {
            this.setState({ invalid: "Please enter your detaills" })
            return;
        }
        if (password != c_password) {
            this.setState({ no_match: true })
            return;
        }
        if (phone && !phone.startsWith("+")) {
            this.setState({ invalid: "Phone number should start with country code (example +971)" });
            return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        this.props.Signup({
            f_name,
            l_name,
            email,
            phone,
            city,
            country,
            address,
            password,
            c_password,
            token,
            onRequest: () => {
                this.setState({ loading: true })
            },
            onSuccess: (success, message) => {
                this.setState({ loading: false })
                if (!success)
                    return;
                this.props.showAlert({
                    message: "Verification link has been sent to your email. Please verify your email"
                })
                setTimeout(() => {
                    this.props.navigation.navigate("VerifyPhone", { signup: true, code: success.code })
                }, 2000)
            }
        });
    }

    render() {
        return (
            <ScrollView flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <View flex={1} >
                    <Box marginTop="5%" marginLeft="3%" alignItems={"flex-start"}>
                        <IconButton
                            onPress={() => this.props.navigation.goBack()}
                            icon={<Ionicons name='md-close' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />} />
                    </Box>
                    <View flex={1} justifyContent="center" p="5%">
                        <Stack>
                            <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                                Signup
                            </Heading>
                            <Text color="coolGray.400" fontSize={17}>Please Signup to continue</Text>
                        </Stack>
                        <FormControl isInvalid={this.state.invalid} marginY={50}>
                            <Stack w="100%" space="md" >
                                <Input
                                    onChangeText={(f_name) => {
                                        this.setState({ f_name, invalid: "" })
                                    }}
                                    InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                                <Input
                                    onChangeText={(l_name) => {
                                        this.setState({ l_name, invalid: "" })
                                    }}
                                    InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                                <Input
                                    onChangeText={(email) => {
                                        this.setState({ email, invalid: "" })
                                    }}
                                    InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />} placeholder="Email" />
                                <Input
                                    onChangeText={(phone) => {
                                        this.setState({ phone, invalid: "" })
                                    }}
                                    InputLeftElement={<Icon as={Ionicons} name='call' size={5} color="#bbb" ml={2} />} placeholder="Phone number" />
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country"
                                    value={this.state.country}
                                    onChangeText={(country) => this.setState({ country, invalid: "" })}
                                />
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City"
                                    value={this.state.city}
                                    onChangeText={(city) => this.setState({ city, invalid: "" })}
                                />
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address"
                                    value={this.state.address}
                                    onChangeText={(address) => this.setState({ address, invalid: "" })}
                                />
                                <FormControl isInvalid={this.state.no_match || this.state.invalid}>
                                    <Input
                                        onChangeText={(password) => {
                                            this.setState({ password, invalid: "" })
                                            if (this.state.c_password != password && this.state.c_password != "")
                                                this.setState({ no_match: true })
                                            else
                                                this.setState({ no_match: false })
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
                                            this.setState({ c_password, invalid: "" })
                                            if (this.state.password != c_password)
                                                this.setState({ no_match: true })
                                            else
                                                this.setState({ no_match: false })
                                        }}
                                        secureTextEntry={!this.state.show_pass_c}
                                        InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                        InputRightElement={<Icon
                                            onPress={() => this.setState({ show_pass_c: !this.state.show_pass_c })}
                                            as={Ionicons} name={this.state.show_pass_c ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                        placeholder="Confirm Password" />
                                    {
                                        this.state.invalid ?
                                            null
                                            : <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                Password not match
                                            </FormControl.ErrorMessage>
                                    }

                                </FormControl>
                            </Stack>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <LGButton
                            isLoading={this.state.loading}
                            isLoadingText={"Signing you up"}
                            onPress={() => {
                                this.Signup();
                            }}
                            title="SIGNUP" />
                    </View>
                    <HStack alignItems="center" justifyContent="center">
                        <Text>
                            Already have an account ?
                        </Text>
                        <Button
                            onPress={() => this.props.navigation.navigate("Login")}
                            variant="ghost" _text={{
                                fontSize: "lg"
                            }}>
                            Login
                        </Button>
                    </HStack>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    Signup: data => dispatch(AuthMiddleware.SignUp(data)),
    showAlert: data => dispatch(AlertAction.ShowAlert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
