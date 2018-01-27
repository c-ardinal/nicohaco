// @flow

import { connect } from 'react-redux';
import * as actions from '../actions/mylist';
import * as pageActions from '../actions/page';
import SideMenu from '../components/organisms/SideMenu';

import type { State } from '../types/states';
import type { GroupArray } from '../types/states/mylist';

type MapStateToProps = {
  group: GroupArray;
  ready: boolean;
  pathname: string;
};

type MapDispatchToProps = {
  setup: () => void;
  reload: () => void;
  pushPage: (string) => void;
  createMylist: (string) => void;
  selectMylist: (string) => void;
};

export type Props = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: State): MapStateToProps => ({
  group: state.mylist.group,
  ready: state.mylist.ready,
  pathname: state.router.location.pathname
});

const mapDispatchToProps = (dispatch): MapDispatchToProps => ({
  setup: () => dispatch(actions.setup()), // for loading mylistgroup
  reload      : () => dispatch(actions.fetchMylistgroup()),
  pushPage    : (path) => dispatch(pageActions.pushPage(path)),
  createMylist: (name) => dispatch(actions.createMylist(name)),
  selectMylist: (id) => {
    dispatch(pageActions.pushPage(`/mylist/${id}`));
    dispatch(actions.loadMylist(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);