import { Button, Divider, Heading, Radio, ScrollView, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        let filter = this.props.route.params.filters;
        this.state = {
            filter
        };
    }

    onPressApply = () => {
        this.props.route.params.setFilter(this.state.filter);
        this.props.navigation.goBack();
    }

    render() {
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
                                Color
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
                                <Radio value="red" my={1}>
                                    Red
                                </Radio>
                                <Radio value="blue" my={1}>
                                    Blue
                                </Radio>
                                <Radio value="green" my={1}>
                                    Green
                                </Radio>
                            </Radio.Group>
                        </VStack>
                        <Divider />
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
                <Button m={3} onPress={() => this.onPressApply()}>
                    Apply
                </Button>
            </View>
        );
    }
}
