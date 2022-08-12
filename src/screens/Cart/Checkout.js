import { Box, Button, Divider, Heading, HStack, Icon, ScrollView, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { AlertTypes } from '../../redux/ActionTypes/AlertActions';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView
            backgroundColor="#fff"
            _dark={{
                backgroundColor: "black"
            }}>
                <View flex={1}>
                    <AppBar
                        noWish
                        noCart
                        back
                        title="Checkout"
                    />
                    <VStack p={3} space={5}>
                        <Box borderWidth={1} borderColor={"gray.200"} _dark={{ borderColor: "gray.600" }}>
                            <VStack p={3} space={7}>
                                <HStack>
                                    <Icon as={Entypo} name="location-pin" size={8} />
                                    <Heading ml={2} flex={1}>
                                        Delivery Address
                                    </Heading>
                                    <Icon as={Entypo} name='edit' size={6} onPress={() => { }} />
                                </HStack>
                                <VStack>
                                    <Text bold>
                                        Home
                                    </Text>
                                    <Text>
                                        House no 12, UAE
                                    </Text>
                                </VStack>
                            </VStack>
                        </Box>
                        <Box borderWidth={1} borderColor={"gray.200"} _dark={{ borderColor: "gray.600" }}>
                            <VStack p={3} space={7}>
                                <HStack>
                                    <Icon as={Entypo} name="wallet" size={8} />
                                    <Heading ml={2} flex={1}>
                                        Payment Method
                                    </Heading>
                                    <Icon as={Entypo} name='edit' size={6} onPress={() => { this.props.navigation.navigate("Payments") }} />
                                </HStack>
                                <VStack>
                                    <HStack>
                                        <Icon as={Entypo} name="credit-card" size={6} />
                                        <Text bold ml={2}>
                                            Card
                                        </Text>
                                    </HStack>
                                    <Text>
                                        xxxx-xxxx-xxxx-1234
                                    </Text>
                                </VStack>
                            </VStack>
                        </Box>
                        <Button variant={"outline"}>
                            Boutique Pick up
                        </Button>
                        <Box borderWidth={1} borderColor={"gray.200"} _dark={{ borderColor: "gray.600" }}>
                            <VStack p={3} space={7}>
                                <HStack>
                                    <Icon as={FontAwesome5} name="receipt" size={8} />
                                    <Heading ml={2} flex={1}>
                                        Order Summary
                                    </Heading>
                                </HStack>
                                <VStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Rolex Watch
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Rolex Watch
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Rolex Watch
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Rolex Watch
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                </VStack>
                                <Divider />
                                <VStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Subtotal
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Tax
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Total
                                        </Text>
                                        <Text color={"primary.100"}>AED 40000</Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Box>
                        <LGButton
                            title={"Place Order"}
                            onPress={() => {
                                this.props.showAlert({
                                    title: "Thank you for your order",
                                    message: "Your order has been successfully placed"
                                })
                            }
                            }
                        />
                    </VStack>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.Product.cart,
})

const mapDispatchToProps = dispatch => ({
    showAlert: (payload) => dispatch({ type: AlertTypes.SHOW_ALERT, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

