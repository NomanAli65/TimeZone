import { Alert, Button, FormControl, Heading, HStack, Image, Input, InputGroup, InputLeftAddon, Pressable, ScrollView, Select, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';
import AlertAction from '../../redux/Actions/AlertActions';
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';

class PersonalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pname: this.props.user?.user?.name,
            email: this.props.user?.user?.email,
            invalid: "",
            phone: "",
            code: "",
            loading: false
        };
    }

    onPress = () => {
        let { pname, email, phone } = this.state;
        if (!pname || !email || !phone) {
            this.setState({ invalid: "Please fill all fields" });
            return;
        }
        let { images, model, price, condition, box_paper, comments, brand, name } = this.props.route.params?.data;
        this.setState({ loading: true });
        this.props.TradeIn({
            pname,
            email,
            phone,
            images,
            name,
            model,
            price,
            condition,
            box_paper,
            comments,
            brand,
            onSuccess: (success) => {
                if (success) {
                    this.props.route.params?.Reset();
                    this.props.navigation.goBack()
                    this.props.showAlert({ title: "Success", message: "We will contact you soon via email" });
                }
                this.setState({ loading: false })
            }
        })
    }

    render() {
        return (
            <ScrollView backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <View flex={1}>
                    <AppBar
                        noCart
                        noWish
                        back
                        title={"Personal Information"}
                    />
                    <VStack p={3} space={5}>
                        <FormControl isInvalid={this.state.invalid}>
                            <VStack space={5}>
                                <Input
                                    value={this.state.pname}
                                    placeholder='Name'
                                    onChangeText={(pname) => this.setState({ pname, invalid: "" })}
                                />
                                <Input
                                    value={this.state.email}
                                    placeholder='Email Name'
                                    onChangeText={(email) => this.setState({ email, invalid: "" })}
                                />
                                {/* <HStack> */}
                                {/* <Select
                                        flex={0.4}
                                        placeholder="Select Country Code"
                                        selectedValue={"+971"}
                                        onValueChange={(itemValue) => console.warn("ok")}
                                        isDisabled
                                    >
                                        <Select.Item label="+971" value="+971" />
                                    </Select> */}
                                <InputGroup>
                                    <InputLeftAddon children={"+971"} />
                                    <Input keyboardType='phone-pad' flex={1} placeholder={"1234567890"} onChangeText={(phone) => this.setState({ phone, invalid: "" })} />
                                </InputGroup>
                                {/* </HStack> */}
                            </VStack>
                            <FormControl.ErrorMessage>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <LGButton
                            isLoading={this.state.loading}
                            isLoadingText="Submitting"
                            onPress={this.onPress}
                            title={"Get A Qoute"}
                        />
                        <Heading>
                            Terms & Conditions
                        </Heading>
                        {/* <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text> */}
                        <Image
                            width={"100%"}
                            height={200}
                            resizeMode="stretch"
                            source={require("../../../assets/terms.png")}
                        />
                    </VStack>
                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    TradeIn: (data) => dispatch(GeneralMiddleware.TradeIn(data)),
    showAlert: (data) => dispatch(AlertAction.ShowAlert(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetail);