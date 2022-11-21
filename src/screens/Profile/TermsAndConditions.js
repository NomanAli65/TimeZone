import { Image, ScrollView, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title="Terms & Condition"
                    noWish
                    noCart
                    back
                />
                <ScrollView style={{ flex: 1 }}>
                    <Image alignSelf={"center"} source={require("../../../assets/tz_logo.png")} size={"48"} />
                    <Text m={5} fontSize="md">
                        All online international orders will be verified through our website payment system to accommodate international card holders.
                        {"\n\n"}
                        Kindly note,
                        {"\n\n"}
                        that your order could be subjected to additional verification of address or product availability.
                        {"\n\n"}
                        At any step if you need additional information , you can get in touch with our Customer Support Expert.
                        {"\n\n"}
                        After the verification of your order a confirmation email will be sent to your registered email address.
                        {"\n\n"}
                        Kindly provide your email/phone number on which you are available immediately. This will help us in expediating your order requirements.
                        {"\n\n"}
                        If our verification department cannot reach to you due to any unforseen situation , your order could be delayed if your order is not approved due to reasons beyong our control, you will be notified via your registered email.
                    </Text>
                </ScrollView>
            </View>
        );
    }
}
