import { Box, Divider, FlatList, Heading, HStack, IconButton, Image, Pressable, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, View as RNView, Image as RNImage } from "react-native";
import AppBar from '../../components/Appbar';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../configs/Theme';
import LGButton from '../../components/LGButton';
import { Video } from 'expo-av';
import { img_url } from "../../configs/APIs";
import ProductActions from '../../redux/Actions/ProductActions';
import { connect } from 'react-redux';


//TODO:Add Video player


const { width } = Dimensions.get("window");

const data = [
    require("../../../assets/watch.png"),
    require("../../../assets/wt.png"),
    require("../../../assets/watchd.png"),
]

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    _renderItem = ({ item }) => {
        return (
            <Pressable>
                <Box w={160} h={120} alignItems="center" mr={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <Image alignSelf={"center"} h={"100%"} w={"100%"} source={item} alt="image" resizeMode='contain' />
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

    AddRemoveCart = () => {
        let data = this.props.route.params?.item;
        let index = this.props.cart.length > 0 ? this.props.cart.findIndex(val => val.id == data.id) : -1;
        if (index == -1) {
            this.props.addToCart(data)
        }
        else {
            this.props.removeFromCart(data)
        }
    }

    render() {
        let data = this.props.route.params?.item;
        let index = this.props.cart.length > 0 ? this.props.cart.findIndex(val => val.id == data.id) : -1;
        console.warn(this.props.cart);
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
                    <RNView style={{ width }}>
                        <RNImage source={{ uri: img_url + data.image }} style={{ width, height: 250 }} resizeMode="cover" />
                    </RNView>
                    <FlatList
                        p={3}
                        horizontal
                        data={data}
                        renderItem={this._renderItem}
                    />
                    <VStack space={3} p={4}>
                        <HStack justifyContent={"space-between"}>
                            <VStack>
                                <Heading>
                                    {data.product_name}
                                </Heading>
                                <Heading fontSize={"xl"} color={"primary.100"}>
                                    {data.price} AED
                                </Heading>
                            </VStack>
                            <HStack alignItems={"flex-start"}>
                                <IconButton icon={<AntDesign name='sharealt' size={20} color={theme.colors.primary[100]} />} />
                                <IconButton icon={<AntDesign name='hearto' size={20} color={theme.colors.primary[100]} />} />
                            </HStack>
                        </HStack>
                        <Text>
                            {data.description}
                        </Text>
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Color
                            </Text>
                            <Text color={"primary.100"}>
                                {this.formatString(data?.color?.color_name)}
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Condition
                            </Text>
                            <Text color={"primary.100"}>
                                {this.formatString(data?.condition)}
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Case Material
                            </Text>
                            <Text color={"primary.100"}>
                                {this.formatString(data?.case_material)}
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Availability
                            </Text>
                            <Text color={"primary.100"}>
                                {data?.availability == 1 ? "In Stock" : "Out of Stock"}
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Brand
                            </Text>
                            <Text color={"primary.100"}>
                                {this.formatString(data?.brand?.brand_name)}
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Gender
                            </Text>
                            <Text color={"primary.100"}>
                                {this.formatString(data?.gender)}
                            </Text>
                        </HStack>
                        <Box w={"100%"} h={200}>
                            <Video
                                useNativeControls
                                //source={{uri:"https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"}}
                                source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
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
                    </VStack>
                </ScrollView>
                <HStack justifyContent={"space-around"}>
                    <Pressable w={"50%"} onPress={this.AddRemoveCart}>
                        <Box backgroundColor={"black"} h="12" w={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"white"} fontSize={"md"}>
                                {index == -1 ? "Add to cart" : "Remove from cart"}
                            </Text>
                        </Box>
                    </Pressable>
                    <Pressable w={"50%"} >
                        <Box backgroundColor={"primary.100"} h="12" w={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"white"} fontSize={"md"}>
                                Buy now
                            </Text>
                        </Box>
                    </Pressable>
                </HStack>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    cart: state.Product.cart,
})

const mapDispatchToProps = dispatch => ({
    addToCart: data => dispatch(ProductActions.AddToCart(data)),
    removeFromCart: data => dispatch(ProductActions.RemoveFromCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);