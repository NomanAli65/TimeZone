import { AspectRatio, Box, Button, FlatList, Heading, HStack, Icon, IconButton, Image, Pressable, ScrollView, Skeleton, Stack, Text, View } from 'native-base';
import React, { Component, useState } from 'react';
import AppBar from '../components/Appbar';
import SearchBar from '../components/SearchBar';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions, View as RNView, Image as RNImage, RefreshControl } from "react-native";
import WatchItem from '../components/WatchItem';
import { connect } from 'react-redux';
import { GeneralMiddleware } from '../redux/Middlewares/GeneralMiddleware';
import { img_url } from '../configs/APIs';
import GeneralActions from '../redux/Actions/GeneralActions';
import AuthAction from '../redux/Actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetToken from './Auth/GetToken';

const { width } = Dimensions.get("window");


const dummy_data = [{}, {}, {}, {}, {}];

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      search: ""
    };
  }

  async componentDidMount() {
    //let token = await GetToken();
    // console.warn(token)
   // this.LoginIfRegistered();
    this.props.getDashboard({
      onSuccess: () => {
        this.setState({ loading: false })
      }
    });
    // BackHandler.addEventListener("hardwareBackPress", this.BackPress());
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  BackPress = () => {
    this.props.StopLoading();
    return false;
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
          <Pressable
            onPress={() => {
              this.props.navigation.navigate("Products", { category: item })
            }}
          >
            <Stack space={4} alignItems="center">
              <Image alignSelf={"center"} h={60} w={60} source={item.category_image ? { uri: img_url + item.category_image } : require("../../assets/placeholder.png")} alt="image" resizeMode='stretch' />
            </Stack>
          </Pressable>
        </Box>
      )
  }

  _renderItemSmallBrand = ({ item }) => {
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
          <Pressable
            onPress={() => {
              this.props.navigation.navigate("Products", { brand: item })
            }}
          >
            <Stack space={4} alignItems="center">
              <Image alignSelf={"center"} h={60} w={60} source={item.brand_image ? { uri: img_url + item.brand_image } : require("../../assets/placeholder.png")} alt="image" resizeMode='stretch' />
            </Stack>
          </Pressable>
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
          <RNImage source={{ uri: img_url + item.banner_path }} style={{ width, height: 250 }} resizeMode="stretch" />
        </RNView>
      )
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.emptyDashboard()
    this.props.getDashboard({
      onSuccess: () => {
        this.setState({ refreshing: false })
      }
    });
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View flex={1}
          backgroundColor="#fff"
          _dark={{
            backgroundColor: "#000"
          }}
          paddingBottom={30}
        >
          <AppBar
            title={"TIMEZONE"}
            noCart
            noWish
            noLeftIcon
          />
          <SearchBar
            placeholder={"Search TIMEZONE"}
            onChangeText={(search) => this.setState({ search })}
            onSubmitEditing={() => {
              this.props.navigation.navigate("Products", { search: this.state.search })
              this.setState({ search: "" })
            }}
            value={this.state.search}
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
              data={this.state.loading ? [{}, {}, {}, {}] : this.props.dashboard?.banners}
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
                  onPress={() => this.props.navigation.navigate("Products", { filter: "popular" })}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.popular_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Brands
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("AllBrands")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  All Brands
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.top_brands : dummy_data}
                renderItem={this._renderItemSmallBrand}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
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
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.featured_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Categories
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("TopCategories")}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View more
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.top_categories : dummy_data}
                renderItem={this._renderItemSmall}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
            <Stack space={2}>
              <HStack justifyContent={"space-between"}>
                <Heading>
                  Latest Watches
                </Heading>
                <Button
                  onPress={() => this.props.navigation.navigate("Products", { filter: "latest" })}
                  variant={"unstyled"} rightIcon={<Icon as={MaterialIcons} name="chevron-right" size={"sm"} mx={-2} />}>
                  View More
                </Button>
              </HStack>
              <FlatList
                horizontal
                keyExtractor={(item) => item.id}
                data={!this.state.loading ? this.props.dashboard?.latest_watches : dummy_data}
                renderItem={this._renderItem}
                ListEmptyComponent={
                  <Box ml={'32'}>
                    <Heading fontSize={"md"}>
                      No Data Found
                    </Heading>
                  </Box>
                }
              />
            </Stack>
          </Stack>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.GeneralReducer.loading,
  dashboard: state.GeneralReducer.dashboardData
})

const mapDispatchToProps = dispatch => ({
  getDashboard: data => dispatch(GeneralMiddleware.getDashboardData(data)),
  emptyDashboard: () => dispatch(GeneralActions.SetDashboardData(null)),
  StopLoading: () => dispatch(GeneralActions.HideLoading()),
  Login: (data) => dispatch(AuthAction.Login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
