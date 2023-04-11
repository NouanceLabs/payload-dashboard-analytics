import React, {
  useEffect,
  useState,
  lazy,
  useReducer,
  useRef,
  useMemo,
} from "react";
import type { LiveData } from "../../types/data";
import type { LiveWidget } from "../../types/widgets";
import { MetricMap } from "../../providers/plausible/utilities";
import { useTheme } from "payload/dist/admin/components/utilities/Theme";

type Props = {};

const LiveDataWidget: React.FC<Props> = ({}) => {
  const [data, setData] = useState<LiveData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();

  /* const { label } = options; */

  useEffect(() => {
    const getLiveData = fetch(`/api/analytics/liveData`, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((response) => response.json());

    getLiveData.then((data: LiveData) => {
      setData(data);
      setIsLoading(false);
    });
  }, []);

  const heading = useMemo(() => {
    /* if (label) return label; */

    return "hidden";
  }, []);

  return (
    <section
      style={{
        marginBottom: "1.5rem",
        border: "1px solid",
        borderColor: "var(--theme-elevation-100)",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      {heading !== "hidden" && (
        <h1 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
          {heading}
        </h1>
      )}
      <div>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <ul style={{ margin: "0", listStyle: "none", padding: "0" }}>
            <li style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: "700" }}>Live visitors</div>
              <div>{data?.visitors}</div>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export const getLiveDataWidget = (props?: any, options?: LiveWidget) => {
  const combinedProps: Props = {
    ...props,
    options,
  };
  return <LiveDataWidget {...combinedProps} />;
};

export default { LiveDataWidget, getLiveDataWidget };
