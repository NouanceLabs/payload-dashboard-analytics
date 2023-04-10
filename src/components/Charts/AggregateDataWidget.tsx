import React, {
  useEffect,
  useState,
  lazy,
  useReducer,
  useRef,
  useMemo,
} from "react";
import type { ChartDataPoint, ChartData } from "../../types/data";
import type { PageInfoWidget } from "../../types/widgets";
import type { AxisOptions } from "react-charts";
import { useDocumentInfo } from "payload/components/utilities";
import { MetricMap } from "../../providers/plausible/utilities";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type Props = {
  options: PageInfoWidget;
};

const AggregateDataWidget: React.FC<Props> = ({ options }) => {
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
    timeframe === "currentMonth"
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

  return (
    <section
      style={{
        marginBottom: "1.5rem",
      }}
    >
      aggr data
    </section>
  );
};

export const getAggregateDataWidget = (
  props?: any,
  options?: PageInfoWidget
) => {
  const combinedProps: Props = {
    ...props,
    options,
  };
  return <AggregateDataWidget {...combinedProps} />;
};

export default { AggregateDataWidget, getAggregateDataWidget };
