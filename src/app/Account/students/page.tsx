// app/students/page.tsx
'use client';

import GenericDataManager from "@/components/Tablecomponents/GenericDataManager";
import { useAuth } from '@/contexts/AuthContext';
import { Eye, CreditCard } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import { useRouter } from 'next/navigation';

export default function StudentsPage() {
  const { user } = useAuth();
  const router = useRouter();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenPaymentModal = (item: any) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewStudent = (item: any) => {
    router.push(`/Account/students/${item.student.id}`);
  };

  return (
    <>
      <GenericDataManager
        endpoint="payments"
        title="Payments Management"
        columns={[
          { 
            key: 'id', 
            label: 'Payment ID', 
            sortable: true,
            render: (item) => `PAY${String(item.id).padStart(3, '0')}`
          },
          { 
            key: 'student.name', 
            label: 'Student Name', 
            sortable: true,
            render: (item) => item.student?.name || 'N/A'
          },
        
          { 
            key: 'total_amount', 
            label: 'Total Amount', 
            sortable: true,
            render: (item) => `${item.total_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'paid_amount', 
            label: 'Paid Amount', 
            sortable: true,
            render: (item) => `${item.paid_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'remaining_amount', 
            label: 'Remaining Amount', 
            sortable: true,
            render: (item) => `${item.remaining_amount?.toLocaleString() || '0'}`
          },
          { 
            key: 'type', 
            label: 'Payment Type', 
            sortable: true,
            render: (item) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.type === 'cash' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              }`}>
                {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'N/A'}
              </span>
            )
          },
          {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.status === 'paid' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : item.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A'}
              </span>
            )
          },
          {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewStudent(item)}
                  className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  title="View Student"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => handleOpenPaymentModal(item)}
                  className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  title="Manage Payments"
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  Payments
                </button>
              </div>
            )
          }
        ]}
        
        showAddButton={true}
        showEditButton={false}
        showDeleteButton={false}
        showActiveToggle={false} 
        showSearch={true}
        showBulkActions={false}
        showDeletedToggle={false}
        additionalData={[
          { key: 'students', endpoint: '/student' }
        ]}
        formFields={[
          {
            name: 'student_id',
            label: 'Student',
            type: 'select',
            required: true,
            optionsKey: 'students',
            placeholder: 'Select student'
          },
          {
            name: 'total_amount',
            label: 'Total Amount',
            type: 'number',
            required: true,
            placeholder: 'Enter total amount'
          },
          {
            name: 'type',
            label: 'Payment Type',
            type: 'select',
            required: true,
            options: [
              { value: 'cash', label: 'Cash' },
              { value: 'installment', label: 'Installment' }
            ],
            placeholder: 'Select payment type'
          },
          {
            name: 'installments_count',
            label: 'Installments Count',
            type: 'number',
            required: false,
            placeholder: 'Enter number of installments'
          },
          {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
              { value: 'pending', label: 'Pending' },
              { value: 'paid', label: 'Paid' },
              { value: 'overdue', label: 'Overdue' }
            ],
            placeholder: 'Select payment status'
          }
        ]}
      />

      {isPaymentModalOpen && selectedItem && (
        <PaymentModal
          payment={selectedItem} 
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
        />
      )}
    </>
  );
}