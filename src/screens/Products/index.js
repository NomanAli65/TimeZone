import { FlatList, Heading, Stack, View } from 'native-base';
import React, { Component, } from 'react';
import AppBar from '../../components/Appbar';
import SearchBar from '../../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import WatchItem from '../../components/WatchItem';
import { connect } from 'react-redux';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';

const { width } = Dimensions.get("window");

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

    _renderItem = ({ item, index }) => (
        <WatchItem
            index={index}
            loading={this.state.loading}
            item={item}
            halfScreen
        />
    )

    render() {
        return (
            <View flex={1}
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: "black"
                }}>
                <AppBar
                    title={"TIMEZONE"}
                    back
                    noCart
                    noWish
                />
                <SearchBar
                    onFilterPress={() => this.props.navigation.navigate("Filters")}
                    placeholder={"Search TIMEZONE"}
                    filter
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

const mapStateToProps = state => ({
    loading: state.GeneralReducer.loading,
    products: state.Product.data,
})

const mapDispatchToProps = dispatch => ({
    getAllProducts: data => dispatch(ProductMiddleware.getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
