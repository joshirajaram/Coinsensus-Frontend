import { ReactNode } from 'react';

export interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  isExpanded: boolean;
}

export interface StatCardProps {
  icon: ReactNode;
  title: string;
  amount: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

export interface ActivityItemProps {
  title: string;
  amount: number;
  group: string;
  time: string;
  description: string;
  users: string; // Ensure this matches the expected data type
}
export interface GroupItemProps {
  name: string;
  members: number;
  balance: number;
}