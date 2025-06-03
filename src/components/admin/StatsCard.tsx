
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ title, value, change, icon: Icon, trend = 'neutral' }: StatsCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-sm ${getTrendColor()}`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <Icon className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
