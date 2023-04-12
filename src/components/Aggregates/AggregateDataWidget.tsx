import React, {
  useEffect,
  useState,
  lazy,
  useReducer,
  useRef,
  useMemo,
} from "react";
import type { AggregateData, MetricsMap } from "../../types/data";
import type { PageInfoWidget } from "../../types/widgets";
import { useDocumentInfo } from "payload/components/utilities";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type Props = {
  options: PageInfoWidget;
  metricsMap: MetricsMap;
};

const AggregateDataWidget: React.FC<Props> = ({ options, metricsMap }) => {
  const [data, setData] = useState<AggregateData>([]);
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
      const getAggregateData = fetch(`/api/analytics/pageAggregate`, {
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

      getAggregateData.then((data: AggregateData) => {
        setData(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [publishedDoc, pageId]);

  const heading = useMemo(() => {
    if (label) return label;

    const metricValues: string[] = [];

    Object.entries(metricsMap).forEach(([key, value]) => {
      /* @ts-ignore */
      if (metrics.includes(key)) metricValues.push(value.label);
    });

    return metricValues.join(", ");
  }, [options, metricsMap]);

  return (
    <section
      style={{
        marginBottom: "1.5rem",
        border: "1px solid",
        borderColor: "var(--theme-elevation-100)",
        padding: "1rem",
      }}
    >
      {label !== "hidden" && (
        <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
          {heading} ({timeframeIndicator})
        </h1>
      )}
      <div>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <ul style={{ margin: "0", listStyle: "none", padding: "0" }}>
            {data.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontWeight: "700" }}>{item.label}</div>
                  <div>{item.value}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export const getAggregateDataWidget = (
  metricsMap: MetricsMap,
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
