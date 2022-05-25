import { Button, Divider, Heading, Radio, ScrollView, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';

export default class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View flex={1} backgroundColor="#fff">
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
                            <Radio.Group name="SortGroup">
                                <Radio value="popular" my={1}>
                                    Popularity
                                </Radio>
                                <Radio value="latest" my={1}>
                                    Latest
                                </Radio>
                                <Radio value="lowHigh" my={1}>
                                    Price:Low to high
                                </Radio>
                            </Radio.Group>
                        </VStack>
                        <Divider />
                        <VStack space={2}>
                            <Heading>
                                Gender
                            </Heading>
                            <Radio.Group name="SortGroup">
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
                            <Radio.Group name="SortGroup">
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
                            <Radio.Group name="SortGroup">
                                <Radio value="days" my={1}>
                                    In 2-3 days
                                </Radio>
                                <Radio value="stock" my={1}>
                                    In-Stock
                                </Radio>
                                <Radio value="out" my={1}>
                                    Out-Stock
                                </Radio>
                            </Radio.Group>
                        </VStack>
                    </VStack>
                </ScrollView >
                <Button m={3} onPress={()=>this.props.navigation.goBack()}>
                    Apply
                </Button>
            </View>
        );
    }
}
