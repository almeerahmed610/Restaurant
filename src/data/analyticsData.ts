import { BranchId } from '../types';

export interface HourlyOrderData {
  time: string;
  pechsOrders: number;
  gulshanOrders: number;
  totalOrders: number;
  pechsRevenue: number;
  gulshanRevenue: number;
  totalRevenue: number;
}

export interface DailyOrderData {
  date: string;
  day: string;
  pechsOrders: number;
  gulshanOrders: number;
  totalOrders: number;
  pechsRevenue: number;
  gulshanRevenue: number;
  totalRevenue: number;
}

export interface CategoryPerformance {
  category: string;
  pechsOrders: number;
  gulshanOrders: number;
  pechsRevenue: number;
  gulshanRevenue: number;
  totalOrders: number;
  totalRevenue: number;
  color: string;
}

export interface ChannelPerformance {
  channel: string;
  pechsCount: number;
  gulshanCount: number;
  totalCount: number;
  color: string;
}

// 24-hour round-the-clock distribution reflecting Karachi's 24/7 dining culture
// Peak times: Midnight BBQ (11 PM - 3 AM), Lunch (1 PM - 3 PM), Dinner (8 PM - 10:30 PM), Breakfast (7 AM - 10 AM)
export const HOURLY_ANALYTICS: HourlyOrderData[] = [
  { time: '12 AM', pechsOrders: 28, gulshanOrders: 36, totalOrders: 64, pechsRevenue: 53200, gulshanRevenue: 72400, totalRevenue: 125600 },
  { time: '01 AM', pechsOrders: 24, gulshanOrders: 32, totalOrders: 56, pechsRevenue: 46800, gulshanRevenue: 64800, totalRevenue: 111600 },
  { time: '02 AM', pechsOrders: 18, gulshanOrders: 26, totalOrders: 44, pechsRevenue: 34200, gulshanRevenue: 51200, totalRevenue: 85400 },
  { time: '03 AM', pechsOrders: 12, gulshanOrders: 15, totalOrders: 27, pechsRevenue: 21600, gulshanRevenue: 28500, totalRevenue: 50100 },
  { time: '04 AM', pechsOrders: 8, gulshanOrders: 10, totalOrders: 18, pechsRevenue: 13600, gulshanRevenue: 17800, totalRevenue: 31400 },
  { time: '05 AM', pechsOrders: 6, gulshanOrders: 8, totalOrders: 14, pechsRevenue: 9800, gulshanRevenue: 13200, totalRevenue: 23000 },
  { time: '06 AM', pechsOrders: 9, gulshanOrders: 12, totalOrders: 21, pechsRevenue: 12400, gulshanRevenue: 16900, totalRevenue: 29300 },
  { time: '07 AM', pechsOrders: 22, gulshanOrders: 28, totalOrders: 50, pechsRevenue: 21500, gulshanRevenue: 29400, totalRevenue: 50900 },
  { time: '08 AM', pechsOrders: 34, gulshanOrders: 42, totalOrders: 76, pechsRevenue: 35600, gulshanRevenue: 44800, totalRevenue: 80400 },
  { time: '09 AM', pechsOrders: 38, gulshanOrders: 48, totalOrders: 86, pechsRevenue: 41200, gulshanRevenue: 53200, totalRevenue: 94400 },
  { time: '10 AM', pechsOrders: 26, gulshanOrders: 32, totalOrders: 58, pechsRevenue: 29400, gulshanRevenue: 37600, totalRevenue: 67000 },
  { time: '11 AM', pechsOrders: 20, gulshanOrders: 25, totalOrders: 45, pechsRevenue: 26800, gulshanRevenue: 34500, totalRevenue: 61300 },
  { time: '12 PM', pechsOrders: 32, gulshanOrders: 38, totalOrders: 70, pechsRevenue: 51200, gulshanRevenue: 61500, totalRevenue: 112700 },
  { time: '01 PM', pechsOrders: 46, gulshanOrders: 52, totalOrders: 98, pechsRevenue: 82400, gulshanRevenue: 94800, totalRevenue: 177200 },
  { time: '02 PM', pechsOrders: 50, gulshanOrders: 58, totalOrders: 108, pechsRevenue: 91500, gulshanRevenue: 106200, totalRevenue: 197700 },
  { time: '03 PM', pechsOrders: 35, gulshanOrders: 40, totalOrders: 75, pechsRevenue: 58400, gulshanRevenue: 69800, totalRevenue: 128200 },
  { time: '04 PM', pechsOrders: 22, gulshanOrders: 28, totalOrders: 50, pechsRevenue: 32500, gulshanRevenue: 41200, totalRevenue: 73700 },
  { time: '05 PM', pechsOrders: 25, gulshanOrders: 34, totalOrders: 59, pechsRevenue: 38900, gulshanRevenue: 51200, totalRevenue: 90100 },
  { time: '06 PM', pechsOrders: 32, gulshanOrders: 42, totalOrders: 74, pechsRevenue: 54600, gulshanRevenue: 72500, totalRevenue: 127100 },
  { time: '07 PM', pechsOrders: 45, gulshanOrders: 56, totalOrders: 101, pechsRevenue: 86400, gulshanRevenue: 108400, totalRevenue: 194800 },
  { time: '08 PM', pechsOrders: 62, gulshanOrders: 78, totalOrders: 140, pechsRevenue: 132400, gulshanRevenue: 168500, totalRevenue: 300900 },
  { time: '09 PM', pechsOrders: 74, gulshanOrders: 92, totalOrders: 166, pechsRevenue: 164200, gulshanRevenue: 204500, totalRevenue: 368700 },
  { time: '10 PM', pechsOrders: 68, gulshanOrders: 86, totalOrders: 154, pechsRevenue: 148500, gulshanRevenue: 188200, totalRevenue: 336700 },
  { time: '11 PM', pechsOrders: 52, gulshanOrders: 68, totalOrders: 120, pechsRevenue: 112000, gulshanRevenue: 147500, totalRevenue: 259500 }
];

