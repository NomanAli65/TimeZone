import { FlatList, Heading, Stack, View } from 'native-base';
import React, { Component, } from 'react';
import AppBar from '../../components/Appbar';
import SearchBar from '../../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import BrandItem from '../../components/BrandItem';
import { connect } from 'react-redux';
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import { APIs } from '../../configs/APIs';

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

class AllBrands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            refreshing: false,
            search:""
        };
    }

    componentDidMount() {
        this.props.getAllBrands({
            search:"",
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
            this.props.getAllBrands({
                search: text,
                callback: () => {
                    this.setState({ refreshing: false })
                }
            })
        }, 1000)
    }
    // componentWillUnmount() {
    //     clearTimeout(this.timeout)
    // }

    _renderItem = ({ item, index }) => (
        <BrandItem
            index={index}
            loading={this.state.loading}
            item={item}
        />
    )

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getAllBrands({
            search:this.state.search,
            callback: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    render() {
        return (
            <View flex={1}
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: 'black'
                }}>
                <AppBar
                    title={"All Brands"}
                    back
                    noCart
                    noWish
                />
                <SearchBar
                    placeholder={"Search Brands"}
                    onChangeText={this.onSearch}
                />
                {/* <Stack space={2} p={3}>
                    <Heading>
                        Popular Watches
                    </Heading> */}
                <FlatList
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    p={3}
                    numColumns={2}
                    keyExtractor={(item) => item.name}
                    data={!this.state.loading ? this.props.all_brands : data}
                    renderItem={this._renderItem}
                />
                {/* </Stack> */}
            </View>
        );
    }
}


const mapStateToProps = state => ({
    all_brands: state.GeneralReducer.all_brands
})

const mapDispatchToProps = dispatch => ({
    getAllBrands: data => dispatch(GeneralMiddleware.getAllBrands(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBrands);
