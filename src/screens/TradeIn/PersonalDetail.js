import { Button, HStack, Input, Pressable, ScrollView, Select, Text, View, VStack } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';

export default class PersonalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView backgroundColor="#fff" _dark={{backgroundColor:"black"}}>
                <View flex={1}>
                    <AppBar
                        noCart
                        noWish
                        back
                        title={"Personal Information"}
                    />
                    <VStack p={3} space={5}>
                        <Input
                            placeholder='First Name'
                        />
                        <Input
                            placeholder='Last Name'
                        />
                        <Input
                            placeholder='Email Name'
                        />
                        <HStack>
                            <Select
                                flex={0.4}
                                placeholder="Select Coountry Code"
                                selectedValue={"key2"}
                                onValueChange={(itemValue) => console.warn("ok")}
                            >
                                <Select.Item label="+92" value="key0" />
                                <Select.Item label="+1" value="key1" />
                                <Select.Item label="+971" value="key2" />
                            </Select>
                            <Input flex={1} placeholder={"1234567799"} />
                        </HStack>
                        <LGButton
                            title={"Get A Qoute"}
                        />
                        <Pressable>
                            <Text>
                                Terms & Condition
                            </Text>
                        </Pressable>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </Text>
                    </VStack>
                </View>
            </ScrollView>
        );
    }
}
