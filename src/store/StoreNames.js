export const packageSearchNamespace = 'packageSearch';
export const packageInfoNamespace = 'packageInfo';

const addNamespace = (namespace, name) => `${namespace}/${name}`;
const addPackageSearchNamespace = (name) => addNamespace(packageSearchNamespace, name);
const addPackageInfoNamespace = (name) => addNamespace(packageInfoNamespace, name);

const withoutNamespace = (namespace, fullName) => {
  const regexp = new RegExp(`^${namespace}/`);
  return fullName.replace(regexp, '');
};
export const withoutPackageSearchNamespace = (fullName) => (
  withoutNamespace(packageSearchNamespace, fullName)
);
export const withoutPackageInfoNamespace = (fullName) => (
  withoutNamespace(packageInfoNamespace, fullName)
);

export const StoreNames = {
  SEARCH_QUERY: addPackageSearchNamespace('query'),
  SEARCH_ITEMS: addPackageSearchNamespace('items'),
  SEARCH_PAGE: addPackageSearchNamespace('page'),
  SEARCH_PER_PAGE: addPackageSearchNamespace('perPage'),
  SEARCH_TOTAL: addPackageSearchNamespace('total'),
  SEARCH_PAGES_TOTAL: addPackageSearchNamespace('pagesTotal'),
  SEARCH_IS_LOADING: addPackageSearchNamespace('isLoading'),
  SEARCH_IS_CLEAR: addPackageSearchNamespace('isClear'),
  SEARCH_LOAD: addPackageSearchNamespace('loadPage'),
  SEARCH_SET_QUERY: addPackageSearchNamespace('setQuery'),
  SEARCH_SET_PAGE: addPackageSearchNamespace('setPage'),
  SEARCH_SET_ITEMS: addPackageSearchNamespace('setItems'),
  SEARCH_SET_LOADING_TOKEN: addPackageSearchNamespace('setLoadingToken'),
  SEARCH_SET_TOTAL: addPackageSearchNamespace('setTotal'),
  SEARCH_RESET_STATE: addPackageSearchNamespace('resetState'),

  INFO_ITEM: addPackageInfoNamespace('info'),
  INFO_LOAD: addPackageInfoNamespace('load'),
  INFO_IS_LOADING: addPackageInfoNamespace('isLoading'),
  INFO_NAME: addPackageInfoNamespace('name'),
  INFO_CLEAR: addPackageInfoNamespace('clear'),
  INFO_SET_ITEM: addPackageInfoNamespace('set'),
  INFO_SET_NAME: addPackageInfoNamespace('setName'),
  INFO_SET_LOADING_TOKEN: addPackageInfoNamespace('setLoadingToken'),
};
