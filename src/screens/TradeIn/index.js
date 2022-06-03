import React, { Component } from 'react';
import { View, ScrollView, Text, Heading, Select, Input, VStack, HStack, TextArea, Box, Image, Icon, Pressable } from "native-base";
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let uri = result.uri;
      let name = uri.split("/")[uri.split("/").length - 1]
      let file = {
        uri,
        name,
        type: result.type,
      }
      this.setState({ images: [file, ...this.state.images] })
    }
  };
  //require("../../../assets/placeholder.png")
  render() {
    return (
      <ScrollView backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
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
            <HStack>
              <Heading fontSize={"md"}>
                Add Photos
              </Heading>
            </HStack>
            <Box borderRadius={3} borderWidth={1} borderColor="gray.200" h={145} justifyContent="center" p={3}
            _dark={{
              borderColor:"gray.600"
            }}
            >
              <ScrollView horizontal>
                <Pressable
                  onPress={() => this.pickImage()}
                  w={120} h={120} justifyContent="center" alignItems='center' backgroundColor={"gray.300"} mr={3}>
                  <Icon as={Entypo} name="plus" size={"10"} />
                </Pressable>
                {
                  this.state.images.map((value) => (
                    <Image
                      source={{ uri: value.uri }}
                      alt="image"
                      h={120} w={120}
                      backgroundColor="gray.300"
                      mr={3} />
                  ))
                }
              </ScrollView>
            </Box>
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
              onPress={() => this.props.navigation.navigate("PersonalDetail")}
            />
          </VStack>
        </View>
      </ScrollView>
    );
  }
}
