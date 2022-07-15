import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View } from 'native-base';
import React, { Component, useState } from 'react';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions, View as RNView, Image as RNImage } from "react-native";
import WatchItem from '../../components/WatchItem';
import AppBar from '../../components/Appbar';
import CategoryItem from '../../components/CategoryItem';
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import { connect } from 'react-redux';

const { width } = Dimensions.get("window");


const banners = [
    {
        image: require("../../../assets/1.jpg")
    },
    {
        image: require("../../../assets/2.jpg")
    },
    {
        image: require("../../../assets/3.jpg")
    },
]

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

const dataB = [
    {
        name: "Analog",
        image: require("../../../assets/rolex.png")
    },
    {
        name: "Digital",
        image: require("../../../assets/rado.png")
    },
    {
        name: "Automatic",
        image: require("../../../assets/timex.png")
    },
    {
        name: "Chronograph",
        image: require("../../../assets/tag.png")
    },
    {
        name: "Mechanical",
        image: require("../../../assets/seiko.png")
    },
]


class AllCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // this.timeout = setTimeout(() => {
        //     this.setState({ loading: false })
        // }, 3000)
        this.props.getAllCategories({
            next_url: this.props.all_brands?.next_url ? APIs.AllBrands : this.props.all_brands?.next_url,
        })
    }

    // componentWillUnmount() {
    //     clearTimeout(this.timeout)
    // }

    _renderItem = ({ item }) => (
        <WatchItem
            loading={this.state.loading}
            item={item}
        />
    )


    _renderBanner = ({ item }) => {
        if (this.state.loading)
            return (
                <RNView style={{ width }}>
                    <Skeleton width={"100%"} height={"100%"} />
                </RNView>
            )
        else
            return (
                <RNView style={{ width }}>
                    <RNImage source={item.image} style={{ width, height: 250}} resizeMode="cover" />
                </RNView>
            )
    }

    _renderBItem = ({ item, index }) => (
        <CategoryItem
            index={index}
            loading={this.state.loading}
            item={item}
        />
    )

    render() {
        return (
            <ScrollView
            backgroundColor="#fff"
            _dark={{
                backgroundColor:"black"
            }}
            >
                <View flex={1}>
                    <AppBar
                        title={"Top Categories"}
                        noCart
                        noWish
                        back
                    />
                    <Box
                        width={"100%"}
                        height={250}
                        mb={10}
                    >
                        <Carousel
                            autoplay
                            loop
                            sliderHeight={250}
                            itemHeight={250}
                            sliderWidth={width}
                            itemWidth={width}
                            snapToInterval={width}
                            enableSnap={false}
                            data={banners}
                            extraData={this.state.loading}
                            renderItem={this._renderBanner}
                        />
                    </Box>
                    <Stack px={3} space={10}>
                        <Stack space={2}>
                            <HStack justifyContent={"space-between"}>
                                <Heading>
                                    Men
                                </Heading>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Products")}
                                    variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                                    View More
                                </Button>
                            </HStack>
                            <FlatList
                                horizontal
                                keyExtractor={(item) => item.name}
                                data={data}
                                renderItem={this._renderItem}
                            />
                        </Stack>
                        <Stack space={2}>
                            <HStack justifyContent={"space-between"}>
                                <Heading>
                                    Women
                                </Heading>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Products")}
                                    variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                                    View More
                                </Button>
                            </HStack>
                            <FlatList
                                horizontal
                                keyExtractor={(item) => item.name}
                                data={data}
                                renderItem={this._renderItem}
                            />
                        </Stack>
                        <Stack space={2}>
                            <HStack justifyContent={"space-between"}>
                                <Heading>
                                    Unisex
                                </Heading>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Products")}
                                    variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                                    View More
                                </Button>
                            </HStack>
                            <FlatList
                                horizontal
                                keyExtractor={(item) => item.name}
                                data={data}
                                renderItem={this._renderItem}
                            />
                        </Stack>
                        <Stack space={2}>
                            <HStack justifyContent={"space-between"}>
                                <Heading>
                                    Children
                                </Heading>
                                <Button
                                    onPress={() => this.props.navigation.navigate("Products")}
                                    variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                                    View More
                                </Button>
                            </HStack>
                            <FlatList
                                horizontal
                                keyExtractor={(item) => item.name}
                                data={data}
                                renderItem={this._renderItem}
                            />
                        </Stack>
                        <Stack space={4}>
                            <Heading>
                                All Categories
                            </Heading>
                            <FlatList
                                // p={3}
                                numColumns={3}
                                keyExtractor={(item) => item.name}
                                data={this.props.all_categories?.data?this.props.all_categories?.data:dataB}
                                renderItem={this._renderBItem}
                            />
                        </Stack>
                    </Stack>

                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    loading: state.GeneralReducer.loading,
    all_categories: state.GeneralReducer.all_categories
})

const mapDispatchToProps = dispatch => ({
    getAllBrands: data => dispatch(GeneralMiddleware.getAllCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);