
import React, { useState } from 'react';
import { Parcel } from './types';
import { Icons } from './constants';
import ParcelTable from './components/ParcelTable';

const MOCK_PARCELS: Parcel[] = [
  {
    id: '1',
    recipientName: 'Test User',
    phone: '01930630063',
    address: 'Plot 42, Block C, Dhaka Cantonment',
    cod: 500,
    weight: 'N/A',
    district: 'Dhaka',
    area: 'Dhaka cantonment',
    note: 'Call before delivery',
    createdAt: '04 Jan, 2026 12:59 AM',
    status: 'pending'
  },
  {
    id: '2',
    recipientName: 'Ariful Islam',
    phone: '01712345678',
    address: 'H-12, Rd-4, Dhanmondi',
    cod: 1200,
    weight: '1.5kg',
    district: 'Dhaka',
    area: 'Dhanmondi',
    note: 'Fragile items',
    createdAt: '05 Jan, 2026 10:15 AM',
    status: 'pending'
  }
];

const App: React.FC = () => {
  const [parcels, setParcels] = useState<Parcel[]>(MOCK_PARCELS);
  const [copying, setCopying] = useState(false);

  const publicLink = "https://7tonexpress.com/create-parcel/206";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const handleApprove = (id: string, lot: string, weight: string, cod: string) => {
    alert(`Approving Parcel ID: ${id}\nLot: ${lot}\nWeight: ${weight}\nCOD: ${cod}`);
    setParcels(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-bgGray p-4 sm:p-10">
      <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-500">
        
        {/* Public Link Card - Centered and clean */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="max-w-3xl">
            <h1 className="text-xl font-bold text-brandBlue mb-4 flex items-center gap-2">
              <span className="text-brandOrange"><Icons.CheckCircle /></span>
              Public Registration Link
            </h1>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 overflow-hidden rounded-xl border-2 border-slate-100 bg-white shadow-sm transition-all hover:border-brandBlue/30">
              <div className="px-5 py-3 font-mono text-sm text-slate-600 select-all truncate flex-1">
                {publicLink}
              </div>
              <button 
                onClick={handleCopyLink}
                className={`${copying ? 'bg-green-600' : 'bg-brandOrange hover:bg-orange-600'} text-white px-8 py-3 flex items-center justify-center gap-2 transition-all font-bold whitespace-nowrap`}
              >
                {copying ? <Icons.CheckCircle /> : <Icons.Copy />}
                {copying ? 'Copied' : 'Copy Link'}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400 font-medium">
              Share this link with customers to allow them to register their parcels directly.
            </p>
          </div>
        </div>

        {/* Parcel Table Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-brandBlue tracking-tight">
              Pending Parcel Queue
            </h2>
            <span className="bg-brandBlue text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {parcels.length} NEW
            </span>
          </div>

          <div className="transition-all">
            <ParcelTable parcels={parcels} onApprove={handleApprove} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
