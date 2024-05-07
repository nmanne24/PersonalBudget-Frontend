import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.scss'; 

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="content">
        <h2>Welcome to the Dashboard!</h2>
        <div className="actions">
          <Link to="/configure-budgets" className="button-link">
            <button>Configure Budgets</button>
          </Link>
          <Link to="/add-expense" className="button-link">
            <button>Manage Expenses</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
