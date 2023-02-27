import { Box, FlatList, Heading, HStack, IconButton, Image, Stack, Text, View, Spinner, Skeleton, Pressable, Icon, Divider, Fab, Menu, Toast } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import LGButton from '../../components/LGButton';
import { connect } from 'react-redux';
import { ProductMiddleware } from '../../redux/Middlewares/ProductMiddleware';
import { APIs, img_url } from '../../configs/APIs';
import { AuthMiddleware } from '../../redux/Middlewares/AuthMiddleware';
import AuthAction from '../../redux/Actions/AuthActions';


class AllAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            loading: true,
        };
    }


    componentDidMount() {
        this.props.getAllAddress({
            callback: () => {
                this.setState({ loading: false })
            }
        })
    }

    _renderItem = ({ item, index }) => {
        if (this.state.loading)
            return (
                <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
                    <HStack space={1} w={"full"} p={2}>
                        <Stack space={1} w={"70%"}>
                            <Skeleton h={5} w="100%" mb={2} />
                            <Skeleton.Text />
                        </Stack>
                    </HStack>
                </Box>
            )
        else
            return (
                <Box
                    _dark={{ backgroundColor: "gray.800" }}
                    w={"100%"}
                    alignItems="center"
                    mb={2}
                    backgroundColor="#f7f7f7"
                    overflow={"hidden"}
                    rounded="lg"
                    borderColor={"primary.100"}
                    borderWidth={parseInt(item?.is_default)}
                >
                    <Pressable onPress={() => this.SelectAddress(item)}>
                        <HStack space={1} w={"full"} p={2}>
                            <Stack space={1} flex={1} pl={2}>
                                <Heading size={"sm"}>
                                    {item?.title}
                                </Heading>
                                <Text fontSize={"13"} flexWrap={"wrap"} numberOfLines={2}>
                                    {item?.address}
                                    {item?.city ? ", " + item?.city : ""}
                                    {item?.country ? ", " + item?.country : ""}
                                </Text>
                            </Stack>
                            <Menu
                                defaultIsOpen={false}
                                w="150" trigger={triggerProps => {
                                    return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                        <Icon as={MaterialIcons} name="more-vert" />
                                    </Pressable>;
                                }}>
                                <Menu.Item
                                    _text={{
                                        fontSize: "md"
                                    }}
                                    onPress={() => {
                                        this.EditAddress(item)
                                    }}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item
                                    _text={{
                                        fontSize: "md"
                                    }}
                                    onPress={() => {
                                        if (item.is_default == 1)
                                            Toast.show({
                                                title: "Cannot Delete default address"
                                            })
                                        else
                                            this.DeleteAddress(index, item.id)
                                    }}>
                                    Delete
                                </Menu.Item>
                            </Menu>
                            {/* <IconButton
                                onPress={() => {
                                    this.DeleteAddress(index, item.id)
                                }}
                                ml={1} alignSelf={"center"} icon={<AntDesign name='delete' size={25} />}
                                _dark={{
                                    color: "#fff"
                                }} /> */}
                        </HStack>
                    </Pressable>
                </Box>
            )
    }

    SelectAddress = (item) => {
        let addresses = [...this.props.addresses];
        addresses.forEach((addr) => {
            if (addr.id == item.id)
                addr.is_default = 1;
            else
                addr.is_default = 0;
        });
        this.props.updateAddress(addresses);
        this.props.defaultAddress({
            callback: () => { },
            id: item?.id,
            default: 1
        })

        let address = item?.address + (item?.city ? ", " + item?.city : "") + (item?.country ? ", " + item?.country : "");
        this.props.route.params.setAddress(item?.title, address);
        this.props.navigation.goBack();
    }

    DeleteAddress = (index, id) => {
        let addresses = [...this.props.addresses];
        addresses.splice(index, 1);
        this.props.updateAddress(addresses);
        this.props.deleteAddress({
            callback: () => {

            },
            id,
            user: this.props.user
        });
    }

    EditAddress = (data) => {
        this.props.navigation.navigate("Address", {
            data
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getAllAddress({
            callback: () => {
                this.setState({ refreshing: false })
            }
        })
    }
    //rgba(172, 153, 86,0.5)
    render() {
        return (
            <View flex={1} backgroundColor="#fff" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"My Addresses"}
                    noCart
                    noWish
                    back
                />
                <FlatList
                    p={3}
                    mb={2}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    renderItem={this._renderItem}
                    data={this.state.loading && this.props.addresses?.length == 0 ? [{}, {}, {}, {}] : this.props.addresses}
                // ListFooterComponent={
                //     this.state.loading && this.props.addresses?.length != 0 ?
                //         <Box p={3}>
                //             <Spinner size={"lg"} />
                //         </Box>
                //         : null
                // }
                />
                <Fab onPress={() => this.props.navigation.navigate("Address")} renderInPortal={false} shadow={2} w={55} h={55} icon={<Icon color="white" as={AntDesign} name="plus" size="lg" />} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    addresses: state.Auth.addresses,
    user: state.Auth.user,

})

const mapDispatchToProps = dispatch => ({
    showAlert: (payload) => dispatch({ type: AlertTypes.SHOW_ALERT, payload }),
    getAllAddress: data => dispatch(AuthMiddleware.getAllAddress(data)),
    deleteAddress: data => dispatch(AuthMiddleware.deleteAddress(data)),
    updateAddress: (data) => dispatch(AuthAction.GetAddresses(data)),
    defaultAddress: (data) => dispatch(AuthMiddleware.defaultAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllAddress);