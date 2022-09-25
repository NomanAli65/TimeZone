import React, { Component } from 'react';
import { View, ScrollView, Text, Heading, Select, Input, VStack, HStack, TextArea, Box, Image, Icon, Pressable, FormControl, WarningOutlineIcon, Button, AlertDialog } from "native-base";
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import * as FileSystem from "expo-file-system";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      name: "",
      model: "",
      price: "",
      condition: 1,
      box_paper: "",
      comments: "",
      brand: "",
      invalid: "",
      loading: true,
      isOpen: false
    };
  }

  componentDidMount() {
    this.props.getAllBrands({
      search: "",
      callback: () => {
        this.setState({ loading: false })
      }
    })
  }

  pickImage = async (type) => {
    // No permissions request is necessary for launching the image library
    if (type == "camera") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [2, 3],
        quality: 1,
        allowsMultipleSelection: true
      });

      if (!result.cancelled) {
        let uri = result.uri;
        // let info=await FileSystem.getInfoAsync(uri,{size:true});
        let name = uri.split("/")[uri.split("/").length - 1]
        let file = {
          uri,
          name,
          type: result.type + "/jpeg",
        }
        this.setState({ images: [file, ...this.state.images] })
      }
    }
    else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [2, 3],
        quality: 1,
        allowsMultipleSelection:true,
      });

      if (!result.cancelled) {
        let uri = result.uri;
        //  let info=await FileSystem.getInfoAsync(uri,{size:true});
        let name = uri.split("/")[uri.split("/").length - 1]
        let file = {
          uri,
          name,
          type: result.type + "/jpeg",
        }
        this.setState({ images: [file, ...this.state.images] })
      }
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
            <FormControl isInvalid={this.state.invalid}>
              <VStack space={5}>
                {
                  !this.state.loading ?
                    <Select
                      placeholder="Select Brand"
                      selectedValue={this.state.brand}
                      onValueChange={(itemValue) => this.setState({ brand: itemValue, invalid: "" })}
                    >
                      {
                        this.props.all_brands.map((value) => (
                          <Select.Item label={value.brand_name} value={value.id} />
                        ))
                      }
                    </Select>
                    : <Text ml={3}>
                      Loading Brands
                    </Text>
                }

                <Input value={this.state.name} placeholder='Watch Name' onChangeText={(name) => this.setState({ name, invalid: "" })} />
                <Input value={this.state.model} placeholder='Watch Refrence Number' onChangeText={(model) => this.setState({ model, invalid: "" })} />
                <HStack>
                  <Heading fontSize={"md"}>
                    Add Photos
                  </Heading>
                </HStack>
                <Box borderRadius={3} borderWidth={1} borderColor="gray.200" h={145} justifyContent="center" p={3}
                  _dark={{
                    borderColor: "gray.600"
                  }}
                >
                  <ScrollView horizontal>
                    <Pressable
                      onPress={() => this.setState({ isOpen: true })}
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
              </VStack>
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {this.state.invalid}
              </FormControl.ErrorMessage>
            </FormControl>
            <Heading>
              Add more details (Optional)
            </Heading>
            {/* <HStack> */}
            <Input value={this.state.price} keyboardType='numeric' flex={1} placeholder="Price" onChangeText={(price) => this.setState({ price })} />
            {/* <Select
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
            </HStack> */}
            <Select
              flex={0.5}
              placeholder="Select Condition"
              selectedValue={this.state.condition}
              onValueChange={(itemValue) => this.setState({ condition: itemValue })}
            >
              <Select.Item label="3/10" value="3" />
              <Select.Item label="4/10" value="4" />
              <Select.Item label="5/10" value="5" />
              <Select.Item label="6/10" value="6" />
              <Select.Item label="7/10" value="7" />
              <Select.Item label="8/10" value="8" />
              <Select.Item label="9/10" value="9" />
              <Select.Item label="10/10" value="10" />
            </Select>
            <Select
              flex={0.5}
              placeholder="Select Box/Paper"
              selectedValue={this.state.box_paper}
              onValueChange={(itemValue) => this.setState({ box_paper: itemValue })}
            >
              <Select.Item label="Box" value="packing_box" />
              <Select.Item label="Papers" value="packing_paper" />
              <Select.Item label="Box & Papers Both" value="packing_box and paper" />
              <Select.Item label="None" value="packing_none" />
            </Select>
            <TextArea
              value={this.state.comments}
              placeholder='Comments'
              onChangeText={(comments) => this.setState({ comments })}
            />
            <LGButton
              title={"Next"}
              onPress={() => {
                if (!this.state.brand || !this.state.name || !this.state.model || this.state.images.length == 0) {
                  this.setState({ invalid: "Please fill all required fields" });
                  return;
                }
                this.props.navigation.navigate("PersonalDetail", { data: this.state, Reset: () => this.setState({ brand: "", name: "", model: "", price: "", condition: 1, box_paper: "", comments: "", images: [] }) })
              }}
            />
          </VStack>
          <AlertDialog isOpen={this.state.isOpen} onClose={() => this.setState({ isOpen: false })}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Select Option</AlertDialog.Header>
              <AlertDialog.Body>
                Select where do you want to select images from?
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button variant="unstyled" colorScheme="coolGray" onPress={() => this.setState({ isOpen: false })}>
                    Cancel
                  </Button>
                  <Button colorScheme="green" onPress={() => {
                    this.pickImage("camera")
                    this.setState({ isOpen: false });
                  }}>
                    Camera
                  </Button>
                  <Button colorScheme="blue" onPress={() => {
                    this.pickImage("library")
                    this.setState({ isOpen: false });
                  }}>
                    Library
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  all_brands: state.GeneralReducer.all_brands
})

const mapDispatchToProps = dispatch => ({
  getAllBrands: data => dispatch(GeneralMiddleware.getAllBrands(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
