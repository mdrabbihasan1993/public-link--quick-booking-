
export interface Parcel {
  id: string;
  recipientName: string;
  phone: string;
  address: string;
  cod: number;
  weight: string;
  district: string;
  area: string;
  note: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DashboardStats {
  totalPending: number;
  totalApproved: number;
  totalEarnings: number;
  todayCount: number;
}
