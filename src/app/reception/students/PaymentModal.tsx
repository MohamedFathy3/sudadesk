// app/students/PaymentModal.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { apiFetch } from '@/lib/api';

// تعريف نوع الطالب
interface Student {
  id: number;
  name: string;
  age?: number;
  education_stage?: string;
  term?: string;
  previous_school?: string;
  father_name?: string;
  father_phone?: string;
  father_job?: string;
  mother_name?: string;
  mother_phone?: string;
  mother_job?: string;
  classe_id?: number;
  email?: string;
  active?: boolean;
  classroom?: string;
  father?: {
    name: string;
  };
  classe?: {
    name: string;
  };
}

interface PaymentModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

// نوع بيانات النموذج
interface PaymentFormData {
  total_amount: string;
  type: 'cash' | 'installment';
  installments_count: string;
}

export default function PaymentModal({ student, isOpen, onClose }: PaymentModalProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    total_amount: '',
    type: 'cash',
    installments_count: '1'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const paymentData = {
        student_id: student.id,
        total_amount: parseFloat(formData.total_amount),
        type: formData.type,
        installments_count: parseInt(formData.installments_count)
      };

      const response = await apiFetch('/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      setMessage('✅ Payment processed successfully!');
      setFormData({
        total_amount: '',
        type: 'cash',
        installments_count: '1'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Payment for {student.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Amount *
            </label>
            <input
              type="number"
              name="total_amount"
              value={formData.total_amount}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter total amount"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="cash">Cash</option>
              <option value="installment">Installment</option>
            </select>
          </div>

          {formData.type === 'installment' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Installments Count *
              </label>
              <input
                type="number"
                name="installments_count"
                value={formData.installments_count}
                onChange={handleChange}
                min="1"
                max="12"
                required={formData.type === 'installment'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Number of installments"
              />
            </div>
          )}

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