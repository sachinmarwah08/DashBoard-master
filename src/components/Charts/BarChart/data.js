const Bardata = {
  chart: {
    type: "bar",
    height: 500,
    zoomType: "y",
  },

  title: {
    style: {
      display: "none",
    },
    text: null,
  },
  xAxis: {
    categories: [
      // "Russia",
      // "China",
      // "India",
      // "United States",
      // "Indonesia",
      // "Nigeria",
      // "Brazil",
      // "Mexico",
      // "Japan",
      // "Ethiopia",
      // "Austria",
      // "Estonia",
      // "Sweden",
      // "Italy",
      // "Czechia",
      // "Latvia",
      // "Finland",
      // "Slovenia",
    ],

    title: {
      style: {
        display: "none",
      },
      text: null,
    },

    accessibility: {
      description: "Countries",
    },
  },

  credits: {
    enabled: false,
  },

  yAxis: {
    min: 0,
    max: 30,

    tickInterval: 0,
    title: {
      style: {
        display: "none",
      },
      text: null,
    },

    labels: {
      style: {
        display: "none",
      },
      overflow: "justify",
      format: "{value}%",
    },
  },
  plotOptions: {
    series: {
      pointPadding: -0.1,
      borderRadius: 3,
    },
    bar: {
      dataLabels: {
        enabled: false,
        format: "{y}%",
      },
    },
  },
  tooltip: {
    valueSuffix: "M",
    useHTML: true,
    backgroundColor: null,
    borderWidth: 0,
    shadow: true,
    outside: true,
    pointFormat:
      "{series.name}: <strong>{point.y}</strong><br/>Happy: <strong>86%</strong><br/>Sad: <strong>30%</strong>",

    stickOnContact: false,
    style: {
      zIndex: 899999999999,
    },
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Sentiment",
      color: "rgba(240, 87, 40, 0.35)",
      borderColor: "rgba(240, 87, 40, 0.35)",
      // data: [27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1.5],
      data: [],
    },
  ],

  accessibility: {
    enabled: false,
  },
};

export default Bardata;
