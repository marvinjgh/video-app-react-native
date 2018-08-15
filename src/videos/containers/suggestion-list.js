import React, { Component } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import Layout from "../components/suggestion-list-layout";
import Empty from "../components/empty";
import Separator from "../../sections/components/vertical-separator";
import Suggestion from "../components/suggestion";
import { connect } from "react-redux";
import CenterLayout from '../../sections/components/center-layout';

function mapStateToProps(state) {
  return {
    list: state.suggestionList,
    loading: state.suggestionLoading
  };
}

class SuggestionList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmtpy = () => <Empty text="No hay sugerencias :(" />;
  itemSeparator = () => <Separator />;
  viewMovie = item => {
    this.props.dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: {
        movie: item
      }
    });
  };
  renderItem = ({ item }) => {
    return (
      <Suggestion
        {...item}
        onPress={() => {
          this.viewMovie(item);
        }}
      />
    );
  };
  render() {
    return (
      <Layout title="Recomendado para ti">
        {this.props.loading ? (
          <CenterLayout>
            <ActivityIndicator color="#98ca3f" />
          </CenterLayout>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.props.list}
            ListEmptyComponent={this.renderEmtpy}
            ItemSeparatorComponent={this.itemSeparator}
            renderItem={this.renderItem}
          />
        )}
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(SuggestionList);
