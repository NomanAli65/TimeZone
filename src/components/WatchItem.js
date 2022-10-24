import React, { useEffect, useState } from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, useColorModeValue, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { img_url } from "../configs/APIs";
import { ProductMiddleware } from "../redux/Middlewares/ProductMiddleware";
import numbro from "numbro";


const WatchItem = ({ loading, description, item, halfScreen, index }) => {

    let wish = Boolean(item.wishlist);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.Auth.isLogin);
    const color = useColorModeValue("#5c5c5c", "#cccc");
    const [wishlist, addToWishlist] = useState(false);
    const [price, setPrice] = useState(false);

    useEffect(() => {
        addToWishlist(wish);
    }, [wish])

    const onlyNumbers = (str) => {
        return /^[0-9]*$/.test(str);
    }

    useEffect(() => {
        addToWishlist(wish);
        let formatted_price = !onlyNumbers(item?.price) ? item?.price : numbro(item?.price).formatCurrency({
            thousandSeparated: true,
            abbreviations: {
                thousand: "k",
                million: "m"
            },
            currencySymbol: "AED "
        })
        setPrice(formatted_price)
    }, [])

    if (loading)
        return (
            <Box
                _dark={{
                    backgroundColor: "gray.800"
                }}
                w={halfScreen ? "49%" : 200} mr={halfScreen ? (index % 2 == 0 ? 2 : 0) : 3} mb={halfScreen ? 2 : 0} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4}>
                    <Skeleton h={150} w={"100%"} />
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
                w={halfScreen ? "49%" : 200} mr={halfScreen ? (index % 2 == 0 ? 2 : 0) : 3} mb={halfScreen ? 2 : 0} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Pressable onPress={() => navigation.navigate("ProductDetail", { item })}>
                    <Stack space={4}>
                        <Image h={halfScreen ? 150 : 180} w={"100%"} source={item?.image ? { uri: img_url + item.image } : require("../../assets/placeholder.png")} alt="Watch Image" resizeMode='cover' />
                        <Stack space={1} p={3} pt={0}>
                            <Heading
                                numberOfLines={2}
                                height={halfScreen ? 35 : 45}
                                size={halfScreen ? "sm" : "md"}>
                                {item?.product_name}
                            </Heading>
                            {
                                description ?
                                    <Text fontSize={halfScreen ? "13" : "14"} flexWrap={"wrap"} numberOfLines={halfScreen ? 2 : 3}>
                                        {item?.description}
                                    </Text>
                                    :
                                    <Box>
                                        <Text fontSize={halfScreen ? "11" : "12"} flexWrap={"wrap"} numberOfLines={halfScreen ? 2 : 3}>
                                            Reference Number:
                                        </Text>
                                        <Text fontSize={halfScreen ? "11" : "12"} flexWrap={"wrap"} numberOfLines={1}>
                                            {"\n" + item?.ref_number ? item?.ref_number : "No reference number available"}
                                        </Text>
                                    </Box>
                            }
                            {/* <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                            Price on Request
                        </Text> */}
                            <VStack>
                                <HStack alignItems={"center"} space={1}>
                                    <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                        {onlyNumbers(item?.price) ? "PRICE" : ""} <Text color={"primary.100"} >{price}</Text>
                                    </Text>
                                    {/* <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                        PRICE <Text color={item.discount?.discount_value ?"red.500":"primary.100"} textDecorationLine={item.discount?.discount_value ? "line-through" : "none"} >{item.price} AED</Text>
                                    </Text>
                                    {
                                        item.discount?.discount_value ?
                                            <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                                <Text color={"primary.100"}>
                                                    {
                                                        item.discount?.discount_type == "fixed" ?
                                                            item.price - item.discount?.discount_value
                                                            :
                                                            item.price - (item.price / 100 * item.discount?.discount_value)
                                                    } AED</Text>
                                            </Text> :
                                            null
                                    } */}
                                </HStack>
                                {/* <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                           RETAIL PRICE <Text color={"gray.400"}>4000 AED</Text> 
                        </Text>
                        <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                           SAVING <Text color={"red.500"}>4000 AED</Text> 
                        </Text> */}
                            </VStack>
                        </Stack>
                    </Stack>
                    <IconButton
                        onPress={() => {
                            if (!loggedIn)
                                navigation.navigate("Login")
                            else {
                                //  wish = !wish;
                                addToWishlist(!wishlist);
                                dispatch(ProductMiddleware.saveToWishlist(item))
                            }
                        }}
                        position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name={wishlist ? "heart" : 'hearto'} size={20} color={wishlist ? "red" : color} />} />
                </Pressable >
            </Box>
        )
};

export default WatchItem;
