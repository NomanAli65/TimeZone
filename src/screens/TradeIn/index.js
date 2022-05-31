import React, { Component } from 'react';
import { View, ScrollView, Text, Heading, Select } from "native-base";

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
          <Select
            placeholder="Select"
            selectedValue={"key0"}
            width={150}
            onValueChange={(itemValue) => console.warn("ok")}
          >
            <Select.Item label="Wallet" value="key0" />
            <Select.Item label="ATM Card" value="key1" />
            <Select.Item label="Debit Card" value="key2" />
            <Select.Item label="Credit Card" value="key3" />
            <Select.Item label="Net Banking" value="key4" />
          </Select>
        </View>
      </ScrollView>
    );
  }
}
