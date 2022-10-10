import { Box, Center, FlatList, Heading, HStack, IconButton, Image, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import ProductActions from '../../redux/Actions/ProductActions';
import { connect } from 'react-redux';
import { img_url } from '../../configs/APIs';
import numbro from "numbro";
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';


const data = [
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    },
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    },
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    },
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    },
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    },
    {
        name: "Rolex with diamonds",
        desc: "watch with diamonds in its dial and it looks beautiful to watch",
        image: require("../../../assets/wt.png")
    }
]

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tax: this.props.user?.vat?.vat_percent,
            loading: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener("focus", () => {
            this.setState({ loading: true })
            this.props.getTax({
                onSuccess: (success) => {
                    if (success) {
                        this.setState({ tax: success?.vat_percent, loading: false })
                    }
                }
            });
        })
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
                    <Image alignSelf={"center"} h={90} w={"30%"} mr={2} source={item.image ? { uri: img_url + item.image } : require("../../../assets/placeholder.png")} alt="Watch image" resizeMode='cover' borderRadius={5} />
                    <Stack space={1} w={"55%"}>
                        <Heading size={"sm"}>
                            {item.product_name}
                        </Heading>
                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                            <Text>Reference Number:</Text>  {item?.ref_number ? item?.ref_number : "No reference number available"}
                        </Text>
                        <Text fontSize={"12"} color={"primary.100"} flexWrap={"wrap"} numberOfLines={3} bold>
                            {formatted_price}
                            {/* <Text color={item.discount?.discount_value ?"red.500":"primary.100"} textDecorationLine={item.discount?.discount_value ? "line-through" : "none"}>{item.price} AED</Text>
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
                    <IconButton
                        onPress={() => this.props.removeFromCart(item)}
                        ml={1} alignSelf={"center"} icon={<AntDesign name='delete' size={25} />}
                        _dark={{
                            color: "#fff"
                        }} />
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
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Cart"}
                    noCart
                    noWish
                    noLeftIcon
                />
                <FlatList
                    p={3}
                    mb={2}
                    renderItem={this._renderItem}
                    data={this.props.cart}
                />
                {
                    this.props.cart.length == 0 ?
                        <Box flex={1} p={5} >
                            <Center>
                                <Heading mb={3} fontSize={17} textAlign="center">
                                    No items available in your cart
                                </Heading>
                            </Center>
                        </Box> :
                        null
                }
                {
                    this.props.cart.length != 0 && this.state.tax ?
                        <Box p={3}>
                            {/* <HStack justifyContent={"space-between"}>
                                <Text bold>Subtotal</Text>
                                <Text bold color={"primary.100"}>{this.getTotalPrice()} AED</Text>
                            </HStack> */}
                            <HStack justifyContent={"space-between"}>
                                <Text bold>VAT</Text>
                                <Text bold color={"primary.100"}>{this.state.loading?"Getting updated tax":this.getTotalTax(this.state.tax)}</Text>
                            </HStack>
                            <HStack mb={3} justifyContent={"space-between"}>
                                <Text bold>Total</Text>
                                <Text bold color={"primary.100"}>{this.getTotalPrice()} AED</Text>
                            </HStack>
                            <LGButton
                                onPress={() => {
                                    if (!this.state.tax) {
                                        alert("Wait while tax is calculating")
                                        return;
                                    }

                                    if (this.props.user?.user)
                                        this.props.navigation.navigate("Checkout", { tax: this.state.tax })
                                    else
                                        this.props.navigation.navigate("Login")
                                }}
                                title={"Review payment and address"}
                            />
                        </Box>
                        :
                        null}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    user: state.Auth.user,
    cart: state.Product.cart,
})

const mapDispatchToProps = dispatch => ({
    removeFromCart: data => dispatch(ProductActions.RemoveFromCart(data)),
    getTax: (data) => dispatch(AuthMiddleware.getTax(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(index);