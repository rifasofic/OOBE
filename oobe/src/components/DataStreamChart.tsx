import ReactApexChart from "react-apexcharts";
import { type ApexOptions } from "apexcharts";
import { Card, Row, Col } from "react-bootstrap";
import "./DataStreamChart.scss";
import { FormattedMessage } from "react-intl";
import { Activity } from "react";

type DataStreamChartProps = {
  chartType: "area" | "line";
  pageType: "smart" | "medical" | "industrial";
};

const someData = [
  { x: 1, y: 30 },
  { x: 2.2, y: 25 },
  { x: 3.4, y: 38 },
  { x: 4.6, y: 28 },
  { x: 5, y: 22 },
  { x: 6.5, y: 37 },
  { x: 7.7, y: 21 },
  { x: 8.9, y: 32 },
  { x: 9.1, y: 40 },
  { x: 10.4, y: 25 },
  { x: 11.6, y: 33 },
  { x: 12.2, y: 31 },
  { x: 13.3, y: 29 },
  { x: 14.5, y: 35 },
  { x: 15.7, y: 27 },
  { x: 16.8, y: 39 },
  { x: 17.9, y: 23 },
  { x: 18, y: 26 },
  { x: 19.2, y: 34 },
  { x: 20.4, y: 30 },
  { x: 21.5, y: 28 },
  { x: 22.7, y: 36 },
  { x: 23.9, y: 24 },
];

const someData2 = [
  { x: 1, y: 20 },
  { x: 2.2, y: 15 },
  { x: 3.4, y: 18 },
  { x: 4.6, y: 12 },
  { x: 5, y: 22 },
  { x: 6.5, y: 27 },
  { x: 7.7, y: 11 },
  { x: 8.9, y: 22 },
  { x: 9.1, y: 30 },
  { x: 10.4, y: 35 },
  { x: 11.6, y: 40 },
  { x: 12.2, y: 21 },
  { x: 13.3, y: 19 },
  { x: 14.5, y: 25 },
  { x: 15.7, y: 17 },
  { x: 16.8, y: 29 },
  { x: 17.9, y: 13 },
  { x: 18, y: 16 },
  { x: 19.2, y: 24 },
  { x: 20.4, y: 20 },
  { x: 21.5, y: 18 },
];

type ChartInfo = {
  curveType: "straight" | "smooth" | "stepline" | "linestep" | "monotoneCubic";
  strokeWidth: number;
  markerSize: number;
  color: string;
  color2?: string;
};

const lineChartInfo: ChartInfo = {
  curveType: "straight",
  strokeWidth: 5,
  markerSize: 2,
  color: "#165BAA",
};

const areaChartInfo: ChartInfo = {
  curveType: "smooth",
  strokeWidth: 1,
  markerSize: 0,
  color: "#0FFF00",
  color2: "#00C2FF",
};

type pageInfo = {
  leftTitle: string;
  rightTitle?: string;
  leftSubtitle: string;
  rightSubtitle?: string;
};

