import moment from "moment/moment";

const formatDate = moment().format("YYYY-MM-DD");

export const initialFilterState = {
  filters: {
    influencerValue: "",
    hashtagValue: "",
    countryValue: "",
    dateRangeValue: {
      fromDate: "2022-09-01",
      toDate: formatDate,
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
