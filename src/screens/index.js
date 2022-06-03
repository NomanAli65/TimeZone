import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View } from 'native-base';
import React, { Component, useState } from 'react';
import AppBar from '../components/Appbar';
import SearchBar from '../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions, View as RNView, Image as RNImage } from "react-native";
import WatchItem from '../components/WatchItem';

const { width } = Dimensions.get("window");


const banners = [
  {
    image: require("../../assets/1.jpg")
  },
  {
    image: require("../../assets/2.jpg")
  },
  {
    image: require("../../assets/3.jpg")
  },
]

const data = [
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  },
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  },
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  },
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  },
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  },
  {
    name: "Rolex with diamonds",
    desc: "watch with diamonds in its dial and it looks beautiful to watch",
    image: require("../../assets/wt.png")
  }
]

const dataB = [
  {
    name: "Rolex",
    image: require("../../assets/rolex.png")
  },
  {
    name: "Rado",
    image: require("../../assets/rado.png")
  },
  {
    name: "Timex",
    image: require("../../assets/timex.png")
  },
  {
    name: "TAG",
    image: require("../../assets/tag.png")
  },
  {
    name: "Seiko",
    image: require("../../assets/seiko.png")
  },
]

const dataC = [
  {
    name: "Rolex",
    image: require("../../assets/rolex.png")
  },
  {
    name: "Rado",
    image: require("../../assets/rado.png")
  },
  {
    name: "Timex",
    image: require("../../assets/timex.png")
  },
  {
    name: "TAG",
    image: require("../../assets/tag.png")
  },
  {
    name: "Seiko",
    image: require("../../assets/seiko.png")
  },
]

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  _renderItem = ({ item }) => (
    <WatchItem
      loading={this.state.loading}
      item={item}
    />
  )

  _renderItemSmall = ({ item }) => {
    if (this.state.loading)
      return (
        <Box alignItems="center" marginRight={3} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" >
          <Stack space={4} alignItems="center">
            <Skeleton h={70} w={70} />
          </Stack>
        </Box>
      )
    else
      return (
        <Box alignItems="center" marginRight={3} backgroundColor="#f7f7f7" overflow={"hidden"} rounded="lg" p={2}>
          <Stack space={4} alignItems="center">
            <Image alignSelf={"center"} maxH={60} maxW={60} source={item.image} alt="image" resizeMode='contain' />
            {/* <Heading size={"sm"}>
            {item.name}
          </Heading> */}
          </Stack>
        </Box>
      )
  }

  _renderBanner = ({ item }) => {
    if (this.state.loading)
      return (
        <RNView style={{ width }}>
          <Skeleton width={"100%"} height={"100%"} />
        </RNView>
      )
    else
      return (
        <RNView style={{ width }}>
          <RNImage source={item.image} style={{ width, height: 250 }} resizeMode="cover" />
        </RNView>
      )
  }

  render() {
    return (
      <ScrollView>
        <View flex={1}
          backgroundColor="#fff"
          _dark={{
            backgroundColor: "#000"
          }}
        >
          <AppBar
            title={"TIMEZONE"}
            noCart
            noWish
            noLeftIcon
          />
          <SearchBar
            placeholder={"Search TIMEZONE"}
            onSubmitEditing={() => this.props.navigation.navigate("Products")}
          />
          <Box
            width={"100%"}
            height={250}
            mb={10}
          >
            <Carousel
              autoplay
              loop
              sliderHeight={250}
              itemHeight={250}
              sliderWidth={width}
              itemWidth={width}
              snapToInterval={width}
              enableSnap={false}
              data={banners}
              extraData={this.state.loading}
              renderItem={this._renderBanner}
            />
          </Box>
          <Stack px={3} space={10}>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Popular Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.name}
                data={data}
                renderItem={this._renderItem}
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Top Brands
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("AllBrands")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  All Brands
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.name}
                data={dataB}
                renderItem={this._renderItemSmall}
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Featured Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.name}
                data={data}
                renderItem={this._renderItem}
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Top Categories
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("AllCategories")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  All Categories
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.name}
                data={dataC}
                renderItem={this._renderItemSmall}
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Latest Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.name}
                data={data}
                renderItem={this._renderItem}
              />
            </Stack>
          </Stack>
        </View>
      </ScrollView>
    );
  }
}
