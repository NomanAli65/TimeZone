import { Box, FormControl, Heading, IconButton, Stack, Text, TextArea, useColorModeValue, View, WarningOutlineIcon, } from 'native-base';
import React, { Component } from 'react';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../components/LGButton';
import { connect } from 'react-redux';
import AppBar from '../components/Appbar';
import theme from '../configs/Theme';
import AlertAction from '../redux/Actions/AlertActions';
import { GeneralMiddleware } from '../redux/Middlewares/GeneralMiddleware';

class Help extends Component {


    state = {
        loading: false,
        help: "",
        invalid: ""
    }

    getHelp = () => {
        let { help } = this.state;
        if (!help) {
            this.setState({ invalid: "Please write something to continue" });
            return;
        }
        this.setState({ loading: true });
        this.props.getHelp({
            help,
            onSuccess: (status) => {
                if (status) {
                    this.props.showAlert();
                    this.setState({ help: "" })
                }
                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <Box>
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name='chevron-left' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />}
                    />
                </Box>
                {/* <AppBar
                title={"Help"}
                noCart
                noWish
                back
                /> */}
                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "white" }}>
                            Help
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill required field to continue</Text>
                    </Stack>
                    <Stack w="100%" marginY={50}>
                        <FormControl isInvalid={this.state.invalid}>
                            <TextArea
                                value={this.state.help}
                                placeholder='Tell us how can we help you...'
                                onChangeText={(help) => {
                                    this.setState({ help, invalid: "" })
                                }}
                            />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>
                    <LGButton
                        isLoading={this.state.loading}
                        isLoadingText="Sending"
                        title={"Submit"}
                        onPress={this.getHelp} />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: () => dispatch(AlertAction.ShowAlert({
            title: "Successfull",
            description: "Your query has been submitted successfully, We will get back to you soon via email"
        })),
        getHelp: data => dispatch(GeneralMiddleware.getHelp(data)),
    }
}


export default connect(null, mapDispatchToProps)(Help);

