export const data = [
  {
    name: "Jun 1, 22",
    labels: "MM",
    Worldwide: 100,
    India: 80,
  },
  {
    name: "Jun 4, 22",
    Worldwide: 80,
    India: 60,
  },
  {
    name: "Jun 7, 22",
    Worldwide: 40,
    India: 100,
  },
  {
    name: "Jun 10, 22",
    Worldwide: 60,
    India: 40,
  },
  {
    name: "Jun 13, 22",
    Worldwide: 50,
    India: 30,
  },
  {
    name: "Jun 16, 22",
    Worldwide: 70,
    India: 50,
  },
  {
    name: "Jun 19, 22",
    Worldwide: 40,
    India: 30,
  },
  {
    name: "Jun 22, 22",
    Worldwide: 90,
    India: 80,
  },
  {
    name: "Jun 25, 22",
    Worldwide: 70,
    India: 100,
  },
];

export const CompareTime = [
  {
    name: "Week 1",
    labels: "MM",
    Worldwide: 100,
    India: 80,
  },
  {
    name: "Week 2",
    Worldwide: 80,
    India: 60,
  },
  {
    name: "Week 3",
    Worldwide: 40,
    India: 100,
  },
  {
    name: "Week 4",
    Worldwide: 60,
    India: 40,
  },
];

export const LineChartBarData = {
  chart: {
    type: "column",
    height: 200,
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
        fontSize: "0.688rem",
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
    gridLineColor: "transparent",
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
      enableMouseTracking: false,
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
  // tooltip: {
  //   valueSuffix: "%",
  //   stickOnContact: false,
  //   backgroundColor: "rgba(255, 255, 255, 0.93)",
  // },
  legend: {
    enabled: false,
  },
  series: [
    {
      // name: "Organic farming area",
      // color: "rgba(240, 87, 40, 0.35)",
      // borderColor: "rgba(240, 87, 40, 0.35)",
      data: [
        { y: 34.4, color: "#F05728" },
        { y: 24.4, color: "#2A00FF" },
      ],
    },
  ],
};
