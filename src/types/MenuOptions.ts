export interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    isExpanded: boolean;
  }
  
export interface StatCardProps {
    icon?: React.ReactNode;
    title: string;
    amount: string;
    trend: 'up' | 'down';
    trendValue: string;
  }
  
export interface ActivityItemProps {
    title: string;
    amount: number;
    group: string;
    time: string;
    users: number;
  }
  
  export interface GroupItemProps {
    name: string;
    members: number;
    balance: number;
  }