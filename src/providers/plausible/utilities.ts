import { AllAvailableMetrics } from "../../types/widgets";

export const MetricMap: Record<
  AllAvailableMetrics,
  { label: string; value: string }
> = {
  views: {
    label: "Views",
    value: "pageviews",
  },
  visitors: { label: "Visitors", value: "visitors" },
  bounceRate: { label: "Bounce rate", value: "bounce_rate" },
  sessionDuration: { label: "Avg. duration", value: "visit_duration" },
  sessions: { label: "Sessions", value: "visits" },
};
