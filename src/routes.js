import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'bar-chart',
        element: <BarChart />,
      },
      {
        path: 'pie-chart',
        element: <PieChart />,
      },
      {
        path: 'line-chart',
        element: <LineChart />,
      },
    ],
  },
]);