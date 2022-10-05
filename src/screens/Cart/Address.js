import { Box, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { connect } from 'react-redux';

class Address extends Component {

    state = {
        country: this.props.user?.user.country,
        city: this.props.user?.user.city,
        address: this.props.user?.user.address,
        title: "My address",
        invalid: "",
        loading: false
    }

    AddAddress = () => {
        let {
            title,
            address,
            city,
            country
        } = this.state;
        if (!title || !address) {
            this.setState({ invalid: "Please fill all fields" })
            return;
        }
        this.props.route.params.setAddress(title, address + ", " + city + ", " + country)
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
                                value={this.state.title}
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Title"
                                onChangeText={(title) => this.setState({ title, invalid: "" })}
                            />
                            <Input
                                value={this.state.address}
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address"
                                onChangeText={(address) => this.setState({ address, invalid: "" })}
                            />
                            <Input
                                value={this.state.city}
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City"
                                onChangeText={(city) => this.setState({ city, invalid: "" })}
                            />
                            <Input
                                value={this.state.country}
                                maxLength={20}
                                InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country"
                                onChangeText={(country) => this.setState({ country, invalid: "" })}
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
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    AddCard: data => dispatch(UserMiddleware.AddMethod(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
