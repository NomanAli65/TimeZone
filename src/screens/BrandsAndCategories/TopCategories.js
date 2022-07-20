import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View, VStack } from 'native-base';
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
import LGButton from '../../components/LGButton';

const { width } = Dimensions.get("window");


class TopCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            search: ""
        };
    }

    componentDidMount() {
        this.props.getTopCategories({
            callback: () => {
                    this.setState({ loading: false })                
            }
        })
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getTopCategories({
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
                    <RNImage source={item.image} style={{ width, height: 250 }} resizeMode="cover" />
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

    _renderDummyContent = () => {
        return (
            <Stack space={2}>
                <HStack justifyContent={"space-between"} alignItems="center">
                    <Skeleton width={"30%"} />
                    <Skeleton width={"30%"} height={7} />
                </HStack>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    horizontal
                    keyExtractor={(item) => item.name}
                    data={[{}, {}, {}, {}]}
                    renderItem={this._renderItem}
                />
            </Stack>
        )
    }

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
                        title={"Top Categories"}
                        noCart
                        noWish
                        back
                    />
                    {/* <Box
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
                    </Box> */}
                    <Button
                        m={3}
                        variant="outline"
                        onPress={() => {
                            this.props.navigation.navigate("AllCategories")
                        }} >
                        All Categories
                    </Button>
                    <Stack p={3} space={10}>
                        {
                            this.state.loading?
                            <VStack space={3}>
                            {this._renderDummyContent()}
                            {this._renderDummyContent()}
                            {this._renderDummyContent()}
                            </VStack>
                            :
                            this.props.top_categories ?
                                this.props.top_categories.map((category) => {
                                    if (category.products.length > 0)
                                        return (
                                            <Stack space={2}>
                                                <HStack justifyContent={"space-between"}>
                                                    <Heading>
                                                        {category.category_name}
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
                                                    data={category.products}
                                                    renderItem={this._renderItem}
                                                />
                                            </Stack>
                                        )
                                })
                                : null
                        }

                    </Stack>

                </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = state => ({
    top_categories: state.GeneralReducer.top_categories
})

const mapDispatchToProps = dispatch => ({
    getTopCategories: data => dispatch(GeneralMiddleware.getTopCategories(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCategories);