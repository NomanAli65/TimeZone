import { Box, Divider, FlatList, Heading, HStack, IconButton, Image, Pressable, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, View as RNView, Image as RNImage, Share } from "react-native";
import AppBar from '../../components/Appbar';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../configs/Theme';
import LGButton from '../../components/LGButton';
import { Video } from 'expo-av';
import { img_url } from "../../configs/APIs";
import ProductActions from '../../redux/Actions/ProductActions';
import { connect } from 'react-redux';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';
import numbro from "numbro";
import ImageView from "react-native-image-viewing";

const { width } = Dimensions.get("window");

const data = [
    require("../../../assets/watch.png"),
    require("../../../assets/wt.png"),
    require("../../../assets/watchd.png"),
]

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        let data = this.props.route.params?.item;
        this.state = {
            wishlist: Boolean(data.wishlist),
            selectedImage: img_url + data.image,
            imageModal: false
        };
    }

    _renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => this.setState({ selectedImage: img_url + item.media })}>
                <Box w={110} h={90} alignItems="center" mr={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <Image alignSelf={"center"} h={"100%"} w={"100%"} source={{ uri: img_url + item.media }} alt="image" resizeMode='cover' />
                </Box>
            </Pressable>
        )
    }

    formatString = (str = "") => {
        if (str) {
            let strr = str;
            let firstLetter = strr.charAt(0).toUpperCase();
            let newStr = firstLetter + strr.substring(1, str.length);
            return newStr;
        }
        else
            return "No info available"
    }

    AddRemoveCart = (now) => {
        let data = this.props.route.params?.item;
        let index = this.props.cart.length > 0 ? this.props.cart.findIndex(val => val.id == data.id) : -1;

        if (now && this.props.loggedIn) {
            if (index == -1) {
//                this.props.emptyCart();
                this.props.addToCart(data)
            }
            this.props.navigation.navigate("Checkout")
        }
        else {
            if (index == -1) {
                this.props.addToCart(data)
            }
            else {
                this.props.removeFromCart(data)
            }
        }
    }

    checkAndRender = (heading, value) => {
        if (value) {
            return (
                <>
                    <HStack justifyContent={"space-between"}>
                        <Text bold>
                            {heading}
                        </Text>
                        <Text color={"primary.100"}>
                            {this.formatString(value)}
                        </Text>
                    </HStack>
                    <Divider />
                </>
            )
        }
        else null
    }


    render() {
        let data = this.props.route.params?.item;
        let index = this.props.cart.length > 0 ? this.props.cart.findIndex(val => val.id == data.id) : -1;
        let formatted_price = numbro(data?.price).formatCurrency({
            thousandSeparated: true,
            abbreviations: {
                thousand: "k",
                million: "m"
            },
            currencySymbol: "AED "
        })
        return (
            <View flex={1}
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: "#000"
                }}
            >
                <ScrollView>
                    <AppBar
                        back
                        noCart
                        noWish
                        title={"TIMEZONE"}
                    />
                    <RNView onTouchEnd={() => this.setState({ imageModal: true })} style={{ width }}>
                        <RNImage source={{ uri: this.state.selectedImage }} style={{ width, height: 250 }} resizeMode="cover" />
                    </RNView>
                    {data.images.length > 0 ?
                        <FlatList
                            p={3}
                            horizontal
                            data={data.images}
                            renderItem={this._renderItem}
                        />
                        : null
                    }
                    <VStack space={3} p={4}>
                        <HStack justifyContent={"space-between"} >
                            <VStack flex={1}>
                                <Heading>
                                    {data.product_name}
                                </Heading>
                                <HStack alignItems={"center"} space={2}>
                                    {/* {data.discount?.discount_value ? <Heading textDecorationLine="none" fontSize={"xl"} color={"primary.100"}>
                                        {
                                            data.discount?.discount_type == "fixed" ?
                                                data.price - data.discount?.discount_value
                                                :
                                                data.price - (data.price / 100 * data.discount?.discount_value)
                                        } AED
                                    </Heading> : null} 
                                    <Heading fontSize={data.discount?.discount_value ? "sm" : "xl"} color={data.discount?.discount_value ? "red.500" : "primary.100"} textDecorationLine={data.discount?.discount_value ? "line-through" : "none"}>
                                        {data.price} AED
                                    </Heading>
                                    */}
                                    <Heading fontSize={"xl"} color={"primary.100"}>
                                        <Heading fontSize={"md"} color={"black"}>PRICE:</Heading>  {formatted_price}
                                    </Heading>
                                </HStack>
                                <Text>
                                    <Text>Reference Number:</Text>  {data?.ref_number ? data?.ref_number : "No reference number available"}
                                </Text>
                            </VStack>
                            <HStack alignItems={"flex-start"}>
                                <IconButton
                                    onPress={() => Share.share({
                                        title: "TIMEZONE",
                                        url: "app.timezone.com/product_id/" + data.id,
                                        message: "Check out this watch on timezone\n" + data.product_name + "\napp.timezone.com/product_id/" + data.id
                                    })}
                                    icon={<AntDesign name='sharealt' size={20} color={theme.colors.primary[100]} />} />
                                <IconButton
                                    onPress={() => {
                                        if (!this.props.loggedIn)
                                            this.props.navigation.navigate("Login")
                                        else {
                                            this.setState({ wishlist: !this.state.wishlist });
                                            this.props.addToWish(data)
                                        }
                                    }}
                                    icon={<AntDesign name={this.state.wishlist ? "heart" : 'hearto'} size={20} color={theme.colors.primary[100]} />} />
                            </HStack>
                        </HStack>
                        <Text>
                            {data.description}
                        </Text>
                        {this.checkAndRender("SKU", data?.sku)}
                        {this.checkAndRender("Brand", data?.brand?.brand_name)}
                        {this.checkAndRender("Condition", data?.condition)}
                        {this.checkAndRender("Box & Papers", data?.box)}
                        {this.checkAndRender("Year", data?.year)}
                        {this.checkAndRender("Manufactured In", data?.manufactured_in)}
                        {this.checkAndRender("Availability", data?.availability == 1 ? "In Stock" : "Out of Stock")}
                        {this.checkAndRender("Gender", data?.gender)}
                        {this.checkAndRender("Category", data?.category?.category_name)}
                        <Heading marginTop={3} fontSize={"2xl"} >
                            Case & Dial
                        </Heading>
                        {this.checkAndRender("Dial Color", data?.color)}
                        {this.checkAndRender("Case Size", data?.case_size)}
                        {this.checkAndRender("Case Material", data?.case_material)}
                        {this.checkAndRender("Hour Marker", data?.hours_marked)}
                        {this.checkAndRender("Case Back", data?.case_back)}
                        {this.checkAndRender("Case Shape", data?.case_shape)}
                        {this.checkAndRender("Water Resistance", data?.water_resistance)}
                        {this.checkAndRender("Movement", data?.movement)}
                        <Heading marginTop={3} fontSize={"2xl"} >
                            Strap & Bracelet
                        </Heading>
                        {this.checkAndRender("Strap & Bracelet Material", data?.strap_material)}
                        {this.checkAndRender("Band Color", data?.band_color)}
                        {this.checkAndRender("Buckle Type", data?.buckle_type)}
                        {
                            data.videos.length > 0 ?
                                <Box w={"100%"} h={200}>
                                    <Video
                                        useNativeControls
                                        //source={{uri:"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"}}
                                        // source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                                        source={{ uri: img_url + data.videos[0].media }}
                                        posterSource={{ uri: "https://www.mapcom.com/wp-content/uploads/2015/07/video-placeholder.jpg" }}
                                        style={{
                                            width: "100%",
                                            height: 200,
                                        }}
                                        posterStyle={{
                                            width: "100%",
                                            height: 200
                                        }}
                                        resizeMode="cover"
                                    />
                                </Box>
                                : null
                        }

                    </VStack>
                </ScrollView>
                <HStack justifyContent={"space-around"}>
                    <Pressable w={"50%"} onPress={() => this.AddRemoveCart(false)}>
                        <Box backgroundColor={"black"} h="12" w={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"white"} fontSize={"md"}>
                                {index == -1 ? "Add to cart" : "Remove from cart"}
                            </Text>
                        </Box>
                    </Pressable>
                    <Pressable w={"50%"} onPress={() => this.AddRemoveCart(true)}>
                        <Box backgroundColor={"primary.100"} h="12" w={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"white"} fontSize={"md"}>
                                Buy now
                            </Text>
                        </Box>
                    </Pressable>
                </HStack>
                {
                    data?.images.length > 0 ?
                        <ImageView
                            images={data?.images?.map(img => ({ uri: img_url + img.media }))}
                            imageIndex={0}
                            visible={this.state.imageModal}
                            onRequestClose={() => this.setState({ imageModal: false })}
                            FooterComponent={({ imageIndex }) => (
                                <Text textAlign={"center"} m={3} fontSize={"xl"} color={"#fff"}>{(imageIndex + 1) + " of " + data?.images?.length}</Text>
                            )}
                        /> :
                        null
                }

            </View>
        );
    }
}


const mapStateToProps = state => ({
    cart: state.Product.cart,
    loggedIn: state.Auth.isLogin
})

const mapDispatchToProps = dispatch => ({
    addToCart: data => dispatch(ProductActions.AddToCart(data)),
    emptyCart: data => dispatch(ProductActions.EmptyCart()),
    removeFromCart: data => dispatch(ProductActions.RemoveFromCart(data)),
    addToWish: data => dispatch(ProductMiddleware.saveToWishlist(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);