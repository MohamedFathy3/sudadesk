// app/payments/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CreditCard, User, DollarSign, FileText, Download, Plus, X } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
interface Accountant {
  id: number;
  name: string;
  email: string;
}

interface Transaction {
  id: number;
  amount: number;
  method: string;
  bdf_invoice_number: string | null;
  paid_at: string;
  notes: string | null;
  accountant: Accountant;
}

interface Student {
  id: number;
  name: string;
  education_stage: string;
  term: string;
}

interface Payment {
  id: number;
  student: Student;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  type: string;
  installments_count: number;
  status: string;
  bdf_invoice_number: string | null;
  created_at: string;
  transactions: Transaction[];
}

interface AddTransactionForm {
  amount: string;
  method: string;
  notes: string;
}

function AddTransactionModal({ 
  isOpen, 
  onClose, 
  paymentId, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  paymentId: number;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<AddTransactionForm>({
    amount: '',
    method: 'cash',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiFetch(`/payments/${paymentId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          method: formData.method,
          notes: formData.notes
        }),
      });

      onSuccess();
      onClose();
      setFormData({ amount: '', method: 'cash', notes: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Add Payment
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Record a new transaction
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Payment Method *
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              >
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors resize-none"
                placeholder="Add any additional notes..."
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl dark:bg-red-900/20 dark:border-red-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                'Add Payment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// دالة لتحميل الفاتورة عبر API route
const downloadInvoice = (transactionId: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const invoiceUrl = `${baseUrl}/payments/${transactionId}/invoice`;
  
  // نعمل a tag ونضغط عليه برمجياً
  const a = document.createElement('a');
  a.href = invoiceUrl;
  a.download = `invoice-${transactionId}.pdf`;
  a.target = '_blank'; // يفتح في تاب جديد
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default function PaymentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const paymentId = params.id;

  useEffect(() => {
    if (paymentId) {
      fetchPaymentDetails();
    }
  }, [paymentId]);

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/payments/${paymentId}`);
      setPayment(data.payment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      unpaid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const getTypeColor = (type: string) => {
    return type === 'cash' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  };



 

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Payment not found</p>
        </div>
      </div>
    );
  }

  return (
   
   <MainLayout>  <div className="min-h-screen  dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Payments
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Payment Details
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                ID: #{payment.id} • {payment.student.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                {payment.status.toUpperCase()}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(payment.type)}`}>
                {payment.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  Payment Summary
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${payment.total_amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Amount</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${payment.paid_amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Paid Amount</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${payment.remaining_amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Remaining</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Installments:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{payment.installments_count}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Created:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </span>
                </div>
                {payment.bdf_invoice_number && (
                  <div className="col-span-2 flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">BDF Invoice:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.bdf_invoice_number}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-green-600" />
                Student Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{payment.student.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Education Stage:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{payment.student.education_stage}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Term:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{payment.student.term}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium text-gray-600 dark:text-gray-400">Student ID:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">STU{payment.student.id.toString().padStart(3, '0')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-green-600" />
                  Transactions
                </h2>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-lg shadow-green-600/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Transaction
                </button>
              </div>
              
              {payment.transactions && payment.transactions.length > 0 ? (
                <div className="space-y-4">
                  {payment.transactions.map((transaction) => (
                    <div key={transaction.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-md transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            ${transaction.amount.toLocaleString()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.method === 'cash' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {transaction.method.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => downloadInvoice(transaction.id)}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </button>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 font-medium">
                            <Calendar className="w-4 h-4 mr-2" />
                            {transaction.paid_at}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600 dark:text-gray-400">Accountant:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{transaction.accountant.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{transaction.accountant.email}</span>
                        </div>
                        {transaction.bdf_invoice_number && (
                          <div className="lg:col-span-2 flex justify-between">
                            <span className="font-medium text-gray-600 dark:text-gray-400">BDF Invoice:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{transaction.bdf_invoice_number}</span>
                          </div>
                        )}
                        {transaction.notes && (
                          <div className="lg:col-span-2">
                            <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">Notes:</div>
                            <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                              {transaction.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Transactions</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No transactions recorded yet</p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Add your first transaction
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {((payment.paid_amount / payment.total_amount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(payment.paid_amount / payment.total_amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {payment.installments_count}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">INSTALLMENTS</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {payment.transactions?.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">TRANSACTIONS</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center shadow-lg shadow-green-600/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Transaction
                </button>
          
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        paymentId={payment.id}
        onSuccess={fetchPaymentDetails}
      />
    </div></MainLayout>
 
  );
}