import React from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const BrandItem = ({ loading, item, halfScreen, index, name }) => {
    if (loading)
        return (
            <Box w={"49%"} mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4}>
                    <Skeleton h={120} w={"100%"} />
                    {/* <Stack space={3} p={3}>
                        <Skeleton h={5} />
                        <Skeleton.Text />
                    </Stack> */}
                </Stack>
            </Box>
        )
    else
        return (
            <Box w={"49%"} alignItems="center" mr={2} mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <Stack space={4}>
                    <Image alignSelf={"center"} maxH={120} maxW={"70%"} source={item.image} alt="image" resizeMode='contain' />
                    {name ?
                        <Stack space={1} py={3}>
                            <Heading textAlign={"center"} size={"md"}>
                                {item.name}
                            </Heading>
                        </Stack>
                        : null}
                </Stack>
                {/* <IconButton position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name='hearto' size={20} />} /> */}
            </Box>
        )
};

export default BrandItem;
