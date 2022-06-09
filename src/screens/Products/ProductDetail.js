import { Box, Divider, FlatList, Heading, HStack, IconButton, Image, Pressable, ScrollView, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, View as RNView, Image as RNImage } from "react-native";
import AppBar from '../../components/Appbar';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../configs/Theme';
import LGButton from '../../components/LGButton';
import { Video } from 'expo-av';


//TODO:Add Video player


const { width } = Dimensions.get("window");

const data = [
    require("../../../assets/watch.png"),
    require("../../../assets/wt.png"),
    require("../../../assets/watchd.png"),
]

export default class ProductDetail extends Component {
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

    render() {
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
                        <RNImage source={require("../../../assets/1.jpg")} style={{ width, height: 250 }} resizeMode="cover" />
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
                                    Rolex watch
                                </Heading>
                                <Heading fontSize={"xl"} color={"primary.100"}>
                                    40000 AED
                                </Heading>
                            </VStack>
                            <HStack alignItems={"flex-start"}>
                                <IconButton icon={<AntDesign name='sharealt' size={20} color={theme.colors.primary[100]} />} />
                                <IconButton icon={<AntDesign name='hearto' size={20} color={theme.colors.primary[100]} />} />
                            </HStack>
                        </HStack>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Condition
                            </Text>
                            <Text color={"primary.100"}>
                                Used
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Availability
                            </Text>
                            <Text color={"primary.100"}>
                                In Stock
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Brand
                            </Text>
                            <Text color={"primary.100"}>
                                Rolex
                            </Text>
                        </HStack>
                        <Divider />
                        <HStack justifyContent={"space-between"}>
                            <Text bold>
                                Gender
                            </Text>
                            <Text color={"primary.100"}>
                                Male
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
                    <Pressable w={"50%"} >
                        <Box backgroundColor={"black"} h="12" w={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"white"} fontSize={"md"}>
                                Add to cart
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
