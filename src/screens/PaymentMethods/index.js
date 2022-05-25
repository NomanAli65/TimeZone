import { Box, Fab, FlatList, HStack, Icon, IconButton, Image, Pressable, Radio, Text, View } from 'native-base';
import React, { Component } from 'react';
import AppBar from '../../components/Appbar';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import theme from '../../configs/Theme';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    _renderItem = ({ index }) => {
        return (
            <Box rounded={"lg"} p={4}>
                <Pressable onPress={() => this.setState({ selectedIndex: index })}>
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
                            icon={<Ionicons name="trash-bin" color={theme.colors.black} size={20} />}
                            onPress={() => alert("ok")}
                        />
                    </HStack>
                </Pressable>
            </Box>
        )
    }

    render() {
        return (
            <View flex={1} backgroundColor="white">
                <AppBar
                    title={"Payment Methods"}
                    noCart
                    noWish
                    back
                />
                <FlatList
                    p={3}
                    data={["", "", "", ""]}
                    renderItem={this._renderItem}
                />
                <Fab onPress={()=>this.props.navigation.navigate("AddCard")} renderInPortal={false} shadow={2} w={55} h={55} icon={<Icon color="white" as={AntDesign} name="plus" size="sm" ml={2} />} />
            </View>
        );
    }
}
