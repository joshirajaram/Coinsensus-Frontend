import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import GroupItem from '../components/GroupItem';
import { TrendingUp, Users, CreditCard } from 'lucide-react';


interface BalanceResponse {
  balances: {
    [key: string]: number;
  }
}

// Remove the parenthesis after FC
const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  const fetchBalances = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) return;

      const response = await fetch(
        `http://localhost:8080/api/transactions/getBalances?username=${username}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch balances');
      }

      const data: BalanceResponse = await response.json();
      
      const total = Object.values(data.balances).reduce(
        (sum, amount) => sum + amount,
        0
      );
      
      setTotalBalance(total);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchBalances();
  }, []);

  // Listen for expense added event
  useEffect(() => {
    const handleExpenseAdded = () => {
      fetchBalances();
    };

    // Add event listener
    window.addEventListener('expenseAdded', handleExpenseAdded);
    window.addEventListener('settlementConfirm', handleExpenseAdded);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('expenseAdded', handleExpenseAdded);
      window.removeEventListener('settlementConfirm', handleExpenseAdded);
    };
  }, []);
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
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
          )}</>
        )}
      </div>

        {/* Groups Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Active Groups</h3>
          <div className="space-y-4">
            <GroupItem name="Roommates" members={4} balance={320.50} />
            <GroupItem name="Trip to Vegas" members={6} balance={-45.20} />
            <GroupItem name="Family" members={3} balance={0} />
          </div>
      </div>
    </>
  );
}; // Removed extra parenthesis

export default HomePage;