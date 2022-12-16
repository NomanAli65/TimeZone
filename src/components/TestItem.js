import React, { useCallback, useMemo } from "react";
import { Button, Flatlist, StyleSheet, Text, View, Pressable } from "react-native";


const ListItem = ({ item, index, onPress }) => {
    const data = useMemo(() => item, [item]);
    const Press = useCallback((d, i) => onPress(d, i),[data]);
    console.warn(index)
    return (
        <Pressable onPress={() => Press(data, index)}>
            <View style={{ ...styles.container, backgroundColor: data.checked ? "#5c5c5c" : "#fff" }}>
                <Text>{data.name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ListItem;