import React, {
  useEffect,
  useState,
  lazy,
  useReducer,
  useRef,
  useMemo,
} from "react";
import type {
  DashboardAnalyticsConfig,
  ChartDataPoint,
  ChartWidget,
  IdMatcherFunction,
} from "../../types";
import type { AxisOptions } from "react-charts";
import { useDocumentInfo } from "payload/components/utilities";
import { MetricMap } from "../../providers/plausible/client";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type ChartData = {
  label: string;
  data: ChartDataPoint[];
};

type ChartOptions = {
  timeframe?: string;
  metric: ChartWidget["metric"];
  idMatcher: IdMatcherFunction;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const chartRef = useRef<any>(null);
  const theme = useTheme();
  const { publishedDoc } = useDocumentInfo();

  const { timeframe, metric, idMatcher } = options;

  const pageId = useMemo(() => {
    if (publishedDoc) return idMatcher(publishedDoc);
    else return "";
  }, [publishedDoc]);

  const timeframeIndicator =
    timeframe === "month"
      ? new Date().toLocaleString("default", { month: "long" })
      : timeframe ?? "30d";

  useEffect(() => {
    if (pageId) {
      const getChartData = fetch(`/api/analytics/pageChartData`, {
        method: "post",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeframe: timeframe,
          metric: metric,
          pageId: pageId,
        }),
      }).then((response) => response.json());

      getChartData.then((data: ChartDataPoint[]) => {
        const processedData: ChartData[] = [
          {
            label: MetricMap[metric].label,
            data: data,
          },
        ];
        setChartData(processedData);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [publishedDoc, pageId]);

  useEffect(() => {
    const importChart = async () => {
      /* Dynamic import for react-charts due to ESM and how bundling is done with Payload */
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
      {pageId !== "" &&
      chartRef?.current &&
      chartData?.length &&
      chartData.length > 0 ? (
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
      ) : isLoading ? (
        <> Loading...</>
      ) : (
        <div>No {MetricMap[metric].label} data found.</div>
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
