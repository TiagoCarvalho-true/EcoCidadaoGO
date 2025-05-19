import React from 'react';
import './DashboardPage.css';
import ErrorBoundary from '../components/common/ErrorBoundary';

import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

import ScoreSummary from '../components/dashboard/ScoreSummary';
import NotificationsList from '../components/dashboard/NotificationsList';
import InteractiveMap from '../components/map/InteractiveMap';

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="main-content">
     {<Header/> }

        <div className="dashboard-grid">
          <div className="left-panel">
            <ScoreSummary />
          </div>

          <div className="right-panel">
         <ErrorBoundary>
  <NotificationsList />
</ErrorBoundary>
          </div>

          <div className="map-panel">
            <h2 className="map-title">Mapa Legal</h2>
            <InteractiveMap />
          </div>
        </div>
      </div>
    </div>
  );
}
