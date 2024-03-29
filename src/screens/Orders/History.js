import { Box, FlatList, Heading, HStack, IconButton, Image, Stack, Text, View, Spinner, Skeleton } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';
import { APIs, img_url } from '../../configs/APIs';


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

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: true
        };
    }


    componentDidMount() {
        this.props.getAllOrders({
            next_url: APIs.OrderHistory,
            callback: () => {
                this.setState({ loading: false })
            }
        })
    }

    _renderItem = ({ item }) => {
        if (this.state.loading)
            return (
                <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <HStack space={1} w={"full"} p={2}>
                        <Skeleton h={90} w={"30%"} />
                        <Stack space={1} w={"70%"}>
                            <Skeleton h={5} w="100%" mb={2} />
                            <Skeleton.Text />
                        </Stack>
                    </HStack>
                </Box>
            )
        else
            return (
                <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <HStack space={1} w={"full"} p={2}>
                        <Image alignSelf={"center"} maxH={90} maxW={"30%"} source={{ uri: img_url + item.order_detail[0].product_detail.image }} alt="image" resizeMode='contain' />
                        <Stack space={1} w={"70%"}>
                            <Heading size={"sm"}>
                                {item.order_detail[0].product_detail.product_name}
                            </Heading>
                            <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                                {item.order_detail[0].product_detail.description}
                            </Text>
                            <HStack justifyContent={"space-between"}>
                                <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                    <Text color={"primary.100"}>{item.total} AED</Text>
                                </Text>
                                <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3}>
                                    <Text color={"gray.400"}>{item.created_at ? new Date(item.created_at).toDateString() : ""}</Text>
                                </Text>
                            </HStack>
                        </Stack>
                    </HStack>
                </Box>
            )
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getAllOrders({
            next_url: APIs.OrderHistory,
            callback: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    onEndReached = () => {
        if (this.props.orders?.next_page_url) {
            this.setState({ loading: true })
            this.props.getAllOrders({
                next_url: this.props.orders?.next_page_url,
                callback: () => {
                    this.setState({ loading: false })
                }
            })
        }
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Order History"}
                    noCart
                    noWish
                    back
                />
                <FlatList
                    p={3}
                    mb={2}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    renderItem={this._renderItem}
                    data={this.state.loading && this.props.orders?.data.length == 0 ? [{}, {}, {}, {}, {}, {}] : this.props.orders?.data}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={
                        this.state.loading && this.props.orders?.data.length != 0 ?
                            <Box p={3}>
                                <Spinner size={"lg"} />
                            </Box>
                            : null
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.Product.orders,
    user: state.Auth.user,

})

const mapDispatchToProps = dispatch => ({
    showAlert: (payload) => dispatch({ type: AlertTypes.SHOW_ALERT, payload }),
    getAllOrders: data => dispatch(ProductMiddleware.getAllOrders(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(History);