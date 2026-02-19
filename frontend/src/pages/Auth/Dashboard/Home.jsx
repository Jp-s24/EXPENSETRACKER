import React from 'react'
import DashboardLayout from "../../../components/layouts/DashboardLayout.jsx";
import { useUserAuth } from '../../../hooks/useUserAuth.jsx';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance.js";
import { API_PATHS } from "../../../utils/apiPaths.js";
import { useEffect } from "react";
import InfoCard from '../../../components/Cards/InfoCard.jsx';

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from '../../../utils/helper.js';


const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get (
        `${API_PATHS.DASHBOARD.GET_DATA}`
      ); 

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  
    return () => {
      
    }
  }, []);
  

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};  

export default Home