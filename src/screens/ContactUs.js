import { Box, FormControl, Heading, HStack, IconButton, Image, Input, Stack, Text, TextArea, useColorModeValue, View, VStack, WarningOutlineIcon, } from 'native-base';
import React, { Component } from 'react';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../components/LGButton';
import { connect } from 'react-redux';
import AppBar from '../components/Appbar';
import theme from '../configs/Theme';
import AlertAction from '../redux/Actions/AlertActions';
import { GeneralMiddleware } from '../redux/Middlewares/GeneralMiddleware';
import numbro from 'numbro';
import { img_url } from '../configs/APIs';
import { Linking } from 'react-native';

class Help extends Component {


    state = {
        loading: false,
        query: "",
        email: this.props.user?.user?.email,
        invalid: ""
    }

    Submit = () => {
        Linking.openURL("tel:+97143542050")
        return;
        let item = this.props.route.params?.item;
        let { query, email } = this.state;
        if (!query || !email) {
            this.setState({ invalid: "Please fill all fields to continue" });
            return;
        }
        this.setState({ loading: true });
        this.props.contactUs({
            query,
            email,
            p_id: item?.id,
            onSuccess: (status) => {
                if (status) {
                    this.props.showAlert();
                    this.setState({ query: "", email: "" })
                }
                this.setState({ loading: false })
            }
        })
    }

    render() {
        let item = this.props.route.params?.item;
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <Box  marginLeft={"3%"} alignSelf="flex-start">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name='chevron-left' size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />}
                    />
                </Box>
                {/* <AppBar
                    title={"Contact Us"}
                    noCart
                    noWish
                    back
                /> */}
                <View flex={1} p="5%" justifyContent={"center"}>
                    <Stack>
                        <Heading bold fontSize={35} color="black" _dark={{ color: "white" }}>
                            Contact Us
                        </Heading>
                        <Text color="coolGray.400" fontSize={17}>Call us now for any futher details</Text>
                    </Stack>
                    {
                        item ?
                            <Box marginY={10} _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                                <HStack space={1} w={"full"} p={2}>
                                    <Image alignSelf={"center"} h={90} w={"30%"} mr={2} source={item.image ? { uri: img_url + item.image } : require("../../assets/placeholder.png")} alt="Watch image" resizeMode='cover' borderRadius={5} />
                                    <Stack space={1} w={"55%"}>
                                        <Heading size={"sm"} height={35}>
                                            {item.product_name}
                                        </Heading>
                                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                                            Reference Number:
                                        </Text>
                                        <Text mt={-2}>{item?.ref_number ? item?.ref_number : "No reference number available"}</Text>
                                        <Text fontSize={"12"} color={"primary.100"} flexWrap={"wrap"} numberOfLines={3} bold>
                                            {/* {item?.price} */}
                                            Request for price
                                        </Text>
                                    </Stack>
                                </HStack>
                            </Box>
                            : 
                            <Box my={5} />}
                    {/* <Stack w="100%" marginY={10}>
                        <FormControl isInvalid={this.state.invalid}>
                            <VStack space={5}>
                                <Input
                                    placeholder='Enter your email address'
                                    onChangeText={(email) => this.setState({ email, invalid: "" })}
                                    value={this.state.email}
                                />
                                <TextArea
                                    value={this.state.help}
                                    placeholder='Write your message...'
                                    onChangeText={(query) => {
                                        this.setState({ query, invalid: "" })
                                    }}
                                />
                            </VStack>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack> */}
                    <LGButton
                        isLoading={this.state.loading}
                        isLoadingText="Sending"
                        title={"Call now"}
                        onPress={this.Submit} />
                    <Text fontSize={"md"} bold marginTop={10}>
                        Timezone Watches Ltd Unit GA-00-NZ-G0-RT-49, Level GF, Gate Avenue - North Zone,{"\n"}
                        Dubai International Financial Centre, Dubai,{"\n"}United Arab Emirates{"\n"}
                        <Text color="primary.100">+971 04 3542050{"\n"}</Text>
                        <Text color="primary.100">info@timezonedubai.com</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        showAlert: () => dispatch(AlertAction.ShowAlert({
            title: "Successfull",
            description: "Your reqeust has been submitted successfully, We will get back to you soon via email"
        })),
        contactUs: data => dispatch(GeneralMiddleware.contactUs(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Help);

