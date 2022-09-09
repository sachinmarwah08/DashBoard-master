export const compareCountryData = [
  {
    name: "Jun 1, 22",
    Worldwide: 1,
    India: 0.5,
  },
  {
    name: "Jun 4, 22",
    Worldwide: 0.5,
    India: 0,
  },
  {
    name: "Jun 7, 22",
    Worldwide: -1,
    India: 0.5,
  },
  {
    name: "Jun 10, 22",
    Worldwide: 0,
    India: 1,
  },
  {
    name: "Jun 13, 22",
    Worldwide: 0,
    India: 0.5,
  },
  {
    name: "Jun 16, 22",
    Worldwide: 1,
    India: 1,
  },
  {
    name: "Jun 19, 22",
    Worldwide: 1,
    India: 0,
  },
  {
    name: "Jun 22, 22",
    Worldwide: 0.5,
    India: -0.5,
  },
  {
    name: "Jun 25, 22",
    Worldwide: 0,
    India: 1,
  },
];

export const CompareTime = [
  {
    name: "Week 1",
    Worldwide: 1,
    India: 0.5,
  },
  {
    name: "Week 2",
    Worldwide: 0.5,
    India: 0,
  },
  {
    name: "Week 3",
    Worldwide: -1,
    India: 0.5,
  },
  {
    name: "Week 4",
    Worldwide: 0,
    India: 1,
  },
];

export const LineChartBarData = {
  chart: {
    type: "column",
    height: 200,
    width: 110,
    zoomType: false,
    // minorGridLineWidth: "100%",
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
    labels: {
      enabled: false,
    },

    title: {
      style: {
        width: "200%",
        fontSize: "0.688rem",
      },
      // text: "Average Comparison",
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
    gridLineColor: "transparent",
    min: 8,
    max: 100,

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
      // enableMouseTracking: false,
      cursor: "pointer",
      pointPadding: 0.14,
      groupPadding: -0.2,
      borderRadius: 3,
    },
    bar: {
      borderWidth: 0,

      dataLabels: {
        // enabled: false,
        pointPadding: -0.1,
        overflow: "justify",
        format: "{value}%",
      },
    },
  },
  tooltip: {
    shadow: true,
    outside: true,
    useHTML: true,
    backgroundColor: null,
    borderWidth: 0,
    valueSuffix: "M",
    stickOnContact: false,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Index",
      color: "rgba(240, 87, 40, 0.35)",
      // borderColor: "rgba(240, 87, 40, 0.35)",
      data: [
        { y: 34.4, color: "#F05728" },
        { y: 24.4, color: "#2A00FF" },
      ],
    },
  ],
  accessibility: {
    enabled: false,
  },
};

export const chooseTimeBarData = {
  chart: {
    type: "column",
    height: 200,
    width: 110,
    zoomType: false,
    // minorGridLineWidth: "100%",
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
    labels: {
      enabled: false,
    },

    title: {
      style: {
        width: "200%",
        fontSize: "0.688rem",
      },
      // text: "Average Comparison",
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
    gridLineColor: "transparent",
    min: 8,
    max: 100,

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
      // enableMouseTracking: false,
      cursor: "pointer",
      pointPadding: 0.14,
      groupPadding: -0.2,
      borderRadius: 3,
    },
    bar: {
      borderWidth: 0,

      dataLabels: {
        // enabled: false,
        pointPadding: -0.1,
        overflow: "justify",
        format: "{value}%",
      },
    },
  },
  tooltip: {
    shadow: true,
    outside: true,
    useHTML: true,
    backgroundColor: null,
    borderWidth: 0,
    valueSuffix: "M",
    stickOnContact: false,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Index",
      color: "rgba(240, 87, 40, 0.35)",
      // borderColor: "rgba(240, 87, 40, 0.35)",
      data: [
        { y: 34.4, color: "#F05728" },
        { y: 24.4, color: "#2A00FF" },
      ],
    },
  ],
  accessibility: {
    enabled: false,
  },
};
