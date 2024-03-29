import { Heading, Stack, View } from 'native-base';
import React, { Component, } from 'react';
import AppBar from '../../components/Appbar';
import SearchBar from '../../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import WatchItem from '../../components/WatchItem';
import { connect } from 'react-redux';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';
import { APIs } from '../../configs/APIs';
import { FlatList } from 'react-native';

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
        let filter = this.props.route.params?.filter;
        this.state = {
            loading: true,
            refreshing: false,
            search: "",
            filters: {
                filter_sort: filter ? filter : "",
                filter_gender: "",
                filter_color: "",
                filter_availability: ""
            },
            colors: [],
            otherFilter: []
        };
    }

    componentDidMount() {
        this.props.getAllColors((data) => {
            this.setState({ colors: data })
        })
        this.props.getAllFilters((data) => {
            this.setState({ otherFilter: data })
        })
        let category = this.props.route.params?.category;
        let brand = this.props.route.params?.brand;
        let search = this.props.route.params?.search ? this.props.route.params?.search : "";
        let filter = this.props.route.params?.filter;
        this.filters = {
            sortBy: filter,
        }
        this.setState({ search })
        this.props.getAllProducts({
            next_url: APIs.AllProducts,
            search: search,
            filter_category: category?.id ? category?.id : "",
            filter_brand: brand?.id ? brand?.id : "",
            ...this.getFilters({ sortBy: filter }),
            callback: () => {
                this.setState({ loading: false })
            }
        })
    }

    onSearch = (text) => {
        let category = this.props.route.params?.category;
        let brand = this.props.route.params?.brand;
        this.setState({ search: text })
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({ refreshing: true })
            this.props.getAllProducts({
                next_url: APIs.AllProducts,
                search: text,
                filter_category: category?.id ? category?.id : "",
                filter_brand: brand?.id ? brand?.id : "",
                ...this.getFilters(this.state.filters),
                callback: () => {
                    this.setState({ refreshing: false })
                }
            })
        }, 1000)
    }

    _renderItem = ({ item, index }) => (
        <WatchItem
            index={index}
            loading={this.state.loading}
            item={item}
            halfScreen
        />
    )

    onEndReached = () => {
        let category = this.props.route.params?.category;
        let brand = this.props.route.params?.brand;
        if (this.props.products?.next_url)
            this.props.getAllProducts({
                next_url: this.props.products.next_page_url,
                search: this.state.search,
                filter_category: category?.id ? category?.id : "",
                ...brand ? { filter_brand: brand?.id } : {},
                ...this.getFilters(this.state.filters),
                callback: () => {
                    this.setState({ loading: false })
                }
            })
    }

    onRefresh = () => {
        let category = this.props.route.params?.category;
        let brand = this.props.route.params?.brand;
        this.setState({ refreshing: true })
        this.props.getAllProducts({
            next_url: APIs.AllProducts,
            search: this.state.search,
            filter_category: category?.id ? category?.id : "",
            filter_brand: brand?.id ? brand?.id : "",
            ...this.getFilters(this.state.filters),
            callback: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    getFilters = (filters) => {
        return {
            filters: {
                filter_sort: filters?.sortBy ? filters.sortBy : "",
                filter_gender: filters?.gender ? filters.gender : "",
                filter_color: filters?.color ? filters?.color : "",
                filter_availability: filters?.avail ? filters?.avail : "",
                filter_material: filters?.material ? filters?.material : "",
                filter_movement: filters?.movement ? filters?.movement : "",
                filter_condition: filters?.condition ? filters?.condition : "",
            }
        }
    }

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
                    onFilterPress={() => this.props.navigation.navigate("Filters", {
                        colors: this.state.colors,
                        otherFilter: this.state.otherFilter,
                        filters: this.filters,
                        setFilter: (filters) => {
                            this.setState({ loading: true })
                            if (filters) {
                                this.filters = filters;
                                this.setState({ filters });
                            }
                            else {
                                this.filters = null;
                                this.setState({
                                    filters: {
                                        filter_sort: "",
                                        filter_gender: "",
                                        filter_color: "",
                                        filter_availability: ""
                                    }
                                });
                            }
                            this.props.getAllProducts({
                                next_url: APIs.AllProducts,
                                search: this.state.search,
                                ...this.getFilters(filters),
                                callback: () => {
                                    this.setState({ loading: false })
                                }
                            })

                        }
                    })}
                    placeholder={"Search TIMEZONE"}
                    filter
                    onChangeText={this.onSearch}
                    value={this.state.search}
                />
                {/* <Stack space={2} p={3}>
                    <Heading>
                        Popular Watches
                    </Heading> */}
                <View p={3}>
                    <FlatList
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                        numColumns={2}
                        keyExtractor={(item) => item.name}
                        data={this.state.loading && this.props.products?.data?.length == 0 ? [{}, {}] : this.props.products?.data}
                        renderItem={this._renderItem}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                </View>
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
    getAllProducts: data => dispatch(ProductMiddleware.getAllProducts(data)),
    getAllColors: callback => dispatch(ProductMiddleware.getAllColors(callback)),
    getAllFilters: callback => dispatch(ProductMiddleware.getAllFitlers(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
