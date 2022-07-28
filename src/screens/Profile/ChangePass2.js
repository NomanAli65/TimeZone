
import { Box, Button, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, FormControl, WarningOutlineIcon, ScrollView, theme, VStack } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import { connect } from 'react-redux';
import AlertAction from '../../redux/Actions/AlertActions';

class ChangePass2 extends Component {

    state = {
        old_pass: "",
        new_pass: "",
        c_new_pass: "",
        loading: false,
        invalid: "",
        pass_match: "",
        showOpass: true,
        showNpass: true,
        showCNpass: true
    }

    changePass = () => {
        let { old_pass, new_pass, c_new_pass } = this.state;
        if (!old_pass || !new_pass || !c_new_pass) {
            this.setState({ invalid: "Please fill all fields" });
            return;
        }
        if (new_pass != c_new_pass) {
            this.setState({ pass_match: "Password not match" });
            return;
        }
        this.setState({ loading: true })
        this.props.ChangePass({
            password: this.state.new_pass,
            old_pass: this.state.old_pass,
            onSuccess: (success) => {
                if (success) {
                    this.props.navigation.goBack();
                    this.props.showAlert({
                        title: "Success",
                        message: "Password changed successfully",
                    })
                }

                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box position="absolute" top={"5%"} left="3%">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />} />
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
                                onChangeText={(old_pass) => this.setState({ old_pass, invalid: "" })}
                                secureTextEntry={this.state.showOpass}
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon 
                                    onPress={() => this.setState({ showOpass: !this.state.showOpass })}
                                    as={Ionicons} name={!this.state.showOpass ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                placeholder="Old Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {""}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={this.state.invalid || this.state.pass_match}>
                            <Input
                                onChangeText={(new_pass) => {
                                    if (new_pass != this.state.c_new_pass && this.state.c_new_pass)
                                        this.setState({ new_pass, pass_match: "Password not match" })
                                    else
                                        this.setState({ new_pass, invalid: "", pass_match: "" })
                                }}
                                secureTextEntry={this.state.showNpass}
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon onPress={() => this.setState({ showNpass: !this.state.showNpass })}
                                as={Ionicons} name={!this.state.showNpass ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                placeholder="New Password"
                                marginBottom={4} />
                            <Input
                                onChangeText={(c_new_pass) => {
                                    if (c_new_pass != this.state.new_pass)
                                        this.setState({ c_new_pass, pass_match: "Password not match" })
                                    else
                                        this.setState({ c_new_pass, invalid: "", pass_match: "" })
                                }}
                                secureTextEntry={this.state.showCNpass}
                                InputLeftElement={<Icon as={Ionicons} name='lock-closed' size={5} color="#bbb" ml={2} />}
                                InputRightElement={<Icon onPress={() => this.setState({ showCNpass: !this.state.showCNpass })}
                                as={Ionicons} name={!this.state.showCNpass ? "eye-off" : 'eye'} size={5} color="#bbb" mr={2} />}
                                placeholder="Confirm Password" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid || this.state.pass_match}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </VStack>
                    <LGButton
                        isLoading={this.state.loading}
                        isLoadingText={"Changing Password"}
                        onPress={this.changePass}
                        title="Update" />
                </View>
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ChangePass: (payload) => dispatch(AuthMiddleware.ChangePassword(payload)),
        showAlert: data => dispatch(AlertAction.ShowAlert(data)),
    }
}


export default connect(null, mapDispatchToProps)(ChangePass2);
