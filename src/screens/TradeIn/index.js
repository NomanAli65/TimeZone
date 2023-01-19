import React, { Component } from 'react';
import { View, ScrollView, Text, Heading, Select, Input, VStack, HStack, TextArea, Box, Image, Icon, Pressable, FormControl, WarningOutlineIcon, Button, AlertDialog, IconButton, Center } from "native-base";
import { Modal, PermissionsAndroid, Platform, SafeAreaView } from "react-native";
import AppBar from '../../components/Appbar';
import LGButton from '../../components/LGButton';
import { Entypo } from "@expo/vector-icons";
import * as ImagePickers from 'expo-image-picker';
import { connect } from 'react-redux';
import { GeneralMiddleware } from '../../redux/Middlewares/GeneralMiddleware';
import * as FileSystem from "expo-file-system";
import { ImagePicker } from 'expo-image-multiple-picker'
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getAssetInfoAsync } from 'expo-media-library';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      name: "",
      model: "",
      price: "",
      condition: "",
      box_paper: "",
      comments: "",
      brand: "",
      invalid: "",
      loading: true,
      isOpen: false,
      picker: false
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
      await ImagePickers.requestCameraPermissionsAsync()
      let result = await ImagePickers.launchCameraAsync({
        mediaTypes: ImagePickers.MediaTypeOptions.Images,
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
      await ImagePickers.requestMediaLibraryPermissionsAsync()
      if (Platform.OS == "android") {
        let perm = await PermissionsAndroid.request("android.permission.READ_EXTERNAL_STORAGE");
        if (perm == PermissionsAndroid.RESULTS.GRANTED)
          this.setState({ picker: true })
      }
      else {
        this.setState({ picker: true })
      }
      // let result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: false,
      //   aspect: [2, 3],
      //   quality: 1,
      //   allowsMultipleSelection: true,
      // });

      // if (!result.cancelled) {
      //   let uri = result.uri;
      //   //  let info=await FileSystem.getInfoAsync(uri,{size:true});
      //   let name = uri.split("/")[uri.split("/").length - 1]
      //   let file = {
      //     uri,
      //     name,
      //     type: result.type + "/jpeg",
      //   }
      //   this.setState({ images: [file, ...this.state.images] })
      // }
    }

  };
  //require("../../../assets/placeholder.png")
  render() {
    return (
      <View flex={1}>
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
                  <Input value={this.state.price} keyboardType='numeric' placeholder="Price" onChangeText={(price) => this.setState({ price, invalid: "" })} />
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
                <Select.Item label="Unworn" value="unworn" />
                <Select.Item label="Mint" value="mint" />
                <Select.Item label="Old" value="old" />
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
                onSubmitEditing={()=>{}}
                blurOnSubmit
              />
              <LGButton
                title={"Next"}
                onPress={() => {
                  if (!this.state.brand || !this.state.name || !this.state.model || !this.state.price || this.state.images.length == 0) {
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
          <Modal
            visible={this.state.picker}
            animationType="slide"
            onRequestClose={() => this.setState({ picker: false })}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <ImagePicker
                  theme={{
                    header: (header) => (
                      <HStack bg="black" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                        <HStack alignItems="center">
                          <IconButton
                            onPress={() => this.setState({ picker: false })}
                            icon={<Icon size="sm" as={MaterialIcons} name="chevron-left" color="white" />} />
                          <Text color="white" fontSize="20" fontWeight="bold" textAlign={"center"}>
                            {header?.album?.title ? header?.album?.title : "Select images"}
                          </Text>
                        </HStack>
                        {header?.imagesPicked ?
                          <HStack alignItems="center">
                            <Text color="white" fontSize="20" fontWeight="bold" textAlign={"center"}>
                              {header?.imagesPicked}
                            </Text>
                            <IconButton
                              onPress={() => {
                                this.setState({ picker: false })
                                header.save()
                              }}
                              icon={<Icon as={MaterialIcons} name="check" size="sm" color="white" />} />
                          </HStack>
                          : null}
                      </HStack>
                    )
                  }}
                  multiple
                  galleryColumns={3}
                  onSave={async (assets) => {
                    if (assets.length > 0) {
                      let imgs = await Promise.all(assets.map(async (val) => {
                        let data = await getAssetInfoAsync(val)
                        return {
                          uri: data.localUri,
                          name: data.filename,
                          type: "image/jpeg",
                        }
                      }));
                      //console.warn(imgs)
                      // let imgs = assets.map((val) => {
                      //   let data = await getAssetInfoAsync(val)
                      //   return {
                      //     uri: data.localUri,
                      //     name: data.filename,
                      //     type: "image/jpeg",
                      //   }
                      // })
                      // console.warn(imgs)
                      this.setState({ images: [...this.state.images, ...imgs] })
                    }
                  }}
                  onCancel={() => console.log('no permissions or user go back')}
                />
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>
        {
          !this.props.user?.user ?
            <Box flex={1} p={5} justifyContent="center" position="absolute" top={0} left={0} bottom={0} right={0} backgroundColor="white">
              <Center>
                <Heading mb={3} fontSize={17} textAlign="center">
                  Please login to trade your watch
                </Heading>
                <LGButton
                  w="40"
                  title={"Login"}
                  onPress={() => this.props.navigation.navigate("Login")}
                />
              </Center>
            </Box> :
            null
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  all_brands: state.GeneralReducer.all_brands,
  user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
  getAllBrands: data => dispatch(GeneralMiddleware.getAllBrands(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
