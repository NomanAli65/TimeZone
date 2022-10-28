import { Box, Fab, FlatList, HStack, Icon, IconButton, Image, Pressable, Radio, Spinner, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { APIs } from '../../configs/APIs';
import { connect } from 'react-redux';

class index extends Component {
    constructor(props) {
        super(props);
        let selectedIndex = this.props.all_methods.findIndex(val => val.is_default == "1");
        this.state = {
            selectedIndex,
            loading: true,
            refreshing: true
        };
    }

    componentDidMount() {
        this.props.getAllMethods({
            onSuccess: () => {
                let selectedIndex = this.props.all_methods.findIndex(val => val.is_default == "1");
                this.setState({ refreshing: false, selectedIndex })
            }
        })
    }

    _renderItem = ({ index, item }) => {
        return (
            <Box rounded={"lg"} p={4}>
                <Pressable onPress={() => {
                    this.props.defaultMethod(item.stripe_card_id)
                    this.setState({ selectedIndex: index });
                    this.props.navigation.goBack();
                }}>
                    <HStack alignItems="center" justifyContent={"space-between"}>
                        <HStack space={4} alignItems="center">
                            <Radio.Group
                                value={this.state.selectedIndex + ''}
                            >
                                <Radio
                                    value={'' + index}
                                />
                            </Radio.Group>
                            <Image alt={"image"} w={25} h={6} resizeMode="stretch" source={item.card_brand == "Visa" ? require("../../../assets/visa.png") : require("../../../assets/master.png")} />
                            <Text bold>xxxx-xxxx-xxxx-{item.card_end_number}</Text>
                        </HStack>
                        <IconButton
                            icon={<Ionicons name="trash-bin" color={theme.config.initialColorMode == "dark" ? "#ccc" : "#000"} size={20} />}
                            onPress={() => {
                                this.props.deleteMethod({
                                    index, id: item.id, onSuccess: () => {
                                        console.warn(this.props.all_methods)
                                        let selectedIndex = this.props.all_methods.findIndex(val => val.is_default == "1");
                                        this.setState({ selectedIndex })
                                    }
                                })
                            }}
                        />
                    </HStack>
                </Pressable>
            </Box>
        )
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.getAllMethods({
            onSuccess: () => {
                this.setState({ refreshing: false })
            }
        })
    }

    render() {
        return (
            <View flex={1} backgroundColor="white" _dark={{ backgroundColor: "black" }}>
                <AppBar
                    title={"Payment Methods"}
                    noCart
                    noWish
                    back
                />
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    p={3}
                    data={this.props.all_methods}
                    renderItem={this._renderItem}
                />
                <Fab onPress={() => this.props.navigation.navigate("AddCard")} renderInPortal={false} shadow={2} w={55} h={55} icon={<Icon color="white" as={AntDesign} name="plus" size="sm" ml={2} />} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    all_methods: state.User.methods
})

const mapDispatchToProps = dispatch => ({
    getAllMethods: data => dispatch(UserMiddleware.getAllMethods(data)),
    deleteMethod: data => dispatch(UserMiddleware.DeleteMethod(data)),
    defaultMethod: data => dispatch(UserMiddleware.DefaultMethod(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
