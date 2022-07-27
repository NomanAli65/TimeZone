import { Alert, AlertDialog, AspectRatio, Box, Button, Center, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import { connect } from 'react-redux';
import Products from '../Products';
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

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            isOpen: false,
            selectedItem: null
        };
    }

    componentDidMount() {
        this.props.getWishlist({
            next_url: APIs.Wishlist,
            onSuccess: () => {
                this.setState({ loading: false })
            }
        })
    }

    _renderItem = ({ item }) => {
        if (this.state.loading)
            return (
                <Box _dark={{
                    backgroundColor: "black"
                }} w={"90%"} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" m={"5%"}>
                    <Stack space={4}>
                        <Skeleton h={200} w={"100%"} />
                        <Stack space={3} p={3}>
                            <Skeleton h={5} />
                            <Skeleton.Text />
                        </Stack>
                    </Stack>
                </Box>
            )
        else
            return (
                <Box
                    _dark={{
                        backgroundColor: "gray.800"
                    }}
                    w={"90%"} alignItems="center" backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" m={"5%"}>
                    <Stack space={4}>
                        <Image alignSelf={"center"} h={200} w={"100%"} 
                        source={item.product?.image ? { uri: img_url + item.product?.image } : require("../../../assets/placeholder.png")} 
                        alt="Watch image" resizeMode='contain' />
                        <Stack space={1} p={3}>
                            <Heading size={"md"}>
                                {item.product.product_name}
                            </Heading>
                            <Text flexWrap={"wrap"} numberOfLines={3}>
                                {item.product.description}
                            </Text>
                        </Stack>
                    </Stack>
                    <IconButton
                        onPress={() => this.onDelete(item.product)}
                        position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name='heart' size={20} color="red" />} />
                </Box>
            )
    }

    onEndReached = () => {
        if (!this.props.wishlist?.next_url)
            return;

        this.setState({ refreshing: true });
        this.props.getWishlist({
            next_url: this.props.wishlist?.next_url,
            onSuccess: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    onDelete = (item) => {
        this.setState({ selectedItem: item, isOpen: true });
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getWishlist({
            next_url: APIs.Wishlist,
            onSuccess: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    render() {
        return (
            <View
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: "#000"
                }}
                flex={1}>
                <AppBar
                    noLeftIcon
                    title={"Wishlist"}
                    noWish
                    noCart
                />
                <FlatList
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    keyExtractor={(item) => item.name}
                    data={this.state.loading ? [{}, {}, {}, {}] : this.props.wishlist?.data}
                    renderItem={this._renderItem}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.1}
                />
                <AlertDialog isOpen={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
                    <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>Remove From Wishlist</AlertDialog.Header>
                        <AlertDialog.Body>
                            Are you sure you want to remove this product from wishlist?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button variant="unstyled" colorScheme="coolGray" onPress={() => this.setState({ isOpen: false })}>
                                    Cancel
                                </Button>
                                <Button colorScheme="danger" onPress={() => {
                                    this.props.removeProductWishlist(this.state.selectedItem);
                                    this.setState({ isOpen: false });
                                }}>
                                    Remove
                                </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    wishlist: state.Product.wishlist
})

const mapDispatchToProps = dispatch => ({
    getWishlist: data => dispatch(ProductMiddleware.getWishlist(data)),
    removeProductWishlist: data => dispatch(ProductMiddleware.saveToWishlist(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);