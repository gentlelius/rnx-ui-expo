/**
 * 主页面 rnx-ui 面板
 */
import React from 'react';
import PropTypes from 'prop-types';
import All from 'rnx-ui/All';
import NavBar from 'rnx-ui/NavBar';
import {
  HomeList,
} from '../../component';
import Router from '../../router';

const sectionList = ['Navigation', 'Data Entry', 'Data Display', 'Feedback', 'Other'];
const pageException = ['Home'];
const keys = Object.keys(Router.pages).filter(k => pageException.indexOf(k) === -1);
const keyList = [];
const genItem = key => ({ content: key, onPress: () => Router.open(key) });
const itemList = keys
  .map((key) => {
    const section = Router.pages[key].section || 'Other';
    return { key, section };
  })
  .sort((a, b) => {
    const sectionA = a.section;
    const sectionB = b.section;

    return sectionList.indexOf(sectionA) - sectionList.indexOf(sectionB);
  })
  .reduce((p, n) => {
    const last = p[p.length - 1];
    const diff = !last || last.section !== n.section;

    // 需要戳一个 section header
    if (diff) {
      p.push({ header: true, section: n.section });
      keyList.unshift([]);
    }
    keyList[0].push(n.key);
    p.push(n);
    return p;
  }, [])
  .reduce((prev, n) => {
    const p = prev;

    if (n.header) {
      p[n.section] = { type: 'title', text: n.section, ...n };
      return p;
    }
    p[`${n.section}:${n.key}`] = genItem(n.key);

    return p;
  }, {});

// function Page() {

// }

class Page extends React.Component {

  render() {
    const { navigate, goBack } = this.props.navigation;
    Router.navigate = navigate;
    Router.goBack = goBack;
    return (
      <All>
        <NavBar title="RNX UI" />
        <HomeList
          items={itemList}
          sectionIds={sectionList}
          rowIds={keyList.reverse()}
        />
        {/* <Text>start</Text>
        <Icon2 />
        <Text>end</Text> */}
      </All>
    );
  }

}


Page.propTypes = {
  navigation: PropTypes.object,
};

Router.register('Home', Page);

export default Page;
