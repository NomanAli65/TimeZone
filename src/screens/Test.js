import React, { useCallback, useMemo, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import ListItem from "../components/TestItem";


const names = ["noman", "taha", "umair", "maaz", "hamza", "shehroz"];

function Test() {

    const [selected, setSelected] = useState([{ name: "noman", checked: false }, { name: "ahsan", checked: false }, { name: "maaz", checked: false }, { name: "hamza", checked: false }, { name: "souhaib", checked: false }]);

    const onPress = useCallback((i) => {

        setSelected(prevItems => prevItems.map((v, index) => {
            let obj = { ...v };
            if (index == i && v.checked == false) {
                obj.checked = true
            }
            else if (index == i && v.checked == true) {
                obj.checked = false
            }

            return obj;
        }));
    }, []);

    return (
        <View style={styles.app}>
            <FlatList
                data={selected}
                renderItem={({ item, index }) => <ListItem checked={item.checked} name={item.name} index={index} onPress={onPress} />}
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
