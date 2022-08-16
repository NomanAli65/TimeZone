import { Icon, Input } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = ({ onChangeText, placeholder, onSubmitEditing, filter, onFilterPress, value }) => {
    return (
        <Input
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            placeholder={placeholder}
            py="2.5"
            px="1"
            m={3}
            value={value}
            InputLeftElement={<Icon m="2" ml="3" size="6" color="#bbb" as={<MaterialIcons name="search" />} />}
            InputRightElement={filter ? <Icon m="2" ml="3" size="6" color="#bbb" onPress={onFilterPress} as={<MaterialIcons name="filter-alt" />} /> : null}
        />
    );
};

export default SearchBar;
