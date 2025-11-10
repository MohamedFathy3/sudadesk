// app/students/PaymentModal.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { apiFetch } from '@/lib/api';

// تعريف نوع الدفع بناءً على الـ API
interface Payment {
  id: number;
  student: {
    id: number;
    name: string;
    education_stage: string;
    term: string;
  };
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  type: string;
  installments_count: number;
  status: string;
  bdf_invoice_number: string | null;
  created_at: string;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[];
}

interface PaymentModalProps {
  payment: Payment; // تغيير من student إلى payment
  isOpen: boolean;
  onClose: () => void;
}

// نوع بيانات نموذج الدفع
interface PaymentFormData {
  amount: string;
  method: 'cash' | 'card' | 'transfer';
  bdf_invoice_number: string;
  notes: string;
  paid_at: string;
}

export default function PaymentModal({ payment, isOpen, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: '',
    method: 'cash',
    bdf_invoice_number: `BDF-INV-${new Date().getFullYear()}-${String(payment.id).padStart(3, '0')}`,
    notes: '',
    paid_at: new Date().toISOString().split('T')[0] // تاريخ اليوم
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const paymentData = {
        amount: parseFloat(formData.amount),
        method: formData.method,
        bdf_invoice_number: formData.bdf_invoice_number,
        notes: formData.notes,
        paid_at: formData.paid_at
      };

      // استخدام endpoint الصحيح: payments/{id}/pay
      const response = await apiFetch(`/payments/${payment.id}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      setMessage('✅ Payment processed successfully!');
      setFormData({
        amount: '',
        method: 'cash',
        bdf_invoice_number: `BDF-INV-${new Date().getFullYear()}-${String(payment.id).padStart(3, '0')}`,
        notes: '',
        paid_at: new Date().toISOString().split('T')[0]
      });
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Process Payment for {payment.student.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* عرض معلومات الدفع الحالية */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payment Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600 dark:text-gray-300">Total Amount:</div>
            <div className="font-medium">${payment.total_amount.toLocaleString()}</div>
            
            <div className="text-gray-600 dark:text-gray-300">Paid Amount:</div>
            <div className="font-medium">${payment.paid_amount.toLocaleString()}</div>
            
            <div className="text-gray-600 dark:text-gray-300">Remaining:</div>
            <div className="font-medium text-green-600">${payment.remaining_amount.toLocaleString()}</div>
            
            <div className="text-gray-600 dark:text-gray-300">Type:</div>
            <div className="font-medium capitalize">{payment.type}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter payment amount"
              step="0.01"
              min="0"
              max={payment.remaining_amount}
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum: ${payment.remaining_amount.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Method *
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              name="bdf_invoice_number"
              value={formData.bdf_invoice_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter invoice number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Date *
            </label>
            <input
              type="date"
              name="paid_at"
              value={formData.paid_at}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter any notes about this payment"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Process Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}