// app/payments/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CreditCard, User, DollarSign, FileText, Download, Plus, X } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';

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

// دالة لإنشاء وتحميل الفاتورة من الفرونت
const downloadInvoice = (transaction: Transaction, payment: Payment) => {
  // استيراد المكتبة ديناميكي
  import('jspdf').then((jsPDFModule) => {
    const jsPDF = jsPDFModule.default;
    const doc = new jsPDF();

    // إعدادات الفاتورة
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    // إضافة عنوان الفاتورة
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94); // لون أخضر
    doc.text('INVOICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // معلومات الفاتورة
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // لون أسود
    
    // رقم الفاتورة
    doc.text(`Invoice Number: INV-${transaction.id}`, margin, yPosition);
    yPosition += 10;
    
    // تاريخ الفاتورة
    doc.text(`Date: ${new Date(transaction.paid_at).toLocaleDateString()}`, margin, yPosition);
    yPosition += 10;

    // خط فاصل
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // معلومات الطالب
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text('Student Information', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${payment.student.name}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Education Stage: ${payment.student.education_stage}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Term: ${payment.student.term}`, margin, yPosition);
    yPosition += 15;

    // معلومات الدفع
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text('Payment Details', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Amount: $${transaction.amount.toLocaleString()}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Payment Method: ${transaction.method.toUpperCase()}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Payment Type: ${payment.type.toUpperCase()}`, margin, yPosition);
    yPosition += 7;
    
    if (transaction.bdf_invoice_number) {
      doc.text(`BDF Invoice: ${transaction.bdf_invoice_number}`, margin, yPosition);
      yPosition += 7;
    }
    
    yPosition += 10;

    // معلومات المحاسب
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text('Accountant Information', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${transaction.accountant.name}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Email: ${transaction.accountant.email}`, margin, yPosition);
    yPosition += 15;

    // ملاحظات إذا وجدت
    if (transaction.notes) {
      doc.setFontSize(14);
      doc.setTextColor(34, 197, 94);
      doc.text('Notes', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      
      // تقسيم النص إذا كان طويل
      const splitNotes = doc.splitTextToSize(transaction.notes, pageWidth - (2 * margin));
      doc.text(splitNotes, margin, yPosition);
    }

    // توقيع
    yPosition += 30;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your payment!', pageWidth / 2, yPosition, { align: 'center' });

    // تحميل الملف
    doc.save(`invoice-${transaction.id}-${payment.student.name.replace(/\s+/g, '-')}.pdf`);
  }).catch((error) => {
    console.error('Error loading jsPDF:', error);
    alert('Failed to generate invoice');
  });
};

export default function PaymentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const paymentId = params.id;

  // الترجمات
  const t = {
    back_to_payments: language === 'ar' ? 'العودة إلى المدفوعات' : 'Back to Payments',
    payment_details: language === 'ar' ? 'تفاصيل الدفع' : 'Payment Details',
    id: language === 'ar' ? 'رقم' : 'ID',
    payment_summary: language === 'ar' ? 'ملخص الدفع' : 'Payment Summary',
    total_amount: language === 'ar' ? 'المبلغ الإجمالي' : 'Total Amount',
    paid_amount: language === 'ar' ? 'المبلغ المدفوع' : 'Paid Amount',
    remaining: language === 'ar' ? 'المتبقي' : 'Remaining',
    installments: language === 'ar' ? 'الأقساط:' : 'Installments:',
    created: language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:',
    bdf_invoice: language === 'ar' ? 'فاتورة BDF:' : 'BDF Invoice:',
    student_information: language === 'ar' ? 'معلومات الطالب' : 'Student Information',
    name: language === 'ar' ? 'الاسم:' : 'Name:',
    education_stage: language === 'ar' ? 'المرحلة التعليمية:' : 'Education Stage:',
    term: language === 'ar' ? 'الفصل الدراسي:' : 'Term:',
    student_id: language === 'ar' ? 'رقم الطالب:' : 'Student ID:',
    transactions: language === 'ar' ? 'المعاملات' : 'Transactions',
    add_transaction: language === 'ar' ? 'إضافة معاملة' : 'Add Transaction',
    download_pdf: language === 'ar' ? 'تحميل PDF' : 'Download PDF',
    accountant: language === 'ar' ? 'المحاسب:' : 'Accountant:',
    email: language === 'ar' ? 'البريد الإلكتروني:' : 'Email:',
    no_transactions: language === 'ar' ? 'لا توجد معاملات' : 'No Transactions',
    no_transactions_desc: language === 'ar' ? 'لم يتم تسجيل أي معاملات بعد' : 'No transactions recorded yet',
    add_first_transaction: language === 'ar' ? 'أضف أول معاملة' : 'Add your first transaction',
    payment_progress: language === 'ar' ? 'تقدم الدفع' : 'Payment Progress',
    progress: language === 'ar' ? 'التقدم' : 'Progress',
    quick_actions: language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions',
    payment_not_found: language === 'ar' ? 'الدفع غير موجود' : 'Payment not found',

    // Status Types
    paid: language === 'ar' ? 'مدفوع' : 'Paid',
    partial: language === 'ar' ? 'جزئي' : 'Partial',
    unpaid: language === 'ar' ? 'غير مدفوع' : 'Unpaid',

    // Payment Types
    cash: language === 'ar' ? 'نقدي' : 'Cash',
    installment: language === 'ar' ? 'تقسيط' : 'Installment'
  };

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

  const translateStatus = (status: string) => {
    const statuses: { [key: string]: string } = {
      'paid': t.paid,
      'partial': t.partial,
      'unpaid': t.unpaid
    };
    return statuses[status] || status;
  };

  const translateType = (type: string) => {
    const types: { [key: string]: string } = {
      'cash': t.cash,
      'installment': t.installment
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!payment) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">{t.payment_not_found}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className={`inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors font-medium ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t.back_to_payments}
            </button>
            
            <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
              <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t.payment_details}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {t.id}: #{payment.id} • {payment.student.name}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(payment.status)}`}>
                  {translateStatus(payment.status).toUpperCase()}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(payment.type)}`}>
                  {translateType(payment.type).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-6">
              {/* Payment Summary Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className={`flex items-center justify-between mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                    <CreditCard className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} text-green-600`} />
                    {t.payment_summary}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${payment.total_amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t.total_amount}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${payment.paid_amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t.paid_amount}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${payment.remaining_amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t.remaining}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.installments}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.installments_count}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.created}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(payment.created_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                    </span>
                  </div>
                  {payment.bdf_invoice_number && (
                    <div className="col-span-2 flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                      <span className="font-medium text-gray-600 dark:text-gray-400">{t.bdf_invoice}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{payment.bdf_invoice_number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Information Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <User className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} text-green-600`} />
                  {t.student_information}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.name}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.student.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.education_stage}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.student.education_stage}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.term}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{payment.student.term}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{t.student_id}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">STU{payment.student.id.toString().padStart(3, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Transactions Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {payment.transactions && payment.transactions.length > 0 ? (
                  <div className="space-y-4">
                    {payment.transactions.map((transaction) => (
                      <div key={transaction.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-md transition-all">
                        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
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
                          <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <button
                              onClick={() => downloadInvoice(transaction, payment)}
                              className={`inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                            >
                              <Download className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                              {t.download_pdf}
                            </button>
                            <div className={`flex items-center text-sm text-gray-600 dark:text-gray-400 font-medium ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <Calendar className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                              {transaction.paid_at}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600 dark:text-gray-400">{t.accountant}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{transaction.accountant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-600 dark:text-gray-400">{t.email}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{transaction.accountant.email}</span>
                          </div>
                          {transaction.bdf_invoice_number && (
                            <div className="lg:col-span-2 flex justify-between">
                              <span className="font-medium text-gray-600 dark:text-gray-400">{t.bdf_invoice}</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{transaction.bdf_invoice_number}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.no_transactions}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{t.no_transactions_desc}</p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      {t.add_first_transaction}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Progress Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t.payment_progress}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">{t.progress}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}