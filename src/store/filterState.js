export const initialFilterState = {
  filters: {
    influencerValue: "",
    hashtagValue: "",
    countryValue: "",
    dateRangeValue: {
      fromDate: "2022-09-01",
      toDate: "2022-09-15",
    },
    calenderToggler: false,
    filterActive: false,
  },
  data: {
    countryDropData: [],
    hashtagDropData: [],
    influencerDropData: [],
    topInfluencerDataDrop: [],
  },
  loaders: {
    countryLineChartLoading: true,
    topInfluencerLoading: true,
  },
};
