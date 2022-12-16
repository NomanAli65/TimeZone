import React, { useCallback, useMemo, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import ListItem from "../components/TestItem";


const names = ["noman", "taha", "umair", "maaz", "hamza", "shehroz"];

function Test() {

    const [selected, setSelected] = useState([{ name: "noman", checked: false }, { name: "noman", checked: false }, { name: "noman", checked: false }, { name: "noman", checked: false }, { name: "noman", checked: false }]);

    const onPress = (item, i) => {
        let arr_copy = [...selected];
        if (arr_copy[i].checked) {
            arr_copy[i].checked = false;
        }
        else {
            arr_copy[i].checked = true;
        }
        setSelected(arr_copy);
    };

    return (
        <View style={styles.app}>
            <FlatList
                data={selected}
                renderItem={({ item, index }) => <ListItem item={item} index={index} onPress={onPress} />}
            />
            <Button title="Submit" onPress={() => {
                alert(JSON.stringify(selected))
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        padding: 20,
        paddingVertical: 40,
        backgroundColor: "#fff"
    }
    , container: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Test;
