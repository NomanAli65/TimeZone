import React from "react";
import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WatchItem = ({ loading, item, halfScreen, index }) => {

    const navigation=useNavigation();

    if (loading)
        return (
            <Box w={halfScreen ? "49%" : 200} mr={halfScreen ? (index % 2 == 0 ? 2 : 0) : 3} mb={halfScreen ? 2 : 0} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
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
            <Pressable onPress={()=>navigation.navigate("ProductDetail")}>
                <Box w={halfScreen ? "49%" : 200} alignItems="center" mr={halfScreen ? (index % 2 == 0 ? 2 : 0) : 3} mb={halfScreen ? 2 : 0} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <Stack space={4}>
                        <Image alignSelf={"center"} maxH={150} maxW={"100%"} source={item.image} alt="image" resizeMode='contain' />
                        <Stack space={1} p={3}>
                            <Heading size={halfScreen ? "sm" : "md"}>
                                {item.name}
                            </Heading>
                            <Text fontSize={halfScreen ? "13" : "14"} flexWrap={"wrap"} numberOfLines={halfScreen ? 2 : 3}>
                                {item.desc}
                            </Text>
                            {/* <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                            Price on Request
                        </Text> */}
                            <VStack>
                                <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                    PRICE <Text color={"primary.100"}>4000 AED</Text>
                                </Text>
                                {/* <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                           RETAIL PRICE <Text color={"gray.400"}>4000 AED</Text> 
                        </Text>
                        <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                           SAVING <Text color={"red.500"}>4000 AED</Text> 
                        </Text> */}
                            </VStack>
                        </Stack>
                    </Stack>
                    <IconButton position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name='hearto' size={20} />} />
                </Box>
            </Pressable>
        )
};

export default WatchItem;