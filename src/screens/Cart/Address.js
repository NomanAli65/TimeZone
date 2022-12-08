import { Box, Heading, HStack, IconButton, Input, Icon, Stack, Text, View, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import React, { Component } from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class Address extends Component {

    constructor(props) {
        super(props);

        let edit_data = this.props.route?.params?.data;
        this.state = {
            country: edit_data?.country || "",
            city: edit_data?.city || "",
            address: edit_data?.address || "",
            title: edit_data?.title || "",
            invalid: "",
            loading: false
        }
    }

    SaveAddress = () => {
        let {
            title,
            address,
            city,
            country
        } = this.state;
        let edit_data = this.props.route?.params?.data;

        if (!title || !address) {
            this.setState({ invalid: "Please fill all fields" })
            return;
        }
        this.setState({ loading: true })
        if (edit_data)
            this.props.editAddress({
                id: edit_data?.id,
                title,
                address,
                city,
                country,
                addresses: this.props.addresses,
                user: this.props.user,
                callback: (status) => {
                    this.setState({ loading: false })
                    if (status) {
                        this.props.navigation.goBack();
                    }
                }
            })
        else
            this.props.addAddress({
                title,
                address,
                city,
                country,
                addresses: this.props.addresses,
                callback: (status) => {
                    this.setState({ loading: false })
                    if (status) {
                        this.props.navigation.goBack();
                    }
                }
            })

    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box marginLeft="3%" alignSelf={"flex-start"}>
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
                        onPress={this.SaveAddress}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.Auth.user,
    addresses: state.Auth.addresses,
})

const mapDispatchToProps = dispatch => ({
    addAddress: data => dispatch(AuthMiddleware.addAddress(data)),
    editAddress: data => dispatch(AuthMiddleware.editAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