// Last 7 Days comparison
export const SEVEN_DAYS_ANALYTICS: DailyOrderData[] = [
  { date: '2026-10-26', day: 'Mon', pechsOrders: 490, gulshanOrders: 620, totalOrders: 1110, pechsRevenue: 890000, gulshanRevenue: 1180000, totalRevenue: 2070000 },
  { date: '2026-10-27', day: 'Tue', pechsOrders: 510, gulshanOrders: 645, totalOrders: 1155, pechsRevenue: 935000, gulshanRevenue: 1220000, totalRevenue: 2155000 },
  { date: '2026-10-28', day: 'Wed', pechsOrders: 535, gulshanOrders: 680, totalOrders: 1215, pechsRevenue: 980000, gulshanRevenue: 1295000, totalRevenue: 2275000 },
  { date: '2026-10-29', day: 'Thu', pechsOrders: 590, gulshanOrders: 740, totalOrders: 1330, pechsRevenue: 1120000, gulshanRevenue: 1450000, totalRevenue: 2570000 },
  { date: '2026-10-30', day: 'Fri', pechsOrders: 720, gulshanOrders: 930, totalOrders: 1650, pechsRevenue: 1480000, gulshanRevenue: 1940000, totalRevenue: 3420000 },
  { date: '2026-10-31', day: 'Sat', pechsOrders: 840, gulshanOrders: 1090, totalOrders: 1930, pechsRevenue: 1790000, gulshanRevenue: 2360000, totalRevenue: 4150000 },
  { date: '2026-11-01', day: 'Sun', pechsOrders: 880, gulshanOrders: 1140, totalOrders: 2020, pechsRevenue: 1880000, gulshanRevenue: 2490000, totalRevenue: 4370000 }
];

