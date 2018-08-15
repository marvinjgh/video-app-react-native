import React, { Component } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import Empty from "../components/empty";
import Separator from "../../sections/components/horizontal-separator";
import Category from "../components/category";
import Layout from "../components/category-list-layout";
import { connect } from "react-redux";
import CenterLayout from '../../sections/components/center-layout';

function mapStateToProps(state) {
  return {
    list: state.categoryList,
    loading: state.categoryLoading
  };
}

class CategoryList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmtpy = () => <Empty text="No hay sugerencias :(" />;
  itemSeparator = () => <Separator />;
  renderItem = ({ item }) => {
    return <Category {...item} />;
  };
  render() {
    return (
      <Layout title="Categorias">
        {this.props.loading ? (
          <CenterLayout>
            <ActivityIndicator color="#98ca3f" />
          </CenterLayout>
        ) : (
          <FlatList
            horizontal
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

export default connect(mapStateToProps)(CategoryList);
