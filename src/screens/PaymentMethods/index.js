import { Box, Fab, FlatList, HStack, Icon, IconButton, Image, Pressable, Radio, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';
import { UserMiddleware } from '../../redux/Middlewares/UserMiddleware';
import { APIs } from '../../configs/APIs';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    componentDidMount(){
        this.props.getAllMethods({
            next_url: this.props.all_methods?.next_url ? APIs.GetPaymentMethods : this.props.all_methods?.next_url,
        })
    }

    _renderItem = ({ index,item }) => {
        return (
            <Box rounded={"lg"} p={4}>
                <Pressable onPress={() => {
                    this.props.defaultMethod(item)
                    this.setState({ selectedIndex: index })
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
                            <Image alt={"image"} w={25} h={6} resizeMode="stretch" source={require("../../../assets/visa.png")} />
                            <Text bold>xxxx-xxxx-xxxx-1234</Text>
                        </HStack>
                        <IconButton
                            icon={<Ionicons name="trash-bin" color={theme.config.initialColorMode == "dark" ? "#ccc" : "#000"} size={20} />}
                            onPress={() => this.props.deleteMethod(index)}
                        />
                    </HStack>
                </Pressable>
            </Box>
        )
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
                    p={3}
                    data={this.props.all_methods?.data ? this.props.all_methods?.data : ["", "", "", ""]}
                    renderItem={this._renderItem}
                />
                <Fab onPress={() => this.props.navigation.navigate("AddCard")} renderInPortal={false} shadow={2} w={55} h={55} icon={<Icon color="white" as={AntDesign} name="plus" size="sm" ml={2} />} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.GeneralReducer.loading,
    all_methods: state.User.methods
})

const mapDispatchToProps = dispatch => ({
    getAllMethods: data => dispatch(UserMiddleware.getAllMethods(data)),
    deleteMethod: data => dispatch(UserMiddleware.DeleteMethod(data)),
    defaultMethod: data => dispatch(UserMiddleware.DefaultMethod(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
