import React from 'react';
import Stats from '../../components/admin/Stats';
import AppBar from '../../components/admin/AppBar';
import Users from '../../components/admin/Users';
import MultiTabs from '../../components/admin/MultiTabs';

const Dashboard = () => {
  return (
   <>
   <AppBar/>
   <Stats/>
   <MultiTabs/>
   </>
  );
}

export default Dashboard;
