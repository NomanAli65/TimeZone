import { Box, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { connect } from 'react-redux';

class AddCard extends Component {

    state = {
        name: "",
        number: "",
        expiry: "",
        cvc: "",
        invalid: "",
        loading: false
    }

    AddCard = () => {
        let {
            name,
            number,
            expiry,
            cvc
        } = this.state;
        if (!number || !expiry || !cvc) {
            this.setState({ invalid: "Please fill all fields" })
            return;
        }
        this.setState({ loading: true });
        this.props.AddCard({
            name,
            number,
            expiry,
            cvc,
            onSuccess: () => {
                this.setState({ loading: false })
                this.props.navigation.goBack()
            }
        });
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box marginLeft={"3%"}>
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />} />
                </Box>

                <View flex={1} justifyContent="center" p="5%">
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                            Add Payment Method
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <FormControl isInvalid={this.state.invalid} marginY={50}>
                        <VStack w="100%" space="md">
                            <Input
                                InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card holder name"
                                onChangeText={(name) => this.setState({ name, invalid: "" })}
                            />
                            <Input
                                keyboardType='numeric'
                                maxLength={20}
                                InputLeftElement={<Icon as={Ionicons} name='card' size={5} color="#bbb" ml={2} />} placeholder="Card number"
                                onChangeText={(number) => this.setState({ number, invalid: "" })}
                            />
                            <HStack space={3} w="100%">
                                <Input
                                    keyboardType='numeric'
                                    w="48%" InputLeftElement={<Icon as={Ionicons} name='calendar' size={5} color="#bbb" ml={2} />} placeholder="Expiry"
                                    maxLength={7}
                                    value={this.state.expiry}
                                    onKeyPress={(e) => this.backspace = e.nativeEvent.key}
                                    onChangeText={(expiry) => {
                                        console.warn(this.backspace)
                                        if (expiry.length == 2 && this.backspace != "Backspace") {
                                            this.setState({ expiry: expiry + "/", invalid: "" })
                                        }
                                        else {
                                            this.setState({ expiry, invalid: "" })
                                            this.backspace = undefined;
                                        }
                                    }}
                                />
                                <Input
                                    keyboardType='numeric'
                                    maxLength={5}
                                    w="48%" InputLeftElement={<Icon as={Ionicons} name='card' size={5} color="#bbb" ml={2} />} placeholder="CVC/CVV"
                                    onChangeText={(cvc) => this.setState({ cvc, invalid: "" })}
                                />
                            </HStack>
                            {/* <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card holder name" /> */}
                        </VStack>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {this.state.invalid}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <LGButton
                        isLoading={this.state.loading}
                        isLoadingText={"Adding"}
                        title="Add"
                        onPress={this.AddCard}
                    />
                    <Text mt={5}>
                        For Cash payment option holding period of 2 hours for 1 timepiece, for any extension or special request you can edit/email us for your requirement.
                    </Text>
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    AddCard: data => dispatch(UserMiddleware.AddMethod(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
