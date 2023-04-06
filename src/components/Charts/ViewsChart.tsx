import React, { useEffect, useState } from "react";
import type { DashboardAnalyticsConfig } from "../../types";
import { AxisOptions, Chart } from "react-charts";

type Props = {};

type ChartDataType = {
  date: string;
  pageviews: number;
  visitors: number;
};

export const ViewsChart: React.FC<Props> = (props) => {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  /* useEffect(() => {
    const getChartData = fetch(`/api/analytics/globalChartData`).then(
      (response) => response.json()
    );

    getChartData.then((data) => {
      console.log("fetched data from backend:", data);
      setChartData(data);
    });
  }, []); */

  /* const primaryAxis = React.useMemo<AxisOptions<ChartDataType>>(
    () => ({
      getValue: (datum) => datum.date as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<ChartDataType>[]>(
    () => [
      {
        getValue: (datum) => datum.visitors,
      },
    ],
    []
  ); */

  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      my chart goes here:
      {/* <Chart
        options={{
          chartData,
          primaryAxis,
          secondaryAxes,
        }}
      /> */}
    </div>
  );
};

export const getViewsChart = (props: any) => <ViewsChart {...props} />;
