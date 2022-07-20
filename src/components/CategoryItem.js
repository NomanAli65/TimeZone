import React from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { img_url } from "../configs/APIs";

const CategoryItem = ({ loading, item, name }) => {


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
            <Box _dark={{ backgroundColor: "black" }} w={"32%"} mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4} p={2}>
                    <Skeleton h={70} w={"100%"} />
                    <Skeleton h={5} w={"80%"} alignSelf="center" />
                </Stack>
            </Box>
        )
    else
        return (
            <Box _dark={{ backgroundColor: "gray.700" }} w={"32%"} mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Pressable
                    onPress={() => {
                        navigation.navigate("Products", { category: item })
                    }}>
                    <Stack space={4} p={2}>
                        <Image h={70} w={"100%"} source={item.category_image ? { uri: img_url + item.category_image } : require("../../assets/placeholder.png")} alt="image" resizeMode='contain' />
                        <Heading textAlign={"center"} size={"sm"}>
                            {formatString(item.category_name)}
                        </Heading>
                    </Stack>
                </Pressable>
            </Box>
        )
};

export default CategoryItem;
