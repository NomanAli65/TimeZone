import { Box, Button, Divider, Heading, HStack, Radio, ScrollView, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        let filter = this.props.route.params.filters;
        this.state = {
            filter: filter ? filter : {
                sortBy: "",
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
                            <Radio.Group
                                onChange={(value) => {
                                    this.setState({
                                        filter: {
                                            ...this.state.filter,
                                            sortBy: value
                                        }
                                    })
                                }}
                                value={this.state.filter.sortBy}
                                name="SortGroup">
                                <Radio value="popular" my={1}>
                                    Popularity
                                </Radio>
                                <Radio value="latest" my={1}>
                                    Latest
                                </Radio>
                                <Radio value="lowToHigh" my={1}>
                                    Price:Low to high
                                </Radio>
                            </Radio.Group>
                        </VStack>
                        <Divider />
                        <VStack space={2}>
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
                        <Divider />
                        <VStack space={2}>
                            <Heading>
                                Dial Color
                            </Heading>
                            <Radio.Group
                                value={this.state.filter.color}
                                onChange={(value) => {
                                    this.setState({
                                        filter: {
                                            ...this.state.filter,
                                            color: value
                                        }
                                    })
                                }}
                                name="SortGroup">
                                {
                                    colors.length > 0 ?
                                        colors.map((color) => (
                                            <Radio value={color.id} my={1}>
                                                {this.toSentenceCase(color.color_name)}
                                            </Radio>
                                        )) : null
                                }
                            </Radio.Group>
                        </VStack>
                        <Divider />
                        {
                            Object.values(otherFilter).map((fils, index) => (
                                <Box>
                                    <VStack space={2}>
                                        <Heading>
                                            {this.toSentenceCase(Object.keys(otherFilter)[index])}
                                        </Heading>
                                        <Radio.Group
                                            value={this.state.filter[Object.keys(otherFilter)[index]]}
                                            onChange={(value) => {
                                                this.setState({
                                                    filter: {
                                                        ...this.state.filter,
                                                        [Object.keys(otherFilter)[index]]: value
                                                    }
                                                })
                                                console.warn({[Object.keys(otherFilter)[index]]: value})
                                            }}
                                            name="SortGroup">
                                            {
                                                fils.length > 0 ?
                                                    fils.map((fil) => {
                                                        if (fil.name)
                                                            return (<Radio value={fil.name} my={1}>
                                                                {this.toSentenceCase(fil.name)}
                                                            </Radio>)
                                                    }) : null
                                            }
                                        </Radio.Group>
                                    </VStack>
                                    <Divider />
                                </Box>
                            ))
                        }
                        <VStack space={2}>
                            <Heading>
                                Availability
                            </Heading>
                            <Radio.Group
                                value={this.state.filter.avail}
                                onChange={(value) => {
                                    this.setState({
                                        filter: {
                                            ...this.state.filter,
                                            avail: value
                                        }
                                    })
                                }}
                                name="SortGroup">
                                <Radio value="1" my={1}>
                                    In-Stock
                                </Radio>
                                <Radio value="0" my={1}>
                                    Out-Stock
                                </Radio>
                            </Radio.Group>
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
