import React from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const CategoryItem = ({ loading, item, name }) => {
    if (loading)
        return (
            <Box _dark={{backgroundColor:"black"}} w={"32%"} mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4} p={2}>
                    <Skeleton h={70} w={"100%"} />
                    <Skeleton h={5} w={"80%"} alignSelf="center" />
                </Stack>
            </Box>
        )
    else
        return (
            <Box _dark={{backgroundColor:"gray.700"}} w={"32%"} alignItems="center" mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4} p={2}>
                    <Image alignSelf={"center"} maxH={70} maxW={"70%"} source={item.image} alt="image" resizeMode='contain' />
                        <Stack space={1} >
                            <Heading textAlign={"center"} size={"sm"}>
                                {item.name}
                            </Heading>
                        </Stack>
                </Stack>
            </Box>
        )
};

export default CategoryItem;
