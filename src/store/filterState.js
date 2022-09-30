import moment from "moment/moment";

// const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
// const formatDate = moment().format("YYYY-MM-DD");

let newDate = moment().add(-30, "days").format("YYYY-MM-DD");
let formatDate = moment().subtract(1, "days").format("YYYY-MM-DD");

export const initialFilterState = {
  filters: {
    influencerValue: "",
    hashtagValue: "",
    countryValue: "",
    dateRangeValue: {
      fromDate: newDate,
      toDate: formatDate,
    },
    calenderToggler: false,
    filterActive: false,
  },
  applyClicked: false,
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
