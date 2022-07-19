import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import { connect } from 'react-redux';


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

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({ loading: false })
        }, 3000)
    }
    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    _renderItem = ({ item }) => {
        if (this.state.loading)
            return (
                <Box _dark={{
                    backgroundColor: "black"
                }} w={"90%"} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" m={"5%"}>
                    <Stack space={4}>
                        <Skeleton h={200} w={"100%"} />
                        <Stack space={3} p={3}>
                            <Skeleton h={5} />
                            <Skeleton.Text />
                        </Stack>
                    </Stack>
                </Box>
            )
        else
            return (
                <Box
                    _dark={{
                        backgroundColor: "gray.800"
                    }}
                    w={"90%"} alignItems="center" backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" m={"5%"}>
                    <Stack space={4}>
                        <Image alignSelf={"center"} maxH={200} maxW={"100%"} source={item.image} alt="image" resizeMode='contain' />
                        <Stack space={1} p={3}>
                            <Heading size={"md"}>
                                {item.name}
                            </Heading>
                            <Text flexWrap={"wrap"} numberOfLines={3}>
                                {item.desc}
                            </Text>
                        </Stack>
                    </Stack>
                    <IconButton position={"absolute"} top={1.5} right={1.5} icon={<AntDesign name='heart' size={20} color="red" />} />
                </Box>
            )
    }

    render() {
        return (
            <View
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: "#000"
                }}
                flex={1}>
                <AppBar
                    noLeftIcon
                    title={"Wishlist"}
                    noWish
                    noCart
                />
                <FlatList
                    keyExtractor={(item) => item.name}
                    data={data}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}


const mapStateToProps = state => ({
    loading: state.GeneralReducer.loading,
    all_methods: state.User.methods
})

const mapDispatchToProps = dispatch => ({
    getAllMethods: data => dispatch(GeneralMiddleware.getAllBrands(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);