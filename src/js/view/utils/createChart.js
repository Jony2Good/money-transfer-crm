import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function createChart(
  canvas,
  monthsList,
  dataList,
  stack = false,
  stackData = { incoming: null, outing: null }
) {
  let min = +Infinity;
  let max = -Infinity;
  dataList.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  });

  min = Math.floor(min);
  max = Math.floor(max);

  if (min === max) min = 0;

  let average;
  let stepSize;

  if (stack) {
    let maxIncoming = -Infinity;
    let maxOuting = -Infinity;
    stackData.incoming.forEach(
      (num) => (maxIncoming = Math.max(maxIncoming, num))
    );
    stackData.outing.forEach((num) => (maxOuting = Math.max(maxOuting, num)));

    average = Math.min(maxIncoming, maxOuting);
  }

  const chartAreaBorder = {
    id: "chartAreaBorder",
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  Chart.defaults.font.size = 20;
  Chart.defaults.font.family = "'Work Sans', sans-serif";
  Chart.defaults.font.weight = "500";
  Chart.defaults.color = "#000000";

  const data = [
    {
      label: "",
      data: dataList,
      backgroundColor: "rgb(17, 106, 204)",
      hoverBackgroundColor: "rgb(17, 106, 204)",
      barThickness: 50,
    },
  ];

  const dataStack = [
    {
      label: "",
      data: stackData.outing,
      backgroundColor: "rgba(253, 78, 93, 1)",
      hoverBackgroundColor: "rgba(253, 78, 93, 1)",
      barThickness: 50,
    },
    {
      label: "",
      data: stackData.incoming,
      backgroundColor: "rgba(118, 202, 102, 1)",
      hoverBackgroundColor: "rgba(118, 202, 102, 1)",
      barThickness: 50,
    },
  ];

  new Chart(canvas, {
    type: "bar",

    data: {
      labels: monthsList,
      datasets: stack ? dataStack : data,
    },
    plugins: [chartAreaBorder],
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: 0,
      },
      plugins: {
        tooltip: { enabled: false },
        legend: {
          display: false,
        },
        chartAreaBorder: {
          borderColor: "#000000",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          stacked: stack,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: stack,
          position: "right",
          grid: {
            display: false,
          },
          beginAtZero: false,
          min: min,
          max: max,
          ticks: {
            callback: function (val) {
              if (val === max || val === min) return this.getLabelForValue(val);

              if (!stepSize) stepSize = val;
              const halfStepSize = stepSize / 2;

              if (
                stack &&
                val - halfStepSize <= average &&
                val + halfStepSize > average
              )
                return Math.floor(average);

              return "";
            },
            padding: 10,
          },
        },
      },
    },
  });
}
