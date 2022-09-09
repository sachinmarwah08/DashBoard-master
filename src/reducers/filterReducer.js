import {
  RESET_FILTERS,
  SET_FILTERS,
  UPDATE_ALL_LOADERS_TRUE,
  UPDATE_LOADERS,
} from '../actions/types';

const filterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [payload.field]: payload.value,
        },
      };
    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          influencerValue: '',
          hashtagValue: '',
          countryValue: '',
        },
        loaders: {
          ...state.loaders,
          countryLineChartLoading: true,
        },
      };
    case UPDATE_LOADERS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          [payload.field]: payload.value,
        },
      };
    case UPDATE_ALL_LOADERS_TRUE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          countryLineChartLoading: true,
        },
      };
    default:
      return state;
  }
};

export default filterReducer;
