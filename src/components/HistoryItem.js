import { Box, Heading, HStack, Icon, IconButton, Image, Stack, Text, VStack } from 'native-base';
import numbro from 'numbro';
import React, { useState } from 'react';
import { AntDesign, Feather } from "@expo/vector-icons";
import { img_url } from '../configs/APIs';

function HistoryItem({ item }) {

    const [open, setOpen] = useState(false);

    let formatted_price = numbro(item?.total).formatCurrency({
        thousandSeparated: true,
        abbreviations: {
            thousand: "k",
            million: "m"
        },
        currencySymbol: "AED "
    });
    return (
        <Box _dark={{ backgroundColor: "gray.800" }} w={"100%"} alignItems="center" mb={2} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
            <Stack space={1} w={"100%"} p={3}>
                <Stack py={1}>
                    <HStack space={3}>
                        <Image borderRadius={3} alignSelf={"center"} h={60} w={60} source={{ uri: img_url + item?.order_detail[0]?.product_detail?.image }} alt="image" resizeMode='cover' />
                        <VStack flex={1}>
                            <Heading size={"md"} flexWrap={"wrap"}>
                                {item?.order_detail[0]?.product_detail?.product_name}
                            </Heading>
                            <Text flexWrap={"wrap"} numberOfLines={2} bold color={"primary.100"}>
                                {
                                    numbro(item?.order_detail[0]?.product_detail?.price).formatCurrency({
                                        thousandSeparated: true,
                                        abbreviations: {
                                            thousand: "k",
                                            million: "m"
                                        },
                                        currencySymbol: "AED "
                                    })
                                }
                            </Text>
                        </VStack>
                        {
                            item?.order_detail?.length > 1 ?
                                <IconButton
                                    onPress={() => setOpen(!open)}
                                    icon={<Icon size="sm" as={Feather} name="chevron-down" color="black" />} />
                                : null
                        }

                    </HStack>
                </Stack>
                {
                    open ?
                        item?.order_detail?.map((product, index) => {
                            if (index != 0)
                                return (
                                    <Stack py={1}>
                                        <HStack space={3}>
                                            <Image borderRadius={3} alignSelf={"center"} h={60} w={60} source={{ uri: img_url + product?.product_detail?.image }} alt="image" resizeMode='cover' />
                                            <VStack flex={1}>
                                                <Heading size={"md"} flexWrap={"wrap"}>
                                                    {product?.product_detail?.product_name}
                                                </Heading>
                                                <Text flexWrap={"wrap"} numberOfLines={2} bold color={"primary.100"}>
                                                    {
                                                        numbro(product?.product_detail?.price).formatCurrency({
                                                            thousandSeparated: true,
                                                            abbreviations: {
                                                                thousand: "k",
                                                                million: "m"
                                                            },
                                                            currencySymbol: "AED "
                                                        })
                                                    }
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Stack>)
                        })
                        : null
                }
                <HStack justifyContent={"space-between"} w="100%" mt={3}>
                    <VStack>
                        <Heading flexWrap={"wrap"} numberOfLines={3} bold color={"primary.100"}>
                            {formatted_price}
                        </Heading>
                        <Text fontSize={"12"} flexWrap={"wrap"} color={"gray.400"}>
                            {item?.payment_type == "card" ? "Credit/Debit Card" : "COD Cash on delivery"}
                        </Text>
                    </VStack>
                    <Text fontSize={"12"} flexWrap={"wrap"} numberOfLines={3} alignSelf='flex-end' color={"gray.400"}>
                        {item?.created_at ? new Date(item?.created_at).toDateString() : ""}
                    </Text>
                </HStack>
            </Stack>
        </Box>
    )
}

export default HistoryItem;