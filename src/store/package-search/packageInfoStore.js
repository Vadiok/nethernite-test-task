/* eslint-disable no-shadow */
import {
  StoreNames as SN, withoutPackageInfoNamespace as woNS,
} from '../StoreNames';
import { apiHandler } from '../../api/apiHandler';

const state = () => ({
  name: null,
  item: null,
  loadingToken: null,
});

const getters = {
  [woNS(SN.INFO_ITEM)]: ({ item }) => item,
  [woNS(SN.INFO_IS_LOADING)]: ({ loadingToken }) => !!loadingToken,
  [woNS(SN.INFO_NAME)]: ({ name }) => name,
};

const actions = {
  [woNS(SN.INFO_LOAD)]: (context, name = null) => {
    const cancelMessage = 'fetch cancelled';
    if (context.state.loadingToken) {
      context.state.loadingToken.cancel(cancelMessage);
    }
    context.commit(woNS(SN.INFO_SET_NAME), name);
    if (!name || !name.length) {
      context.commit(woNS(SN.INFO_SET_ITEM), null);
      return;
    }
    const apiPromise = apiHandler.packageInfo(name);
    context.commit(woNS(SN.INFO_SET_LOADING_TOKEN), apiHandler.cancelToken);
    apiPromise
      .then((item) => {
        context.commit(woNS(SN.INFO_SET_LOADING_TOKEN), null);
        context.commit(woNS(SN.INFO_SET_ITEM), item);
      })
      .catch(({ message }) => {
        if (message && message === cancelMessage) {
          return;
        }
        context.commit(woNS(SN.INFO_SET_LOADING_TOKEN), null);
      });
  },

  [woNS(SN.INFO_CLEAR)]: (context) => {
    if (context.state.loadingToken) {
      context.commit(woNS(SN.INFO_SET_LOADING_TOKEN), null);
    }
    if (context.state.name) {
      context.commit(woNS(SN.INFO_SET_NAME), null);
    }
    if (context.state.item) {
      context.commit(woNS(SN.INFO_SET_ITEM), null);
    }
  },
};

const mutations = {
  [woNS(SN.INFO_SET_ITEM)]: (state, item = null) => {
    state.item = item;
  },
  [woNS(SN.INFO_SET_NAME)]: (state, name = null) => {
    state.name = name;
  },
  [woNS(SN.INFO_SET_LOADING_TOKEN)]: (state, token = null) => {
    state.loadingToken = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
