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
  ChartData,
  ChartWidget,
  ChartWidgetMetrics,
} from "../../types";
import type { AxisOptions } from "react-charts";
import { useDocumentInfo } from "payload/components/utilities";
import { MetricMap } from "../../providers/plausible/client";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type Props = {
  options: ChartWidget;
};

const ChartComponent = lazy(() =>
  import("react-charts").then((module) => {
    return { default: module.Chart };
  })
);

const PageViewsChart: React.FC<Props> = ({ options }) => {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { publishedDoc } = useDocumentInfo();

  const { timeframe, metrics, idMatcher, label } = options;

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
          metrics: metrics,
          pageId: pageId,
        }),
      }).then((response) => response.json());

      getChartData.then((data: ChartData) => {
        setChartData(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [publishedDoc, pageId]);

  const chartLabel = useMemo(() => {
    if (label) return label;

    const metricValues: string[] = [];

    Object.entries(MetricMap).forEach(([key, value]) => {
      /* @ts-ignore */
      if (metrics.includes(key)) metricValues.push(value.label);
    });

    return metricValues.join(", ");
  }, [options]);

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
      {pageId !== "" && chartData?.length && chartData.length > 0 ? (
        <>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            {chartLabel} ({timeframeIndicator})
          </h1>
          <div style={{ minHeight: "200px", position: "relative" }}>
            <ChartComponent
              options={{
                data: chartData,
                dark: theme.theme === "dark",
                initialHeight: 220,
                tooltip: options.metrics.length > 1,
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
        <div>No data found for {chartLabel}.</div>
      )}
    </section>
  );
};

export const getPageViewsChart = (props?: any, options?: ChartWidget) => {
  const combinedProps: Props = {
    ...props,
    options,
  };
  return <PageViewsChart {...combinedProps} />;
};

export default { PageViewsChart, getPageViewsChart };
