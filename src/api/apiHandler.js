/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { algoliaConfig } from './config/algolia';
import { PaginatedResult } from './entities/PaginatedResult';
import { PackageInfo } from './entities/PackageInfo';

const algoliaParams = {
  'x-algolia-application-id': algoliaConfig.id,
  'x-algolia-api-key': algoliaConfig.key,
};

/**
 * @param {Object} paramsObject
 * @return {string}
 */
const objectToString = (paramsObject) => Object.keys(paramsObject)
  .map((key) => (
    `${key}=${encodeURI(JSON.stringify(paramsObject[key]))}`
  ))
  .join('&');

const getAlgoliaApiPath = (apiPath) => `${algoliaConfig.url}${apiPath}`;

class ApiHandler {
  /**
   * @type {import('axios').CancelTokenSource|null}
   */
  cancelToken = null;

  /**
   * @type {import('axios').AxiosStatic}
   */
  _axios;

  constructor() {
    this._axios = axios;
  }

  /**
   * @param {string} query
   * @param {number} page
   */
  searchPackages(query, page = 1, perPage = 10) {
    this._setCancelToken();
    const axiosPromise = this._axios.post(
      getAlgoliaApiPath('indexes/npm-search/query'),
      {
        params: objectToString({
          query,
          page: page - 1,
          hitsPerPage: perPage,
          attributesToHighlight: [],
          attributesToRetrieve: [
            'name',
            'description',
          ],
        }),
      },
      {
        params: algoliaParams,
        cancelToken: this.cancelToken.token,
      },
    );
    return new Promise((resolve, reject) => {
      axiosPromise
        .then(({ data }) => {
          const items = ([...data.hits] || [])
            .map((itemData) => new PackageInfo(itemData));
          const response = new PaginatedResult(
            items,
            +data.page + 1 || 1,
            +data.hitsPerPage || 10,
            +data.nbHits || 0,
          );
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  packageInfo(packageName) {
    this._setCancelToken();
    const axiosPromise = this._axios.get(
      getAlgoliaApiPath(`indexes/npm-search/${packageName}`),
      {
        params: algoliaParams,
        cancelToken: this.cancelToken.token,
      },
    );
    return new Promise((resolve, reject) => {
      axiosPromise
        .then(({ data }) => {
          const packageInfo = new PackageInfo(data);
          resolve(packageInfo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  _setCancelToken() {
    this.cancelToken = this._axios.CancelToken.source();
  }
}

export const apiHandler = new ApiHandler();
