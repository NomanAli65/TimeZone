import { Box, FlatList, Heading, HStack, IconButton, Image, Stack, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';


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

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    _renderItem = ({ item }) => {
        return (
            <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <HStack space={1} w={"full"} p={2}>
                    <Image alignSelf={"center"} maxH={90} maxW={"30%"} source={item.image} alt="image" resizeMode='contain' />
                    <Stack space={1} w={"70%"}>
                        <Heading size={"sm"}>
                            {item.name}
                        </Heading>
                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                            {item.desc}
                        </Text>
                        <HStack justifyContent={"space-between"}>
                            <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                                <Text color={"primary.100"}>4000 AED</Text>
                            </Text>
                            <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3}>
                                <Text color={"gray.400"}>1 Jan 2022</Text>
                            </Text>
                        </HStack>
                    </Stack>
                </HStack>
            </Box>
        )
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Order History"}
                    noCart
                    noWish
                    back
                />
                <FlatList
                    p={3}
                    mb={2}
                    renderItem={this._renderItem}
                    data={data}
                />
            </View>
        );
    }
}
