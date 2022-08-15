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
import SearchBar from '../../components/SearchBar';
import { img_url } from '../../configs/APIs';

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
    {
        name: "Mechanical",
        image: require("../../../assets/seiko.png")
    },
    {
        name: "Analog",
        image: require("../../../assets/rolex.png")
    },
    {
        name: "Digital",
        image: require("../../../assets/rado.png")
    },
    {
        name: "Automatic1",
        image: require("../../../assets/timex.png")
    },
    {
        name: "Chronograph1",
        image: require("../../../assets/tag.png")
    },
    {
        name: "Mechanical1",
        image: require("../../../assets/seiko.png")
    },
    {
        name: "Mechanical1",
        image: require("../../../assets/seiko.png")
    },
]


class AllCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            search: ""
        };
    }

    componentDidMount() {
        this.props.getAllCategories({
            search: "",
            callback: () => {
                this.setState({ loading: false })
            }
        })
    }

    onSearch = (text) => {
        this.setState({ search: text })
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({ refreshing: true })
            this.props.getAllCategories({
                search: text,
                callback: () => {
                    this.setState({ refreshing: false })
                }
            })
        }, 1000)
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getAllCategories({
            search: this.state.search,
            callback: () => {
                this.setState({ refreshing: false })
            }
        })
    }

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
                    <RNImage source={{ uri: img_url + item.banner_path }} style={{ width, height: 250 }} resizeMode="cover" />
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
                    backgroundColor: "black"
                }}
            >
                <View flex={1}>
                    <AppBar
                        title={"All Categories"}
                        noCart
                        noWish
                        back
                    />
                    <SearchBar
                        placeholder={"Search Categories"}
                        onChangeText={this.onSearch}
                    />
                    {!this.state.refreshing && !this.state.search ?
                        this.state.loading ?
                            <Skeleton
                                h={250}
                                w="100%"
                            />
                            :
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
                                    data={this.state.loading ? [{}, {}, {}, {}] : this.props.dashboard?.banners}
                                    extraData={this.state.loading}
                                    renderItem={this._renderBanner}
                                />
                            </Box>
                        : null}
                    <Stack space={4} px={3}>
                        <FlatList
                            // p={3}
                            onRefresh={this.onRefresh}
                            refreshing={this.state.refreshing}
                            numColumns={3}
                            keyExtractor={(item) => item.name}
                            data={!this.state.loading ? this.props.all_categories : dataB}
                            renderItem={this._renderBItem}
                        />
                    </Stack>
                </View>
            </ScrollView >
        );
    }
}


const mapStateToProps = state => ({
    all_categories: state.GeneralReducer.all_categories,
    dashboard: state.GeneralReducer.dashboardData
})

const mapDispatchToProps = dispatch => ({
    getAllCategories: data => dispatch(GeneralMiddleware.getAllCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories);