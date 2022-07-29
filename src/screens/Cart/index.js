import { Box, Center, FlatList, Heading, HStack, IconButton, Image, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import ProductActions from '../../redux/Actions/ProductActions';
import { connect } from 'react-redux';
import { img_url } from '../../configs/APIs';


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
        };
    }


    _renderItem = ({ item }) => {
        return (
            <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <HStack space={1} w={"full"} p={2}>
                    <Image alignSelf={"center"} h={90} w={"30%"} source={item.image ? { uri: img_url + item.image } : require("../../../assets/placeholder.png")} alt="Watch image" resizeMode='contain' />
                    <Stack space={1} w={"55%"}>
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

    getTotalPrice = () => {
        let total = 0;
        this.props.cart.forEach(itm => {
            total += parseInt(itm.price);
        })
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
                <Box p={3}>
                    <HStack justifyContent={"space-between"}>
                        <Text bold>Subtotal</Text>
                        <Text bold color={"primary.100"}>{this.getTotalPrice()} AED</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                        <Text bold>Tax</Text>
                        <Text bold color={"primary.100"}>10 AED</Text>
                    </HStack>
                    <HStack mb={3} justifyContent={"space-between"}>
                        <Text bold>Total</Text>
                        <Text bold color={"primary.100"}>50000 AED</Text>
                    </HStack>
                    <LGButton
                        onPress={() => this.props.navigation.navigate("Checkout")}
                        title={"Review payment and address"}
                    />
                </Box>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    cart: state.Product.cart,
})

const mapDispatchToProps = dispatch => ({
    removeFromCart: data => dispatch(ProductActions.RemoveFromCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);