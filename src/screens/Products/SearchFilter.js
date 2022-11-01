import { Box, Button, Checkbox, Divider, Heading, HStack, Radio, ScrollView, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        let filter = this.props.route.params.filters;
        this.state = {
            filter: filter ? filter : {
                sortBy: [],
                gender: "",
                color: "",
                avail: "",
                material: "",
                condition: "",
                movement: ""
            }
        };
    }

    onPressApply = () => {
        console.warn(this.state.filter);
        this.props.route.params.setFilter(this.state.filter);
        this.props.navigation.goBack();
    }
    onPressRemove = () => {
        this.props.route.params.setFilter(null);
        this.props.navigation.goBack();
    }

    toSentenceCase = (string = "") => {
        let char = string.charAt(0);
        return string.replace(char, char.toLocaleUpperCase());

    }

    onSortSelect = (val) => {
        let data = [...this.state.filter.sortBy];
        let index = this.state.filter.sortBy.findIndex((i) => i == val);
        if (index == -1)
            this.setState({
                filter: {
                    ...this.state.filter,
                    sortBy: [...this.state.filter.sortBy, val]
                }
            })
        else {
            data.splice(index, 1);
            this.setState({
                filter: {
                    ...this.state.filter,
                    sortBy: data
                }
            })
        }
    }

    render() {
        let colors = this.props.route.params.colors;
        let otherFilter = this.props.route.params.otherFilter;
        return (
            <View flex={1}
                backgroundColor="#fff"
                _dark={{
                    backgroundColor: "black"
                }}>
                <AppBar
                    title={"Filters"}
                    back
                    noCart
                    noWish
                />
                <ScrollView>
                    <VStack p={3} space={3}>
                        <VStack space={2}>
                            <Heading>
                                Sort By
                            </Heading>
                            {/* <Checkbox.Group
                                onChange={(value) => {
                                    // if (this.state.filter.sortBy == value[1])
                                    //     this.setState({
                                    //         filter: {
                                    //             ...this.state.filter,
                                    //             sortBy: ""
                                    //         }
                                    //     })
                                    // else
                                    this.setState({
                                        filter: {
                                            ...this.state.filter,
                                            sortBy: value
                                        }
                                    })
                                }}
                                value={this.state.filter.sortBy}
                                name="SortGroup"> */}
                            <VStack>
                                {/* <Checkbox
                                    value="popular"
                                    isChecked={this.state.filter.sortBy.includes("popular")}
                                    onChange={()=>this.onSortSelect("popular")}
                                    my={1}>
                                    Popularity
                                </Checkbox>
                                <Checkbox
                                    value="latest"
                                    isChecked={this.state.filter.sortBy.includes("latest")}
                                    onChange={()=>this.onSortSelect("latest")}
                                    my={1}>
                                    Latest
                                </Checkbox> */}
                                <Checkbox
                                    value="highToLow"
                                    isChecked={this.state.filter.sortBy.includes("highToLow")}
                                    onChange={()=>this.onSortSelect("highToLow")}
                                    my={1}>
                                    Price:High to low
                                </Checkbox>
                                <Checkbox
                                    value="lowToHigh"
                                    isChecked={this.state.filter.sortBy.includes("lowToHigh")}
                                    onChange={()=>this.onSortSelect("lowToHigh")}
                                    my={1}>
                                    Price:Low to high
                                </Checkbox>
                                {/* <Checkbox
                                    value="featured"
                                    isChecked={this.state.filter.sortBy.includes("featured")}
                                    onChange={()=>this.onSortSelect("featured")}
                                    my={1}>
                                    Featured
                                </Checkbox> */}
                            </VStack>
                            {/* </Checkbox.Group> */}
                        </VStack>
                        <Divider />
                        {/* <VStack space={2}>
                            <Heading>
                                Gender
                            </Heading>
                            <Radio.Group
                                value={this.state.filter.gender}
                                onChange={(value) => {
                                    this.setState({
                                        filter: {
                                            ...this.state.filter,
                                            gender: value
                                        }
                                    })
                                }}
                                name="SortGroup">
                                <Radio value="male" my={1}>
                                    Male
                                </Radio>
                                <Radio value="female" my={1}>
                                    Female
                                </Radio>
                                <Radio value="unisex" my={1}>
                                    Unisex
                                </Radio>
                            </Radio.Group>
                        </VStack>
                        <Divider /> */}
                        <VStack space={2}>
                            <Heading>
                                Dial Color
                            </Heading>
                            <Checkbox.Group
                                value={[this.state.filter.color]}
                                onChange={(value) => {
                                    if (this.state.filter.color == value[1])
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                color: ""
                                            }
                                        })
                                    else
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                color: value[1]
                                            }
                                        })
                                }}
                                name="SortGroup">
                                {
                                    colors.length > 0 ?
                                        colors.map((color) => (
                                            <Checkbox isChecked={this.state.filter.color == color} value={color} my={1}>
                                                {this.toSentenceCase(color)}
                                            </Checkbox>
                                        )) : null
                                }
                            </Checkbox.Group>
                        </VStack>
                        <Divider />
                        {
                            Object.values(otherFilter).map((fils, index) => (
                                <Box>
                                    <VStack space={2}>
                                        <Heading>
                                            {this.toSentenceCase(Object.keys(otherFilter)[index])}
                                        </Heading>
                                        <Checkbox.Group
                                            value={[this.state.filter[Object.keys(otherFilter)[index]]]}
                                            onChange={(value) => {
                                                if (this.state.filter[Object.keys(otherFilter)[index]] == value[1])
                                                    this.setState({
                                                        filter: {
                                                            ...this.state.filter,
                                                            [Object.keys(otherFilter)[index]]: ""
                                                        }
                                                    })
                                                else
                                                    this.setState({
                                                        filter: {
                                                            ...this.state.filter,
                                                            [Object.keys(otherFilter)[index]]: value[1]
                                                        }
                                                    })
                                            }}
                                            name="SortGroup">
                                            {
                                                fils.length > 0 ?
                                                    fils.map((fil) => {
                                                        if (fil.name)
                                                            return (<Checkbox
                                                                isChecked={Object.keys(otherFilter)[index] != (Object.keys(otherFilter)[index] == "categories" ? fil.cat_id : fil.name)}
                                                                value={Object.keys(otherFilter)[index] == "categories" ? fil.cat_id : fil.name} my={1}>
                                                                {this.toSentenceCase(fil.name)}
                                                            </Checkbox>)
                                                    }) : null
                                            }
                                        </Checkbox.Group>
                                    </VStack>
                                    <Divider />
                                </Box>
                            ))
                        }
                        <VStack space={2}>
                            <Heading>
                                Availability
                            </Heading>
                            <Checkbox.Group
                                value={[this.state.filter.avail]}
                                onChange={(value) => {
                                    if (this.state.filter.avail == value[1])
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                avail: ""
                                            }
                                        })
                                    else
                                        this.setState({
                                            filter: {
                                                ...this.state.filter,
                                                avail: value[1]
                                            }
                                        })
                                }}
                                name="SortGroup">
                                <Checkbox value="0" my={1} isChecked={this.state.filter.avail == "0"}>
                                    In-Stock
                                </Checkbox>
                                <Checkbox value="1" my={1} isChecked={this.state.filter.avail == "1"}>
                                    Out-Stock
                                </Checkbox>
                            </Checkbox.Group>
                        </VStack>
                    </VStack>
                </ScrollView >
                <HStack justifyContent={"space-between"}>
                    <Button flex={1} m={3} onPress={() => this.onPressApply()}>
                        Apply
                    </Button>
                    <Button flex={1} m={3} backgroundColor={"#000"} onPress={() => this.onPressRemove()}>
                        Remove
                    </Button>
                </HStack>
            </View>
        );
    }
}
