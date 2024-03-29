import React, { Component } from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import All from 'rnx-ui/All';
import ImgRollView from 'rnx-ui/ImgRollView';
import Alert from 'rnx-ui/Alert';
import Router from '../../router';
import { NavBar, Icon } from '../../component';

import style from './styles';

class Page extends Component {
  static section = 'Data Entry';

  constructor(props) {
    super(props);

    this.state = {
      uriSelected: [],
      visible: false,
    };

    this.onSelect = this.onSelect.bind(this);
    this.toggleURIList = this.toggleURIList.bind(this);
  }

  onSelect(data) {
    const { uriSelected } = data;
    this.setState({ uriSelected });
  }

  toggleURIList() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { uriSelected, visible } = this.state;

    return (
      <All>
        <NavBar
          title="ImgRollView"
          leftEvent={() => { Router.back(this.props.navigation.state.key); }}
        />
        <ImgRollView
          onSelect={this.onSelect}
          style={style.imgRollViewStyle}
          maxSelected={5}
          iconSelected={<Icon name="fa-check" style={style.iconStyle} />}
          iconUnSelected={<Icon name="fa-check" style={style.iconStyle} />}
        />
        <TouchableHighlight onPress={this.toggleURIList} style={style.bottomBar}>
          <Text style={style.bottomBarText}>
            请选择图片：{uriSelected.length}/5
          </Text>
        </TouchableHighlight>
        <Alert
          visible={visible}
          message={uriSelected.join('\n')}
          onPress={this.toggleURIList}
        />
      </All>
    );
  }
}

Page.propTypes = {
  navigation: PropTypes.object,
};

Router.register('ImgRollView', Page);

export default Page;
