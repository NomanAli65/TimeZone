import React, { memo, useCallback, useMemo } from "react";
import { Button, Flatlist, StyleSheet, Text, View, Pressable } from "react-native";


const ListItem = memo(({ checked, name, index, onPress }) => {
    console.warn(index)
    return (
        <Pressable onPress={()=>onPress(index)}>
            <View style={{ ...styles.container, backgroundColor: checked ? "#5c5c5c" : "#fff" }}>
                <Text>{name}</Text>
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ListItem;