const DataStreamChart = ({ chartType, pageType }: DataStreamChartProps) => {
  const series: ApexAxisChartSeries = [
    {
      name: "Data Set 1 (High Range)",
      data: someData,
    },
    {
      name: "Data Set 2 (Low Range)",
      data: someData2,
    },
  ];

  const smartPageInfo: pageInfo = {
    leftTitle: chartType === "line" ? "POWER SENT TO GRID" : "PLANT STATUS",
    leftSubtitle: chartType === "line" ? "1.9 kW" : "PRODUCING",
    rightSubtitle: "5.2 kW",
  };

  const medicalPageInfo: pageInfo = {
    leftTitle: chartType === "line" ? "TUBE CURRENT" : "TUBE STATUS",
    leftSubtitle: chartType === "line" ? "29.4 kW" : "STANDBY",
    rightSubtitle: "88°C",
  };

  const industrialPageInfo: pageInfo = {
    leftTitle: chartType === "line" ? "ENERGY COSUMPTION" : "SUCTION PRESSURE",
    rightTitle: chartType === "line" ? "" : "DISCHARGE PRESSURE",
    leftSubtitle: chartType === "line" ? "351.2 kWH" : "2.5 bar",
    rightSubtitle: chartType === "line" ? "" : "10.1 bar",
  };

  const leftTitle =
    pageType === "smart"
      ? smartPageInfo.leftTitle
      : pageType === "medical"
        ? medicalPageInfo.leftTitle
        : industrialPageInfo.leftTitle;

  const leftSubtitle =
    pageType === "smart"
      ? smartPageInfo.leftSubtitle
      : pageType === "medical"
        ? medicalPageInfo.leftSubtitle
        : industrialPageInfo.leftSubtitle;

  const rightSubtitle =
    pageType === "smart"
      ? smartPageInfo.rightSubtitle
      : pageType === "medical"
        ? medicalPageInfo.rightSubtitle
        : industrialPageInfo.rightSubtitle;

  const baseChartOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve:
        chartType === "line"
          ? lineChartInfo.curveType
          : areaChartInfo.curveType,
      width:
        chartType === "line"
          ? lineChartInfo.strokeWidth
          : areaChartInfo.strokeWidth,
    },
    grid: {
      show: chartType === "line" ? true : false,
      borderColor: "gray",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    fill: {
      type: chartType === "line" ? "solid" : "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      tickAmount: 7,
      labels: {
        style: { colors: "#fff", fontSize: "12px" },
        datetimeFormatter: { hour: "HH:mm" },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 40,
    },
    tooltip: { theme: "dark", x: { format: "HH:mm:ss" } },
    legend: { show: false },
    dataLabels: { enabled: false },
    markers: {
      size:
        chartType === "line"
          ? lineChartInfo.markerSize
          : areaChartInfo.markerSize,
      colors: "#63ABFD",
      strokeColors: "#63ABFD",
    },
    colors:
      chartType === "line"
        ? [lineChartInfo.color]
        : [areaChartInfo.color, areaChartInfo.color2],
  };

  return (
    <Card className="production-graph-card rounded-5 border-secondary border-2">
      <Card.Body className="d-flex flex-column">
        <Card.Header className="d-flex justify-content-between align-items-center mb-1">
          <Card.Title className="fw-bold fs-5 mb-1 ms-1">
            <FormattedMessage
              id="dataStreamChart.leftTitle"
              defaultMessage={leftTitle}
            />
          </Card.Title>

          <Activity
            mode={
              pageType === "industrial" && chartType === "area"
                ? "visible"
                : "hidden"
            }
          >
            <Card.Title className="fw-bold fs-5 mb-1 ms-5">
              <FormattedMessage
                id="dataStreamChart.leftTitle"
                defaultMessage={industrialPageInfo.rightTitle}
              />
            </Card.Title>
          </Activity>
        </Card.Header>

        <div className="usage-section d-flex flex-column">
          <Row className="subtitle-container align-items-center justify-content-between">
            <Col xs="auto" className="d-flex align-items-center ms-3 gap-3">
              <Activity
                mode={
                  pageType === "industrial" && chartType === "area"
                    ? "visible"
                    : "hidden"
                }
              >
                <div className="dot dot-default" />
              </Activity>
              <span className="fw-semibold fs-1">
                <FormattedMessage
                  id="components.DataStreamChart.chartSubtitle"
                  defaultMessage={
                    pageType === "industrial"
                      ? industrialPageInfo.leftSubtitle
                      : leftSubtitle
                  }
                />
              </span>
            </Col>
            <Activity mode={chartType === "line" ? "hidden" : "visible"}>
              <Col xs="auto" className="d-flex align-items-center gap-3 me-3">
                <div
                  className={`dot ${pageType === "industrial" ? "dot-discharge-pressure" : "dot-default"}`}
                />
                <small className="right-subtitle fw-semibold fs-1">
                  <FormattedMessage
                    id="components.DataStreamChart.realTimeUsage"
                    defaultMessage="{usage}"
                    values={{ usage: rightSubtitle }}
                  />
                </small>
              </Col>
            </Activity>
          </Row>
          <ReactApexChart
            options={{ ...baseChartOptions }}
            series={
              pageType === "industrial" && chartType === "area"
                ? series
                : [{ name: "Data", data: someData }]
            }
            type={chartType}
            height={150}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataStreamChart;
