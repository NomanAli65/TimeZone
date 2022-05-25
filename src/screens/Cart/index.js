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

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    _renderItem = ({ item }) => {
        return (
            <Box w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                <HStack space={1} w={"full"} p={2}>
                    <Image alignSelf={"center"} maxH={90} maxW={"30%"} source={item.image} alt="image" resizeMode='contain' />
                    <Stack space={1} w={"55%"}>
                        <Heading size={"sm"}>
                            {item.name}
                        </Heading>
                        <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                            {item.desc}
                        </Text>
                        <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} bold>
                            <Text color={"primary.100"}>4000 AED</Text>
                        </Text>
                    </Stack>
                    <IconButton ml={1} alignSelf={"center"} icon={<AntDesign name='delete' size={25} />} />
                </HStack>
            </Box>
        )
    }

    render() {
        return (
            <View flex={1}>
                <AppBar
                    title={"Cart"}
                    noCart
                    noWish
                    noLeftIcon
                />
                <FlatList
                    p={3}
                    mb={2}
                    renderItem={this._renderItem}
                    data={data}
                />
                <Box p={3}>
                    <HStack justifyContent={"space-between"}>
                        <Text bold>Subtotal</Text>
                        <Text bold color={"primary.100"}>50 AED</Text>
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                        <Text bold>Tax</Text>
                        <Text bold color={"primary.100"}>10 AED</Text>
                    </HStack>
                    <HStack mb={3} justifyContent={"space-between"}>
                        <Text bold>Total</Text>
                        <Text bold color={"primary.100"}>50000 AED</Text>
                    </HStack>
                    <LGButton
                        onPress={()=>this.props.navigation.navigate("Checkout")}
                        title={"Review payment and address"}
                    />
                </Box>
            </View>
        );
    }
}
