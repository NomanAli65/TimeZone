import { Box, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { connect } from 'react-redux';

class Address extends Component {

    state = {
        title: "",
        address: "",
        invalid: "",
        loading: false
    }

    AddAddress = () => {
        let {
            title,
            address,
        } = this.state;
        if (!title || !address) {
            this.setState({ invalid: "Please fill all fields" })
            return;
        }
        this.props.route.params.setAddress(title, address)
        this.props.navigation.goBack();

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
                            Delivery Address
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Please fill all fields to continue</Text>
                    </Stack>
                    <FormControl isInvalid={this.state.invalid} marginY={50}>
                        <VStack w="100%" space="md">
                            <Input
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Title"
                                onChangeText={(title) => this.setState({ title, invalid: "" })}
                            />
                            <Input
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address"
                                onChangeText={(address) => this.setState({ address, invalid: "" })}
                            />
                            {/* <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Card holder name" /> */}
                        </VStack>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            {this.state.invalid}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <LGButton
                        isLoading={this.state.loading}
                        isLoadingText={"Saving"}
                        title="Save"
                        onPress={this.AddAddress}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
