const data = {
  chart: {
    type: "bar",
    height: 800,
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
      "Russia",
      "China",
      "India",
      "United States",
      "Indonesia",
      "Nigeria",
      "Brazil",
      "Mexico",
      "Japan",
      "Ethiopia",
      "Austria",
      "Estonia",
      "Sweden",
      "Italy",
      "Czechia",
      "Latvia",
      "Finland",
      "Slovenia",
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
    valueSuffix: "%",
    stickOnContact: false,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Organic farming area",
      color: "rgba(240, 87, 40, 0.35)",
      borderColor: "rgba(240, 87, 40, 0.35)",
      data: [
        24.1, 20.6, 20.3, 15.2, 14.8, 14.5, 13.1, 10.0, 9.9, 9.8, 14.5, 13.1,
        10.0, 9.9, 9.8,
      ],
    },
  ],
};

export default data;

export const LineChartBarData = {
  chart: {
    type: "column",
    height: 220,
    width: 110,
    zoomType: "x",

    minorGridLineWidth: "100%",
  },

  title: {
    style: {
      display: "none",
    },
    text: null,
  },
  xAxis: {
    lineColor: "transparent",
    minorTickLength: 100,
    tickLength: 200,

    categories: "none",
    // categories: ["Russia"],
    labels: {
      enabled: false,
    },

    title: {
      style: {
        width: "200%",
        fontSize: "11px",
      },
      text: "Average Comparison",
    },

    accessibility: {
      description: "Countries",
    },
  },

  credits: {
    enabled: false,
  },

  yAxis: {
    gridLineHeight: 100,
    // minorGridLineWidth: 200,
    gridLineColor: "transparent",
    // minorGridLineWidth: "80px",
    min: 8,
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
      pointPadding: 0.14,
      groupPadding: -0.2,
      borderRadius: 3,
    },
    bar: {
      borderWidth: 0,

      dataLabels: {
        enabled: false,
        pointPadding: -0.1,
        format: "{y}%",
      },
    },
  },
  tooltip: {
    valueSuffix: "%",
    stickOnContact: false,
    backgroundColor: "rgba(255, 255, 255, 0.93)",
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Organic farming area",
      color: "rgba(240, 87, 40, 0.35)",
      borderColor: "rgba(240, 87, 40, 0.35)",
      data: [
        { y: 34.4, color: "#F05728" },
        { y: 24.4, color: "#2A00FF" },
      ],
    },
  ],
};
