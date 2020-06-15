/* eslint-disable no-shadow */
import { apiHandler } from '../../api/apiHandler';
import {
  StoreNames as SN,
  withoutPackageSearchNamespace as woNS,
} from '../StoreNames';

const state = () => ({
  query: '',
  items: [],
  loadingToken: null,
  page: 1,
  perPage: 10,
  total: null,
});

const getters = {
  [woNS(SN.SEARCH_QUERY)]: ({ query }) => [...query],
  [woNS(SN.SEARCH_ITEMS)]: ({ items }) => [...items],
  [woNS(SN.SEARCH_PAGE)]: ({ page }) => page,
  [woNS(SN.SEARCH_PER_PAGE)]: ({ perPage }) => perPage,
  [woNS(SN.SEARCH_TOTAL)]: ({ total }) => total,
  [woNS(SN.SEARCH_PAGES_TOTAL)]: ({ total, perPage }) => {
    const lastPage = Math.ceil((total || 0) / perPage);
    if (lastPage > 100) {
      return 100;
    }
    return lastPage;
  },
  [woNS(SN.SEARCH_IS_LOADING)]: ({ loadingToken }) => !!loadingToken,
  [woNS(SN.SEARCH_IS_CLEAR)]: ({ total }) => (total === null),
};

const actions = {
  [woNS(SN.SEARCH_LOAD)]: (context, payload) => {
    const query = (payload.query || (payload.acceptEmpty ? '' : context.state.query)).trim();
    const page = payload.page || 1;
    const cancelMessage = 'fetch cancelled';
    if (context.state.loadingToken) {
      context.state.loadingToken.cancel(cancelMessage);
    }
    if (!query || !query.length || query.length < 2) {
      context.commit(woNS(SN.SEARCH_RESET_STATE));
      return;
    }
    context.commit(woNS(SN.SEARCH_SET_QUERY), query);
    const apiPromise = apiHandler.searchPackages(query, page, context.state.perPage);
    context.commit(woNS(SN.SEARCH_SET_LOADING_TOKEN), apiHandler.cancelToken);
    apiPromise
      .then((response) => {
        context.commit(woNS(SN.SEARCH_SET_LOADING_TOKEN), null);
        context.commit(woNS(SN.SEARCH_SET_PAGE), response.page);
        context.commit(woNS(SN.SEARCH_SET_TOTAL), response.total);
        context.commit(woNS(SN.SEARCH_SET_ITEMS), response.items);
      })
      .catch(({ message }) => {
        if (message && message === cancelMessage) {
          return;
        }
        context.commit(woNS(SN.SEARCH_SET_LOADING_TOKEN), null);
      });
  },
};

const mutations = {
  [woNS(SN.SEARCH_RESET_STATE)]: (state) => {
    state.query = '';
    state.items = [];
    state.loadingToken = null;
    state.page = 1;
    state.perPage = 10;
    state.total = null;
  },
  [woNS(SN.SEARCH_SET_LOADING_TOKEN)]: (state, token = null) => {
    state.loadingToken = token;
  },
  [woNS(SN.SEARCH_SET_QUERY)]: (state, query = '') => {
    state.query = query;
  },
  [woNS(SN.SEARCH_SET_PAGE)]: (state, page = 1) => {
    state.page = page;
  },
  [woNS(SN.SEARCH_SET_TOTAL)]: (state, total = null) => {
    state.total = total;
  },
  [woNS(SN.SEARCH_SET_ITEMS)]: (state, items = []) => {
    state.items = [...items];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
