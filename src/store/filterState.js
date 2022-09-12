export const initialFilterState = {
  filters: {
    influencerValue: "",
    hashtagValue: "",
    countryValue: "",
    dateRangeValue: {
      fromDate: "2022-09-1",
      toDate: "2022-09-12",
    },
    calenderToggler: false,
  },
  loaders: {
    countryLineChartLoading: true,
  },
};
