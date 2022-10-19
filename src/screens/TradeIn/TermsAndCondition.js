import { Alert, Button, FormControl, Heading, HStack, Image, Input, InputGroup, InputLeftAddon, Pressable, ScrollView, Select, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';

class TermsAndCondition extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <View flex={1}>
                    {/* <AppBar
                        noCart
                        noWish
                        back
                        title={"Terms And Condition"}
                    /> */}
                    <VStack p={3} space={5} alignItems="center">
                        <Heading textAlign={"center"} bold fontSize={"3xl"}>Hassle Free Used {"\n"} Watches for Sale In Dubai</Heading>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/virtual-evaluation.png")} />
                        <Heading>
                            Virtual Evaluation
                        </Heading>
                        <Text mt={-5}>
                            Via our interactive form tell us about the watch with the details and the pictures. Receive a quote.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/speak-expert.png")} />
                        <Heading>
                            Speak to our Expert
                        </Heading>
                        <Text mt={-5}>
                            Our expert would assist you with further clarification and would schedule a pickup for your watch.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/physical-evaluation.png")} />
                        <Heading>
                            Physical Evaluation
                        </Heading>
                        <Text mt={-5}>
                            After we receive your watch, we would thoroughly evaluate it to understand its condition and usage history.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/get-paid.png")} />
                        <Heading>
                            Get Paid
                        </Heading>
                        <Text mt={-5}>
                            Immediately after the evaluation, we make payment to you via bank transfer or cheque.
                        </Text>
                    </VStack>
                    <VStack p={3} space={5} alignItems="center" mt={5}>
                        <Heading textAlign={"center"} bold fontSize={"3xl"}>Why sell to us?</Heading>
                        <Text mt={-5}>
                            We have an in-house team of watch experts and technicians who are skilled assess the right value of your timeless timepiece. With this, we make sure that you receive the highest value for your luxury watches in Dubai and its surroundings. We also have our own service stations fully equipped with all the necessary technology to service your watch to make it work and look like a brand-new model. Hence, we have the necessary knowledge, expertise, and market presence to sell your watch at the best possible price.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/trade_footer_icon.png")} />
                        <Heading>
                            IMMEDIATE PAYMENT
                        </Heading>
                        <Text mt={-5}>
                            Get paid within 72 hours straight after we receive your watch.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/trade_shiping_icon.png")} />
                        <Heading>
                            FREE SHIPPING
                        </Heading>
                        <Text mt={-5}>
                            We proceed free complimentary shipping with the full value of your watch insured.
                        </Text>
                        <Image resizeMode='contain' size={12} source={require("../../../assets/trade_value_paid.png")} />
                        <Heading>
                            BEST PAYMENTS
                        </Heading>
                        <Text mt={-5}>
                            We pay better than a host of other dealers for your luxury watch.
                        </Text>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsAndCondition);