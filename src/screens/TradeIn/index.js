import React, { Component } from 'react';
import { View, ScrollView, Text, Heading, Select, Input, VStack, HStack, TextArea } from "native-base";
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View flex={1}>
          <AppBar
            noCart
            noWish
            noLeftIcon
            title={"Trade In"}
          />
          <VStack space={5} p={3}>
            <Select
              placeholder="Select"
              selectedValue={""}
              onValueChange={(itemValue) => console.warn("ok")}
            >
              <Select.Item label="Wallet" value="key0" />
              <Select.Item label="ATM Card" value="key1" />
              <Select.Item label="Debit Card" value="key2" />
              <Select.Item label="Credit Card" value="key3" />
              <Select.Item label="Net Banking" value="key4" />
            </Select>
            <Input placeholder='Name' />
            <Input placeholder='Model' />
            <Heading>
              Add more details (Optional)
            </Heading>
            <HStack>
              <Input flex={1} placeholder="Price" />
              <Select
                flex={0.5}
                placeholder="Select"
                selectedValue={"key0"}
                onValueChange={(itemValue) => console.warn("ok")}
              >
                <Select.Item label="AED" value="key0" />
                <Select.Item label="USD" value="key1" />
                <Select.Item label="PKR" value="key2" />
                <Select.Item label="INR" value="key3" />
              </Select>
            </HStack>
            <Select
              flex={0.5}
              placeholder="Select Condition"
              selectedValue={""}
              onValueChange={(itemValue) => console.warn("ok")}
            >
              <Select.Item label="AED" value="key0" />
              <Select.Item label="USD" value="key1" />
              <Select.Item label="PKR" value="key2" />
              <Select.Item label="INR" value="key3" />
            </Select>
            <Select
              flex={0.5}
              placeholder="Select Box/Paper"
              selectedValue={""}
              onValueChange={(itemValue) => console.warn("ok")}
            >
              <Select.Item label="Box" value="key0" />
              <Select.Item label="Papers" value="key1" />
              <Select.Item label="Box & Papers Both" value="key2" />
              <Select.Item label="None" value="key3" />
            </Select>
            <TextArea
            placeholder='Comments'
            />
            <LGButton
            title={"Next"}
            onPress={()=>this.props.navigation.navigate("PersonalDetail")}
            />
          </VStack>
        </View>
      </ScrollView>
    );
  }
}
