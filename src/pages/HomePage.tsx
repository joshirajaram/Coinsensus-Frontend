import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import GroupItem from '../components/GroupItem';
import { TrendingUp, Users, CreditCard, ShieldCheck, TimerReset, Wallet } from 'lucide-react';
import ActivityPage from './ActivityPage';
import {useNavigate} from 'react-router-dom';


// ✅ Add this interface for props
interface HomePageProps {
  openAddExpenseModal: () => void;
}

interface BalanceResponse {
  balances: {
    [key: string]: number;
  }
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchBalances = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) return;

      const response = await fetch(
        `http://localhost:8080/api/transactions/getBalances?username=${username}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) throw new Error('Failed to fetch balances');

      const data: BalanceResponse = await response.json();
      const total = Object.values(data.balances).reduce((sum, amt) => sum + amt, 0);
      setTotalBalance(total);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  useEffect(() => {
    const handleExpenseAdded = () => fetchBalances();
    window.addEventListener('expenseAdded', handleExpenseAdded);
    window.addEventListener('settlementConfirm', handleExpenseAdded);
    return () => {
      window.removeEventListener('expenseAdded', handleExpenseAdded);
      window.removeEventListener('settlementConfirm', handleExpenseAdded);
    };
  }, []);

  const handleGetStartedClick = () => {
      navigate('/add-expense');
  }

  return (
    <div className="p-6 md:p-10">

      {/* 🔥 Hero Section */}
      <div className="text-center my-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Coinsensus</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Simplifying Group Expenses with Decentralized Trust 🧾🔗
        </p>
        <button onClick={handleGetStartedClick} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition">
          Get Started
        </button>
      </div>

      {/* ✨ Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-16">
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <ShieldCheck size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Secure & Private</h3>
          <p className="text-sm text-gray-600">Blockchain-powered backend ensures immutable records and tamper-proof trust.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <Wallet size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Automated Balances</h3>
          <p className="text-sm text-gray-600">Real-time balance updates across group expenses without manual calculations.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <TimerReset size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Always Synced</h3>
          <p className="text-sm text-gray-600">No refresh needed. Every action reflects instantly across your groups.</p>
        </div>
      </div>

      {/* 📊 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {!isLoading && (
          <>
            {totalBalance > 0 ? (
              <StatCard 
                icon={<TrendingUp size={20} />}
                title="You are owed" 
                amount={`$${Math.abs(totalBalance).toFixed(2)}`}
                trend="up"
                trendValue="12.5%"
              />
            ) : totalBalance < 0 ? (
              <StatCard 
                icon={<CreditCard size={20} />}
                title="You owe" 
                amount={`$${Math.abs(totalBalance).toFixed(2)}`}
                trend="down"
                trendValue="5.2%"
              />
            ) : (
              <StatCard 
                icon={<TrendingUp size={20} />}
                title="Balance" 
                amount="You're all settled up!"
                trend="neutral"
                trendValue="0%"
              />
            )}
          </>
        )}
      </div>

      {/* 🧾 Activity Feed */}
      <ActivityPage />
    </div>
  );
};

export default HomePage;
