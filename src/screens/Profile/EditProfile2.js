import React, { Component } from 'react';
import { Avatar, Box, Button, FormControl, Heading, HStack, Icon, IconButton, Input, ScrollView, Stack, Text, View, VStack, theme, WarningOutlineIcon } from "native-base";
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class EditProfile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user?.user.name,
            country: this.props.user?.user.country,
            city: this.props.user?.user.city,
            address: this.props.user?.user.address,
            pic: null,
            invalid: "",
            loading: ""
        };
    }

    UpdateProfile = () => {
        let { name, country, city, address, pic } = this.state;

        if (!name || !country || !city || !address) {
            this.setState({ invalid: "Please fill all fields" });
            return;
        }
        this.setState({ loading: true });
        this.props.UpdateProfile({
            name,
            country,
            city,
            address,
            pic,
            onSuccess: (success) => {
                if (success) {
                    this.props.navigation.goBack();
                }
                this.setState({ loading: false });
            }
        })
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box mt={"9%"} mb={"3%"} px={"2%"} alignItems="flex-start">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />} />
                </Box>
                <ScrollView>
                    <View flex={1} justifyContent="center" p="5%">
                        <Stack>
                            <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                                Update your profile
                            </Heading>
                            <Text color="coolGray.400" fontSize={17}>Please fill required fields to continue</Text>
                        </Stack>
                        <FormControl marginY={50} isInvalid={this.state.invalid}>
                            <VStack w="100%" space="md">
                                <Avatar
                                    alignSelf={"center"}
                                    size={120}
                                    source={require("../../../assets/user_place.png")}
                                />
                                <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Name"
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({ name, invalid: "" })}
                                />
                                {/* <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" /> */}
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
                            </VStack>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <LGButton
                            isLoading={this.state.loading}
                            isLoadingText={"Updating profile"}
                            onPress={this.UpdateProfile}
                            title="Update" />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    UpdateProfile: data => dispatch(AuthMiddleware.UpdateProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile2);


{/* <Avatar
                            size="2xl"
                            source={require("../../../assets/user_place.png")}
                        />
                        <VStack space={4} w="90%">
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address" />
                        </VStack> */}