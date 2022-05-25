import { Box, Button as NativeBaseButton } from "native-base";
import React from "react";
//[ "#fcc08a", "#fdb472", "#fda75a", "#fd9a42"],//["#FBDBA2", "#fbd187", "#facd7a", "#f9c86d", "#f8c460", "#f7bf52"],
const LGButton = ({ onPress, title, isLoading, isLoadingText, ...props }) => {
    return (
        <Box
            bg={{
                linearGradient: {
                    colors: ["#5c5c5c", "#414141", "#000000"],//["#dac787", "#cab876", "#bba866", "#ac9956"],
                    start: [0, 0],
                    end: [1, 0]
                }
            }}
            rounded="sm"
        >
            <NativeBaseButton
                h={"12"}
                isLoading={isLoading}
                isLoadingText={isLoadingText}
                _loading={{
                    _text: {
                        color: "#fff"
                    }
                }}
                {...props}
                onPress={onPress}
                backgroundColor={"transparent"}>
                {title}
            </NativeBaseButton>
        </Box>
    );
};

export default LGButton;
