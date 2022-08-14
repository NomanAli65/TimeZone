import { Box, Button, Divider, FlatList, Heading, HStack, Icon, Image, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { AlertTypes } from '../../redux/ActionTypes/AlertActions';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { img_url } from '../../configs/APIs';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_pickup: false,
            loading: false
        };
    }

    componentDidMount() {
        this.props.getAllMethods({
            onSuccess: () => {
            }
        })
    }

    _renderItem = ({ item }) => {
        return (
            <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <HStack space={1} w={"full"} p={2}>
                    <Image alignSelf={"center"} h={90} w={"30%"} source={item.image ? { uri: img_url + item.image } : require("../../../assets/placeholder.png")} alt="Watch image" resizeMode='contain' />
                    <Stack space={1} w={"70%"}>
                        <Heading size={"sm"}>
                            {item.product_name}
                        </Heading>
                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                            {item.description}
                        </Text>
                        <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                            <Text color={"primary.100"}>{item.price} AED</Text>
                        </Text>
                    </Stack>
                </HStack>
            </Box>
        )
    }

    getTotalPrice = (tax = 0) => {
        let total = 0;
        this.props.cart.forEach(itm => {
            total += parseInt(itm.price);
        })
        total += total / 100 * tax;
        return total;
    }

    PlaceOrder = () => {
        this.setState({ loading: false })
        let cart = this.props.cart.map(item => {
            return ({
                product_id: item.id,
                discount_amount: item.discount.discount_price,
                product_total: item.price,
            })
        })
        let b_pickup = this.state.b_pickup ? 1 : 0;
        this.props.placeOrder({
            b_pickup,
            cart,
            sub_total: this.getTotalPrice(),
            tax_amount: this.getTotalPrice() / 100 * this.props.user.vat.vat_percent,
            total: this.getTotalPrice(this.props.user.vat.vat_percent),
            address:"",
            onSuccess: () => {
                this.setState({ loading: false })
                this.props.showAlert({
                    title: "Thank you for your order",
                    message: "Your order has been successfully placed"
                })
                this.props.navigation.goBack()
            }
        })
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
                                        {this.props.all_methods.length != 0 ?
                                            "xxxx-xxxx-xxxx-" + this.props.all_methods.find(val => val.is_default == "1").card_end_number
                                            : ""}
                                    </Text>
                                </VStack>
                            </VStack>
                        </Box>
                        <Button onPress={() => this.setState({ b_pickup: !this.state.b_pickup })} variant={this.state.b_pickup ? "solid" : "outline"}>
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
                                <FlatList
                                    renderItem={this._renderItem}
                                    data={this.props.cart}
                                />
                                <Divider />
                                <VStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Subtotal
                                        </Text>
                                        <Text color={"primary.100"}>{this.getTotalPrice()} AED</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Tax
                                        </Text>
                                        <Text color={"primary.100"}>{this.props.user.vat.vat_percent} %</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Total
                                        </Text>
                                        <Text color={"primary.100"}>{this.getTotalPrice(this.props.user.vat.vat_percent)} AED</Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </Box>
                        <LGButton
                            title={"Place Order"}
                            isLoading={this.state.loading}
                            isLoadingText="Placing your order"
                            onPress={() => {
                                this.PlaceOrder()
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
    all_methods: state.User.methods,
    user: state.Auth.user,

})

const mapDispatchToProps = dispatch => ({
    showAlert: (payload) => dispatch({ type: AlertTypes.SHOW_ALERT, payload }),
    placeOrder: (payload) => dispatch(ProductMiddleware.PlaceOrder(payload)),
    getAllMethods: data => dispatch(UserMiddleware.getAllMethods(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

