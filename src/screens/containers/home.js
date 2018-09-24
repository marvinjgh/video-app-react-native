import React, { Component, Fragment } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import API from "../../../utils/api";
import Header from "../../sections/components/header";
import SuggestionList from "../../videos/containers/suggestion-list";
import CategoryList from "../../videos/containers/category-list.js";
import Search from "../../sections/containers/search";

class Home extends Component {
  static navigationOptions = () => {
    return {
      header: Header
    };
  };
  async componentDidMount() {
    this.focus = this.props.navigation.addListener("didFocus", () => {
      console.log("did focus");
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("white");
    });
    const categoryList = await API.getMovies();
    this.props.dispatch({
      type: "SET_CATEGORY_LIST",
      payload: {
        categoryList,
        categoryLoading: false
      }
    });
    const suggestionList = await API.getSuggestion(10);
    this.props.dispatch({
      type: "SET_SUGGESTION_LIST",
      payload: {
        suggestionList,
        suggestionLoading: false
      }
    });
  }
  componentWillUnmount() {
    this.focus.remove();
  }
  render() {
    return (
      <Fragment>
        <Search />
        <CategoryList />
        <SuggestionList />
      </Fragment>
    );
  }
}

export default connect(null)(Home);
