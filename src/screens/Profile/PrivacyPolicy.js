import { Heading, Image, ScrollView, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title="Privacy Policy"
                    noWish
                    noCart
                    back
                />
                <ScrollView style={{ flex: 1 }}>
                    <Image alignSelf={"center"} source={require("../../../assets/tz_logo.png")} size={"48"} />
                    <VStack p={5}>
                        <Text fontSize="md">
                            This is the Online Privacy Policy of Timezone Watches. This policy is applicable to the online activities Timezone Watches engages in on its website only and is not applicable to the “offline” activities or such activities that are unrelated to the website. Timezone Watches compiles certain anonymous data pertaining to the usage of the website. This information does not at any point personally identify any of its users, by itself alone or any in combination with other kinds of information, and it is only gathered to improve the performance of the website. The anonymous data as collected by Timezone Watches’s website includes information that can be about- the type of browser that a consumer uses, and the amount of time that a user spends on the website. You can be asked to provide personal identification related information on the Timezone Website, which can include your name, address, telephone number, and e-mail address. This information is collected in either of the following events – when feedback or e-mails are sent to Timezone Watches when you make a registration for any services, or make purchases through the website. In all such events, you have the option to provide to us information related to your personal identification.
                            {"\n"}
                        </Text>
                        <Heading bold fontWeight={"bold"}>
                            Use and Disclosure of the Information
                        </Heading>
                        <Text>
                            Other than the below stated, at any point, we do not sell, trade, or rent the information related to your personal identification that is collected on the website, to any other third party. The information that is collected by our website is used to process orders, to send across communications to you, to notify you time and again of products or special offers that may/may not be of interest to you, and for statistical reasons that aids in improving the overall functionality of our website. We can disclose the information pertaining to your personal identification to third parties for tracking the orders or to process your cheque /money order, as applicable, fill up your order, conduct statistical data analysis to deliver your order, send across promotional emails to you and to improve the overall functionality of our website.
                            {"\n"}
                        </Text>
                        <Heading bold>
                            Third Party Websites
                        </Heading>
                        <Text>
                            Timezone Watches is not responsible in any way for the privacy policies of the other websites to which it links for any purposes. If you consciously provide any information to such third parties, separate terms & conditions regarding the collection and use of your personal information may be applicable. We strongly suggest you to review such Privacy Policy of the third party website before providing any data to them. We are not responsible in any way for the policies/ practices of third parties. Please be aware that our websites may contain links to other third party websites on the Internet that are not owned or operated by us. The information practices/ Privacy Policy of those Websites linked to our site is not in any way covered by this Privacy Policy. We cannot control the collection of information, if at all by such linked third party websites. You should contact such entities directly if you have any queries regarding the use of your personal information that they might collect
                            {"\n"}
                        </Text>
                        <Heading bold>
                            Data Privacy & Security
                        </Heading>
                        <Text>
                            Timezone Watches takes appropriate measures to ensure data privacy and data security of all the information that it collects and processes. This includes thorough hardware and software methodologies of data protection and security. However, Timezone Watches cannot guarantee the security of any kind of information that is or can be disclosed online.
                        </Text>
                    </VStack>
                </ScrollView>
            </View>
        );
    }
}
