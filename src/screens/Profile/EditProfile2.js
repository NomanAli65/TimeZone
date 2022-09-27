import React, { Component } from 'react';
import { Avatar, Box, Button, FormControl, Heading, HStack, Icon, IconButton, Input, ScrollView, Stack, Text, View, VStack, theme, WarningOutlineIcon, AlertDialog, Pressable } from "native-base";
import AppBar from '../../components/Appbar';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import * as ImagePickers from 'expo-image-picker';
import { img_url } from '../../configs/APIs';
import { ImagePicker } from 'expo-image-multiple-picker'
import { Modal } from "react-native";

class EditProfile2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user?.user?.name,
            phone: this.props.user?.user?.phone,
            country: this.props.user?.user.country,
            city: this.props.user?.user.city,
            address: this.props.user?.user.address,
            pic: null,
            invalid: "",
            loading: "",
            isOpen: false,
            picker: false
        };
    }

    UpdateProfile = () => {
        let { name, country, city, address, pic, phone } = this.state;

        if (!name || !country || !city || !address) {
            this.setState({ invalid: "Please fill all fields" });
            return;
        }
        this.setState({ loading: true });
        this.props.UpdateProfile({
            name,
            country,
            city,
            address,
            pic,
            phone,
            old_data: this.props.user,
            onSuccess: (success) => {
                if (success) {
                    this.props.navigation.goBack();
                }
                this.setState({ loading: false });
            }
        })
    }

    pickImage = async (type) => {
        // No permissions request is necessary for launching the image library
        if (type == "camera") {
            let result = await ImagePickers.launchCameraAsync({
                mediaTypes: ImagePickers.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [2, 3],
                quality: 1,
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
                this.setState({ pic: file })
            }
        }
        else {
            this.setState({ picker: true })
            // let result = await ImagePicker.launchImageLibraryAsync({
            //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //     allowsEditing: false,
            //     aspect: [2, 3],
            //     quality: 1,
            // });

            // if (!result.cancelled) {
            //     let uri = result.uri;
            //     //  let info=await FileSystem.getInfoAsync(uri,{size:true});
            //     let name = uri.split("/")[uri.split("/").length - 1]
            //     let file = {
            //         uri,
            //         name,
            //         type: result.type + "/jpeg",
            //     }
            //     this.setState({ pic: file })
            // }
        }

    };

    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <Box mt={"9%"} mb={"3%"} px={"2%"} alignItems="flex-start">
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon={<MaterialIcons name="chevron-left" size={25} color={theme.config.initialColorMode == "dark" ? "#fff" : "#000"} />} />
                </Box>
                <ScrollView>
                    <View flex={1} justifyContent="center" p="5%">
                        <Stack>
                            <Heading bold fontSize={35} color="black" _dark={{ color: "#fff" }}>
                                Update your profile
                            </Heading>
                            <Text color="coolGray.400" fontSize={17}>Please fill required fields to continue</Text>
                        </Stack>
                        <FormControl marginY={50} isInvalid={this.state.invalid}>
                            <VStack w="100%" space="md">
                                <Pressable onPress={() => this.setState({ isOpen: true })}>
                                    <Avatar
                                        alignSelf={"center"}
                                        size={120}
                                        source={this.state.pic?.uri ? { uri: this.state.pic?.uri } : this.props.user?.user?.profile_pic ? { uri: img_url + this.props.user?.user?.profile_pic } : require("../../../assets/user_place.png")}
                                    />
                                </Pressable>
                                <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Name"
                                    value={this.state.name}
                                    onChangeText={(name) => this.setState({ name, invalid: "" })}
                                />
                                <Input
                                    onChangeText={(phone) => {
                                        this.setState({ phone, invalid: "" })
                                    }}
                                    value={this.state.phone || ""}
                                    InputLeftElement={<Icon as={Ionicons} name='call' size={5} color="#bbb" ml={2} />} placeholder="Phone number" />
                                {/* <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" /> */}
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country"
                                    value={this.state.country}
                                    onChangeText={(country) => this.setState({ country, invalid: "" })}
                                />
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City"
                                    value={this.state.city}
                                    onChangeText={(city) => this.setState({ city, invalid: "" })}
                                />
                                <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address"
                                    value={this.state.address}
                                    onChangeText={(address) => this.setState({ address, invalid: "" })}
                                />
                            </VStack>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                {this.state.invalid}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <LGButton
                            isLoading={this.state.loading}
                            isLoadingText={"Updating profile"}
                            onPress={this.UpdateProfile}
                            title="Update" />
                    </View>
                </ScrollView>
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
                <Modal
                    visible={this.state.picker}
                    animationType="slide"
                    onRequestClose={() => this.setState({ picker: false })}
                >
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
                                                {/* <Text color="white" fontSize="20" fontWeight="bold" textAlign={"center"}>
                                                    {header?.imagesPicked}
                                                </Text> */}
                                                <IconButton
                                                    onPress={() => {
                                                        this.setState({ picker: false })
                                                        header.save()
                                                    }}
                                                    icon={<Icon as={MaterialIcons} name="check" size="sm" color="white" />} />
                                            </HStack>
                                            : null}
                                    </HStack>
                                ),
                            }}
                            galleryColumns={3}
                            onSave={(assets) => {
                                if (assets.length > 0) {
                                    let img = assets.map((val) => ({
                                        uri: val.uri,
                                        name: val.filename,
                                        type: "image/jpeg",
                                    }))
                                    this.setState({ pic: img[0] })
                                }
                            }}
                            onCancel={() => console.log('no permissions or user go back')}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.Auth.user
})

const mapDispatchToProps = dispatch => ({
    UpdateProfile: data => dispatch(AuthMiddleware.UpdateProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile2);


{/* <Avatar
                            size="2xl"
                            source={require("../../../assets/user_place.png")}
                        />
                        <VStack space={4} w="90%">
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="First Name" />
                            <Input InputLeftElement={<Icon as={Ionicons} name='person' size={5} color="#bbb" ml={2} />} placeholder="Last Name" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Country" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="City" />
                            <Input InputLeftElement={<Icon as={MaterialCommunityIcons} name='home-map-marker' size={5} color="#bbb" ml={2} />} placeholder="Address" />
                        </VStack> */}