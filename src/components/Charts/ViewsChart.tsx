import React, { useEffect, useState, lazy, useReducer, useRef } from "react";
import type {
  DashboardAnalyticsConfig,
  ChartDataPoint,
  ChartWidget,
} from "../../types";
import type { AxisOptions } from "react-charts";
import { MetricMap } from "../../providers/plausible/client";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type ChartData = {
  label: string;
  data: ChartDataPoint[];
};

type ChartOptions = {
  timeframe?: string;
  metric: ChartWidget["metric"];
};

type Props = {
  options: ChartOptions;
};

const ChartComponent = lazy(() =>
  import("react-charts").then((module) => {
    return { default: module.Chart };
  })
);

const ViewsChart: React.FC<Props> = ({ options }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const chartRef = useRef<any>(null);
  const theme = useTheme();

  const { timeframe, metric } = options;

  const timeframeIndicator =
    timeframe === "month"
      ? new Date().toLocaleString("default", { month: "long" })
      : timeframe ?? "30d";

  useEffect(() => {
    const getChartData = fetch(`/api/analytics/globalChartData`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeframe: timeframe, metric: metric }),
    }).then((response) => response.json());

    getChartData.then((data: ChartDataPoint[]) => {
      const processedData: ChartData[] = [
        {
          label: "Visitors",
          data: data,
        },
      ];
      setChartData(processedData);
    });

    const importChart = async () => {
      const { Chart } = await import("react-charts");
      chartRef.current = Chart;
    };

    importChart();
  }, []);

  const primaryAxis = React.useMemo<AxisOptions<ChartDataPoint>>(() => {
    return {
      getValue: (datum) => datum.timestamp,
      show: false,
      elementType: "line",
      showDatumElements: false,
    };
  }, []);

  const secondaryAxes = React.useMemo<AxisOptions<ChartDataPoint>[]>(
    () => [
      {
        getValue: (datum) => {
          return datum.value;
        },
        elementType: "line",
      },
    ],
    []
  );

  return (
    <section
      style={{
        marginBottom: "1.5rem",
      }}
    >
      {chartRef?.current && chartData?.length && chartData.length > 0 ? (
        <>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            {MetricMap[metric].label} ({timeframeIndicator})
          </h1>
          <div style={{ minHeight: "200px", position: "relative" }}>
            <ChartComponent
              options={{
                data: chartData,
                dark: theme.theme === "dark",
                initialHeight: 220,
                tooltip: false,
                /* @ts-ignore */
                primaryAxis,
                /* @ts-ignore */
                secondaryAxes,
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export const getViewsChart = (props?: any, options?: ChartOptions) => {
  const combinedProps: Props = {
    ...props,
    options,
  };
  return <ViewsChart {...combinedProps} />;
};

export default { ViewsChart, getViewsChart };
