import {
  CloudWatchClient,
  PutMetricDataCommand,
  StandardUnit,
  Dimension,
} from "@aws-sdk/client-cloudwatch";

const cw = new CloudWatchClient({});
const NS = process.env.METRIC_NAMESPACE || "CarrierSales/Metrics";

type MetricItem = {
  name: string;
  value: number;
  unit?: StandardUnit;
  dimensions?: Record<string, string>;
  timestamp?: string;
};

export const lambdaHandler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    if (!body) return { statusCode: 400, body: "Invalid body" };

    const metricsWrapper = JSON.parse(body.metricsObject)
    const metrics: MetricItem[] = metricsWrapper.metrics;

    if (!metrics.length) return { statusCode: 400, body: "No metrics found in body" };

    for (let i = 0; i < metrics.length; i += 20) {
      const chunk = metrics.slice(i, i + 20);
      const MetricData = chunk.map(m => ({
        MetricName: m.name,
        Value: Number(m.value),
        Unit: m.unit,
        Timestamp: new Date(),
        Dimensions: Object.entries(m.dimensions || {}).map(
          ([Name, Value]) => ({ Name, Value } as Dimension)
        ),
        StorageResolution: 1,
      }));
      await cw.send(new PutMetricDataCommand({ Namespace: NS, MetricData }));
    }

    return { statusCode: 204 };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "server error" };
  }
};
