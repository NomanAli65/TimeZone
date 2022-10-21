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
import numbro from "numbro";
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            b_pickup: false,
            title: "My Address",
            address: this.props.user?.user?.address + ", " + this.props.user?.user.city + ", " + this.props.user?.user.country,
            loading: false,
            tax: this.props.route?.params?.tax,
            tax_loading: true
        };
    }

    componentDidMount() {
        this.props.getAllMethods({
            onSuccess: () => {
            }
        })
        this.props.getTax({
            onSuccess: (success) => {
                if (success) {
                    this.setState({ tax: success?.vat_percent, tax_loading: false })
                }
            }
        });
    }

    _renderItem = ({ item }) => {
        let formatted_price = numbro(item?.price).formatCurrency({
            thousandSeparated: true,
            abbreviations: {
                thousand: "k",
                million: "m"
            },
            currencySymbol: "AED "
        })
        return (
            <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <HStack space={1} w={"full"} p={2}>
                    <Image alignSelf={"center"} h={90} w={"30%"} mr={2} borderRadius={5} source={item.image ? { uri: img_url + item.image } : require("../../../assets/placeholder.png")} alt="Watch image" resizeMode='cover' />
                    <Stack space={1} w={"70%"}>
                        <Heading size={"sm"} flexWrap={"wrap"} mr={2} height={35}>
                            {item.product_name}
                        </Heading>
                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                            Reference Number:
                        </Text>
                        <Text mt={-2}>{item?.ref_number ? item?.ref_number : "No reference number available"}</Text>
                        <Text fontSize={"12"} color={"primary.100"} flexWrap={"wrap"} numberOfLines={3} bold>
                            {formatted_price}
                            {/* <Text color={item.discount?.discount_value ? "red.500" : "primary.100"} textDecorationLine={item.discount?.discount_value ? "line-through" : "none"}>{item.price} AED</Text>
                            {
                                item.discount?.discount_value ?
                                    <Text color={"primary.100"}> {
                                        item.discount?.discount_type == "fixed" ?
                                            item.price - item.discount?.discount_value
                                            :
                                            item.price - (item.price / 100 * item.discount?.discount_value)
                                    } AED</Text>
                                    : null
                            } */}
                        </Text>
                    </Stack>
                </HStack>
            </Box>
        )
    }

    getTotalPrice = (tax = 0) => {
        let total = 0;
        // this.props.cart.forEach(itm => {
        //     total += parseInt(itm.discount?.discount_type == "fixed" ?
        //         itm.price - itm.discount?.discount_value
        //         :
        //         itm.price - (itm.price / 100 * itm.discount?.discount_value));
        // })
        this.props.cart.forEach(itm => {
            total += parseInt(itm.price);
        })
        total += total / 100 * tax;
        let formatted_price = numbro(total).formatCurrency({
            thousandSeparated: true,
            abbreviations: {
                thousand: "k",
                million: "m"
            },
            currencySymbol: "AED "
        })
        return formatted_price;
    }

    PlaceOrder = () => {
        if (!this.state.address) {
            this.props.showAlert({
                title: "Address",
                message: "Please add address to continue",
                status: "error"
            })
            return;
        }
        if (this.props.all_methods.length == 0) {
            this.props.showAlert({
                title: "Payment Method",
                message: "Please add payment method to continue",
                status: "error"
            })
            return;
        }
        this.setState({ loading: true })
        let total = 0;
        this.props.cart.forEach(itm => {
            total += parseInt(itm.price);
        })
        let cart = this.props.cart.map(item => {
            return ({
                product_id: item.id,
                discount_amount: parseInt(item.discount ? (item.discount?.discount_type == "fixed" ?
                    item.discount?.discount_value
                    :
                    (item.price / 100 * item.discount?.discount_value)) : 0),
                price: item.price,
                product_total: parseInt(item.discount ? (item.discount?.discount_type == "fixed" ?
                    item.price - item.discount?.discount_value
                    :
                    item.price - (item.price / 100 * item.discount?.discount_value)) : item.price),
            })
        })
        let b_pickup = this.state.b_pickup ? 1 : 0;
        this.props.placeOrder({
            b_pickup,
            cart,
            sub_total: total,
            tax_amount: this.getTotalPrice() / 100 * this.props.user.vat.vat_percent,
            total: total,
            address: this.state.address,
            source_id: this.props.all_methods.find(val => val.is_default == "1").stripe_card_id,
            onSuccess: (success) => {
                this.setState({ loading: false })
                if (success) {
                    this.props.showAlert({
                        title: "Thank you for your order",
                        message: "Your order has been successfully placed"
                    })
                    this.props.navigation.goBack()
                }
            }
        })
    }

    getTotalTax = (tax = 0) => {
        let total = 0;
        this.props.cart.forEach(itm => {
            total += parseInt(itm.price);
        })
        total = total / 100 * tax;
        return total;
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
                                    <Icon as={Entypo} name='edit' size={6} onPress={() => this.props.navigation.navigate("AllAddress", { setAddress: (title, address) => this.setState({ address, title }) })} />
                                </HStack>
                                <VStack>
                                    <Text bold>
                                        {this.state.title}
                                    </Text>
                                    <Text>
                                        {this.state.address}
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
                                    {/* <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Subtotal
                                        </Text>
                                        <Text color={"primary.100"} bold>{this.getTotalPrice()} AED</Text>
                                    </HStack> */}
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            VAT
                                        </Text>
                                        <Text color={"primary.100"} bold>AED {this.getTotalTax(this.state.tax)} </Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"}>
                                        <Text bold>
                                            Total
                                        </Text>
                                        <Text color={"primary.100"} bold>{this.getTotalPrice()}</Text>
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
    getTax: (data) => dispatch(AuthMiddleware.getTax(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

