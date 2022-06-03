import { FlatList, Heading, Stack, View } from 'native-base';
import React, { Component, } from 'react';
import AppBar from '../../components/Appbar';
import SearchBar from '../../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import BrandItem from '../../components/BrandItem';

const { width } = Dimensions.get("window");

const data = [
    {
        name: "Rolex",
        image: require("../../../assets/rolex.png")
    },
    {
        name: "Rado",
        image: require("../../../assets/rado.png")
    },
    {
        name: "Timex",
        image: require("../../../assets/timex.png")
    },
    {
        name: "Tag",
        image: require("../../../assets/tag.png")
    },
    {
        name: "Seiko",
        image: require("../../../assets/seiko.png")
    },
]

export default class AllBrands extends Component {

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

    _renderItem = ({ item, index }) => (
        <BrandItem
            index={index}
            loading={this.state.loading}
            item={item}
        />
    )

    render() {
        return (
            <View flex={1} 
            backgroundColor="#fff"
            _dark={{
                backgroundColor:'black'
            }}>
                <AppBar
                    title={"All Brands"}
                    back
                    noCart
                    noWish
                />
                <SearchBar
                    placeholder={"Search Brands"}
                />
                {/* <Stack space={2} p={3}>
                    <Heading>
                        Popular Watches
                    </Heading> */}
                <FlatList
                    p={3}
                    numColumns={2}
                    keyExtractor={(item) => item.name}
                    data={data}
                    renderItem={this._renderItem}
                />
                {/* </Stack> */}
            </View>
        );
    }
}
