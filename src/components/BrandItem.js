import React from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { img_url } from "../configs/APIs";
import { useNavigation } from "@react-navigation/native";

const BrandItem = ({ loading, item, halfScreen, index, name }) => {

    const navigation = useNavigation();

    const formatString = (str = "") => {
        if (str) {
            let strr = str;
            let firstLetter = strr.charAt(0).toUpperCase();
            let newStr = firstLetter + strr.substring(1, str.length);
            return newStr;
        }
        else
            return "No name"
    }


    if (loading)
        return (
            <Box w={"49%"} mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4}>
                    <Skeleton h={140} w={"100%"} />
                    {/* <Stack space={3} p={3}>
                        <Skeleton h={5} />
                        <Skeleton.Text />
                    </Stack> */}
                </Stack>
            </Box>
        )
    else
        return (
            <Box w={"49%"} mr={2} mb={2} p={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Pressable
                onPress={()=>navigation.navigate("Products",{item})}
                >
                    <Stack space={4}>
                        <Image my={2} h={70} w={"100%"} source={item.brand_image?{ uri: img_url + item.brand_image }:require("../../assets/placeholder.png")} alt="Image Here" resizeMode='contain' />
                        {item.brand_name ?
                                <Heading textAlign={"center"} size={"md"}>
                                    {formatString(item.brand_name)}
                                </Heading>
                            : null}
                    </Stack>
                </Pressable>
                {/* <IconButton position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name='hearto' size={20} />} /> */}
            </Box>
        )
};

export default BrandItem;
