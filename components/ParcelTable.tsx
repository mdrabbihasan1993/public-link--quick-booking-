
import React, { useState } from 'react';
import { Parcel } from '../types';
import { Icons } from '../constants';

interface ParcelTableProps {
  parcels: Parcel[];
  onApprove: (id: string, lot: string, weight: string, cod: string) => void;
}

const ParcelTable: React.FC<ParcelTableProps> = ({ parcels, onApprove }) => {
  const [approvals, setApprovals] = useState<Record<string, { lot: string; weight: string; cod: string }>>({});

  const handleInputChange = (id: string, field: 'lot' | 'weight' | 'cod', value: string) => {
    setApprovals(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || { lot: '', weight: '', cod: '' }),
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-brandBlue text-white text-xs font-bold uppercase tracking-[0.1em]">
              <th className="py-5 px-6 border-r border-white/10">SL</th>
              <th className="py-5 px-6 border-r border-white/10">Recipient Name</th>
              <th className="py-5 px-6 border-r border-white/10">Phone</th>
              <th className="py-5 px-6 border-r border-white/10">Address</th>
              <th className="py-5 px-8 border-r border-white/10 text-center">Approval Action</th>
              <th className="py-5 px-6 border-r border-white/10">Weight</th>
              <th className="py-5 px-6 border-r border-white/10">District</th>
              <th className="py-5 px-6 border-r border-white/10">Area</th>
              <th className="py-5 px-6 border-r border-white/10">Note</th>
              <th className="py-5 px-6">Created</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-sm">
            {parcels.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-32 text-center text-slate-300 italic font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <div className="opacity-20"><Icons.Package /></div>
                    <span>All parcels cleared. No pending items.</span>
                  </div>
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => (
                <tr key={parcel.id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-0">
                  <td className="py-5 px-6 border-r border-slate-100 font-bold text-slate-400">{index + 1}</td>
                  <td className="py-5 px-6 border-r border-slate-100 font-bold text-brandBlue">{parcel.recipientName}</td>
                  <td className="py-5 px-6 border-r border-slate-100 font-mono text-slate-500">{parcel.phone}</td>
                  <td className="py-5 px-6 border-r border-slate-100 max-w-[200px] truncate" title={parcel.address}>
                    {parcel.address}
                  </td>
                  <td className="py-3 px-6 border-r border-slate-100 min-w-[340px]">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="Lot No" 
                        className="w-24 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue outline-none text-xs bg-white shadow-sm font-semibold transition-all hover:border-slate-300"
                        onChange={(e) => handleInputChange(parcel.id, 'lot', e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="Weight" 
                        className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue outline-none text-xs bg-white shadow-sm font-semibold transition-all hover:border-slate-300"
                        onChange={(e) => handleInputChange(parcel.id, 'weight', e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="COD" 
                        className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brandBlue outline-none text-xs bg-white shadow-sm font-semibold transition-all hover:border-slate-300"
                        onChange={(e) => handleInputChange(parcel.id, 'cod', e.target.value)}
                      />
                      <button 
                        onClick={() => {
                          const data = approvals[parcel.id] || { lot: '', weight: '', cod: '' };
                          onApprove(parcel.id, data.lot, data.weight, data.cod);
                        }}
                        className="bg-brandOrange hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-xs font-bold shadow-md active:scale-95"
                      >
                        <Icons.CheckCircle />
                        Approve
                      </button>
                    </div>
                  </td>
                  <td className="py-5 px-6 border-r border-slate-100 font-semibold">{parcel.weight || 'N/A'}</td>
                  <td className="py-5 px-6 border-r border-slate-100">{parcel.district}</td>
                  <td className="py-5 px-6 border-r border-slate-100">{parcel.area}</td>
                  <td className="py-5 px-6 border-r border-slate-100 italic text-slate-400">{parcel.note || '—'}</td>
                  <td className="py-5 px-6 whitespace-nowrap text-xs text-slate-400 font-medium">{parcel.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelTable;
