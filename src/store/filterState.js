export const initialFilterState = {
  filters: {
    influencerValue: '',
    hashtagValue: '',
    countryValue: '',
    dateRangeValue: {
      fromDate: '2022-06-01',
      toDate: '2022-07-31',
    },
    calenderToggler: false,
  },
  loaders: {
    countryLineChartLoading: true,
  },
};
