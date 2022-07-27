import { Box, Button, Center, Container, Divider, Flex, FormControl, Heading, HStack, Icon, IconButton, Image, Input, ScrollView, Stack, Text, View, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign, Fontisto } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class ForgotPass extends Component {

    state = {
        email: "",
        inavlid: "",
        loading: false
    }

    ForgotPass = () => {
        let {
            email
        } = this.state;
        if (!email) {
            this.setState({ inavlid: "Please enter your email address" });
            return;
        }
        
        this.props.ForgotPass({
            email,
            onRequest: () => {
                this.setState({ loading: true })
            },
            onSuccess: (success, msg) => {
                this.setState({ loading: false });
                if (!success)
                    return;

                this.props.navigation.navigate("VerifyCode",{code:msg,email})
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
                            Forgot Password
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please write your email to continue</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={this.state.inavlid}>
                            <Input
                                onChangeText={(email) => {
                                    this.setState({ email })
                                }}
                                InputLeftElement={<Icon as={Ionicons} name='mail' size={5} color="#bbb" ml={2} />}
                                placeholder="Email" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.inavlid}
                            </FormControl.ErrorMessage>
                        </FormControl>

                    </Stack>
                    <LGButton
                        onPress={() => {
                            this.ForgotPass();
                        }}
                        isLoading={this.state.loading}
                        isLoadingText={"Sending you link to reset password"}
                        title={"Next"} />
                </View>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ForgotPass: (payload) => dispatch(AuthMiddleware.ForgotPassword(payload))
    }
}


export default connect(null, mapDispatchToProps)(ForgotPass);
