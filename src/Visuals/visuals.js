import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './visuals.scss';

function Visuals() {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        budget: [],
        expense: [],
        backgroundColor: [],
      },
    ],
    labels1: [],
    labels2: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [months, setMonths] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (selectedMonth) {
        try {
          const res = await axios.get(`https://personalbudget-backend.onrender.com/get-budgets/${userId}?month=${selectedMonth}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data && res.data.length > 0) {
            const updateData = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateData.datasets[0].budget[i] = res.data[i].budget;
              updateData.labels1[i] = res.data[i].category;
            }
            setDataSource(updateData);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        } catch (error) {
          console.error('Error fetching budget data:', error);
        }
      }
    };

    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (selectedMonth) {
        try {
          const res = await axios.get(`https://personalbudget-backend.onrender.com/get-expenses/${userId}?month=${selectedMonth}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.data && res.data.length > 0) {
            const updateExpenses = { ...dataSource };
            for (var i = 0; i < res.data.length; i++) {
              updateExpenses.datasets[0].expense[i] = res.data[i].expense;
              updateExpenses.labels2[i] = res.data[i].category;
            }
            setDataSource(updateExpenses);
            setDataExists(true);
            setDataLoaded(true);
          } else {
            setDataExists(false);
            setDataLoaded(true);
          }
        } catch (error) {
          console.error('Error fetching expense data:', error);
        }
      }
    };

    fetchExpenses();
  }, [selectedMonth]);

  const createGroupedBarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expense',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createRadarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              type: 'bar',
              data: budget,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              type: 'line',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);

  useEffect(() => createGroupedBarChart(chart1Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createRadarChart(chart2Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);
  useEffect(() => createChart(chart3Ref, dataSource.labels1, dataSource.datasets[0].budget, dataSource.datasets[0].expense), [dataSource]);

  const renderCharts = () => {
    return (
      <section>
        <section className="chart-container">
          <article className="chart">
            <h2>Bar Chart</h2>
            <canvas ref={chart1Ref} />
          </article>
          <article className="chart">
            <h2>Radar Chart</h2>
            <canvas ref={chart2Ref} />
          </article>
        </section>
        <section className="chart-container">
          <article className="chart">
            <h2>Combo Chart</h2>
            <canvas ref={chart3Ref} />
          </article>
        </section>
      </section>
    );
  };

  return (
    <main className="visuals-container">
      <div className="controls">
        <label htmlFor="months">Select Month:</label>
        <select id="months" onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      {dataLoaded ? (
        dataExists ? renderCharts() : <p>There is no sufficient data, please create some to display the charts.</p>
      ) : <p>Loading...</p>}
    </main>
  );
}

export default Visuals;
