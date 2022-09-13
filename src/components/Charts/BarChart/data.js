import HighchartsReact from "highcharts-react-official";

const Bardata = {
  chart: {
    type: "bar",
    height: 470,
    zoomType: false,
  },

  navigator: {
    enabled: false,
  },
  exporting: {
    enabled: false,
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
      cursor: "pointer",
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
    valueSuffix: "",
    useHTML: true,
    backgroundColor: null,
    borderWidth: 0,
    shadow: true,
    outside: true,
    followPointer: true,
    // headerFormat: "<span style="fontSize: 24px">{point.key}</span><br>",
    // pointFormat: "{series.name}: <strong>{point.y}",
    // formatter: function () {
    //   return "Extra data: <b>" + "{point.data}" + "</b>";
    // },
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y}k</b></td></tr>',
    stickOnContact: false,
    style: {
      zIndex: 899999999999,
      fontFamily: "Work-Sans",
    },
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Index",
      fontFamily: "Work-Sans",
      fontWeight: 700,
      fontSize: "16px",
      color: "rgba(240, 87, 40, 0.35)",
      // borderColor: "rgba(240, 87, 40, 0.35)",
      // data: [27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1.5],
      data: [],
    },
  ],

  accessibility: {
    enabled: false,
  },
};

export default Bardata;
