import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import MapPage from '../pages/MapPage';
import NewPointPage from '../pages/NewPointPage';
import MissionsListPage from '../pages/MissionsListPage';
import MissionDetailPage from '../pages/MissionDetailPage';
import RankingPage from '../pages/RankingPage';
import ProfilePage from '../pages/ProfilePage';
import CooperativesListPage from '../pages/CooperativesListPage';
import SchedulePage from '../pages/SchedulePage';
import MyCollectionsPage from '../pages/MyCollectionsPage';
import StatisticsPage from '../pages/StatisticsPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>}/>
        <Route path="/map/new" element={<ProtectedRoute><NewPointPage /></ProtectedRoute>} />
        <Route path="/missions" element={<ProtectedRoute><MissionsListPage /></ProtectedRoute>} />
        <Route path="/missions/:id" element={<ProtectedRoute><MissionDetailPage /></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><RankingPage /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
        <Route path="/cooperatives" element={<ProtectedRoute><CooperativesListPage /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
        <Route path="/collections" element={<ProtectedRoute><MyCollectionsPage /></ProtectedRoute>} />
        <Route path="/stats" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
