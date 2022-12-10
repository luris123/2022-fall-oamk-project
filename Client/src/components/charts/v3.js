import React, { useState, useEffect, useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import Button from "react-bootstrap/Button";
import '../../css/App.css'
import Card from 'react-bootstrap/Card';
import { DatasetsContext } from '../../App.js';

Chart.register(...registerables);

function V3(props) {

  const datasets = useContext(DatasetsContext);

  const [annual, setAnnual] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [de08, setDe08] = useState([]);
  const [de082, setDe082] = useState([]);
  const [dss, setDss] = useState([]);
  const [v10, setV10] = useState([]);
  const [visible, setVisible] = useState(false);
  const [v4Toggle, setV4Toggle] = useState(true);
  const [v10Toggle, setV10Toggle] = useState(true);


  useEffect(() => {
    if (datasets.length !== 0) {
      let annual = datasets.v3data[0].annual;
      setAnnual(annual);

      //change values inside annual to strings
      for (let i = 0; i < annual.length; i++) {
        if (annual[i].year !== null) {
          annual[i].year = annual[i].year.toString();
          annual[i].mean = annual[i].mean.toString();
        }
      }

      let monthly = datasets.v3data[0].monthly;
      setMonthly(monthly);

      for (let i = 0; i < monthly.length; i++) {
        monthly[i].year = monthly[i].year.toString();
        monthly[i].average = monthly[i].average.toString();
        if (monthly[i].year.length < 7) {
          monthly[i].year = monthly[i].year.slice(0, 5) + "0" + monthly[i].year.slice(5);

        }
      }

      let de08 = datasets.v4data[0].de08;
      setDe08(de08.reverse());

      for (let i = 0; i < de08.length; i++) {
        de08[i].year = de08[i].year.toString();
        de08[i].c02MixingRatio = de08[i].c02MixingRatio.toString();
      }

      let de082 = datasets.v4data[0].de082;
      setDe082(de082.reverse());

      for (let i = 0; i < de082.length; i++) {
        de082[i].year = de082[i].year.toString();
        de082[i].c02MixingRatio = de082[i].c02MixingRatio.toString();
      }

      let dss = datasets.v4data[0].dss;
      setDss(dss.reverse());

      for (let i = 0; i < dss.length; i++) {
        dss[i].year = dss[i].year.toString();
        dss[i].c02MixingRatio = dss[i].c02MixingRatio.toString();
      }

      let v10 = datasets.v10data;
      setV10(v10);

      for (let i = 0; i < v10.length; i++) {
        v10[i].year = v10[i].year.toString();
        v10[i].description = v10[i].description.toString();
      }

      setV10(v10.slice(344));
    }

  }, [datasets]);

  const options = {
    // events: [] makes the chart unresponsive to mouse events
    events: ["mousemove"],
    elements: {
      point: {
        radius: 1.5
      }
    },
    scales: {
      Y: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Mean data",
        },
      },
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        title: {
          display: true,
          text: "Time (monthly)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            var title = context[0].dataset.title;
            if (context[0].dataset.type === "bubble") {
              title = "Year: " + context[0].raw.x;
            }
            else {
              title = "Year: " + context[0].label;
            }
            return title;
          },
          label: function (context) {
            var label = context.dataset.label;
            if (context.dataset.type === "bubble") {
              label = context.raw.description;
            }
            else {
              label = label + ": " + context.formattedValue;
            }
            return label;
          }
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mauna Loa CO2 concentration measurements",
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Annual mean",
        spanGaps: true,
        data: annual,
        hidden: visible,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "mean",
        },
      },
      {
        label: "Monthly mean average",
        spanGaps: true,
        data: monthly,
        hidden: !visible,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "average",
        },
      },
      {
        label: "DE08",
        spanGaps: true,
        data: de08,
        hidden: v4Toggle,
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "c02MixingRatio",
        },
      },
      {
        label: "DE082",
        spanGaps: true,
        data: de082,
        hidden: v4Toggle,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "c02MixingRatio",
        },
      },
      {
        label: "DSS",
        spanGaps: true,
        data: dss,
        hidden: v4Toggle,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "c02MixingRatio",
        },
      },
      {
        type: "bubble",
        label: "Major historical events",

        data: v10.map((x) => {
          return {
            x: x.year,
            y: 250,
            r: 5,
            description: x.description,
          };
        }),
        hidden: v10Toggle,
        //color hot pink
        borderColor: "rgb(255, 105, 180)",
        backgroundColor: "rgba(255, 105, 180, 0.5)",
      }
    ],
  };

  return (
    <>
        <Card>
          <Card.Body className='text-center'>
            <Card.Title>V3 Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958</Card.Title>
            <div className="d-grid gap-2">
            <Button id="view-button" onClick={() => setVisible(!visible)}>Change view</Button>
            <Button id="view-button" onClick={() => setV4Toggle(!v4Toggle)}>Toggle V4</Button>
            <Button id="view-button" onClick={() => setV10Toggle(!v10Toggle)}>Toggle V10</Button>
            </div>
            {props.description
              ? <p>{props.description}</p>
              : null
            }
             <Line
              className='chart'
              options={options}
              data={data}
            />
           <Card.Link href="https://gml.noaa.gov/ccgg/about/co2_measurements.html">Data measurement description</Card.Link>
            <Card.Link href="https://gml.noaa.gov/ccgg/trends/">Data source</Card.Link>
          </Card.Body>
        </Card>
    </>
  )
}

export default V3;