// Top Menu Categories performance breakdown
export const CATEGORY_ANALYTICS: CategoryPerformance[] = [
  {
    category: 'Pakistani cuisine',
    pechsOrders: 1840,
    gulshanOrders: 2420,
    pechsRevenue: 3450000,
    gulshanRevenue: 4620000,
    totalOrders: 4260,
    totalRevenue: 8070000,
    color: '#f59e0b' // Amber 500
  },
  {
    category: 'BBQ & grills',
    pechsOrders: 1480,
    gulshanOrders: 2150,
    pechsRevenue: 2980000,
    gulshanRevenue: 4380000,
    totalOrders: 3630,
    totalRevenue: 7360000,
    color: '#ef4444' // Red 500
  },
  {
    category: 'Burgers & fast food',
    pechsOrders: 920,
    gulshanOrders: 1280,
    pechsRevenue: 860000,
    gulshanRevenue: 1240000,
    totalOrders: 2200,
    totalRevenue: 2100000,
    color: '#f97316' // Orange 500
  },
  {
    category: 'Pizza & pasta',
    pechsOrders: 760,
    gulshanOrders: 1040,
    pechsRevenue: 980000,
    gulshanRevenue: 1390000,
    totalOrders: 1800,
    totalRevenue: 2370000,
    color: '#eab308' // Yellow 500
  },
  {
    category: 'Chinese & continental',
    pechsOrders: 640,
    gulshanOrders: 890,
    pechsRevenue: 820000,
    gulshanRevenue: 1150000,
    totalOrders: 1530,
    totalRevenue: 1970000,
    color: '#06b6d4' // Cyan 500
  },
  {
    category: 'Breakfast',
    pechsOrders: 820,
    gulshanOrders: 1120,
    pechsRevenue: 420000,
    gulshanRevenue: 590000,
    totalOrders: 1940,
    totalRevenue: 1010000,
    color: '#10b981' // Emerald 500
  },
  {
    category: 'Desserts & drinks',
    pechsOrders: 1120,
    gulshanOrders: 1580,
    pechsRevenue: 480000,
    gulshanRevenue: 690000,
    totalOrders: 2700,
    totalRevenue: 1170000,
    color: '#8b5cf6' // Purple 500
  },
  {
    category: 'Deals & Combos',
    pechsOrders: 580,
    gulshanOrders: 840,
    pechsRevenue: 1580000,
    gulshanRevenue: 2280000,
    totalOrders: 1420,
    totalRevenue: 3860000,
    color: '#ec4899' // Pink 500
  }
];

// Order fulfillment channels breakdown
export const CHANNEL_ANALYTICS: ChannelPerformance[] = [
  { channel: 'Home Delivery', pechsCount: 1950, gulshanCount: 2680, totalCount: 4630, color: '#f59e0b' },
  { channel: 'Dine-In', pechsCount: 1620, gulshanCount: 2840, totalCount: 4460, color: '#10b981' },
  { channel: 'OTC Takeaway', pechsCount: 1120, gulshanCount: 1450, totalCount: 2570, color: '#06b6d4' },
  { channel: 'Scheduled Pre-orders', pechsCount: 490, gulshanCount: 710, totalCount: 1200, color: '#8b5cf6' },
  { channel: 'Foodpanda Integration', pechsCount: 680, gulshanCount: 920, totalCount: 1600, color: '#ec4899' }
];

// Top 5 individual dish sellers per branch
export const TOP_DISHES_PECHS = [
  { name: 'Desi Chicken Karahi', code: 'MENU001', portions: 840, revenue: 1620000 },
  { name: 'UTG Grand BBQ Platter', code: 'MENU013', portions: 360, revenue: 1386000 },
  { name: 'UTG Special Chicken Biryani', code: 'MENU005', portions: 1250, revenue: 812500 },
  { name: 'Chicken Malai Boti', code: 'MENU010', portions: 780, revenue: 694200 },
  { name: 'Classic Zinger Crunch', code: 'MENU015', portions: 890, revenue: 551800 }
];

export const TOP_DISHES_GULSHAN = [
  { name: 'UTG Grand BBQ Platter', code: 'MENU013', portions: 540, revenue: 2079000 },
  { name: 'Shinwari Mutton Karahi', code: 'MENU002', portions: 490, revenue: 1980000 },
  { name: 'Desi Chicken Karahi', code: 'MENU001', portions: 1120, revenue: 2150000 },
  { name: 'UTG Special Chicken Biryani', code: 'MENU005', portions: 1680, revenue: 1092000 },
  { name: 'Traditional Halwa Puri Thali', code: 'MENU029', portions: 1420, revenue: 639000 }
];
