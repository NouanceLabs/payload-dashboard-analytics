import React, {
  useEffect,
  useState,
  lazy,
  useReducer,
  useRef,
  useMemo,
} from "react";
import type { ChartDataPoint, ChartData, MetricsMap } from "../../types/data";
import type { PageChartWidget } from "../../types/widgets";
import type { AxisOptions } from "react-charts";
import { useDocumentInfo } from "payload/components/utilities";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type Props = {
  options: PageChartWidget;
  metricsMap: MetricsMap;
};

const ChartComponent = lazy(() =>
  import("react-charts").then((module) => {
    return { default: module.Chart };
  })
);

const PageViewsChart: React.FC<Props> = ({ options, metricsMap }) => {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { publishedDoc } = useDocumentInfo();

  const { timeframe, metrics, idMatcher, label } = options;

  const pageId = useMemo(() => {
    if (publishedDoc) return idMatcher(publishedDoc);
    else return "";
  }, [publishedDoc]);

  const timeframeIndicator = useMemo(() => {
    return timeframe === "currentMonth"
      ? new Date().toLocaleString("default", { month: "long" })
      : timeframe ?? "30d";
  }, [timeframe]);

  useEffect(() => {
    if (pageId) {
      const getChartData = fetch(`/api/analytics/pageChart`, {
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
    if (!!label) return label;

    if (metrics) {
      const metricValues: string[] = [];

      Object.entries(metricsMap).forEach(([key, value]) => {
        // @ts-ignore
        if (metrics.includes(key)) metricValues.push(value.label);
      });

      return metricValues.join(", ");
    } else {
      return "No metrics defined for this widget";
    }
  }, [label, metrics, metricsMap]);

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

export const getPageViewsChart = (
  metricsMap: MetricsMap,
  props?: any,
  options?: PageChartWidget
) => {
  const combinedProps: Props = {
    ...props,
    options,
  };
  return <PageViewsChart {...combinedProps} />;
};

export default { PageViewsChart, getPageViewsChart };
