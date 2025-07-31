import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Package, Truck, Calendar, CreditCard, MapPin, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { orderService } from '../services/order.service';
import { QUERY_KEYS, ROUTES, ORDER_STATUS_CONFIG } from '../constants';
import { formatPrice, formatDate } from '../utils';
import { Order, OrderItem } from '../types';

const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: orderResponse, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ORDERS.DETAIL(id!),
    queryFn: () => orderService.getOrder(id!),
    enabled: !!id,
  });

  const order = orderResponse?.data;

  // Send order confirmation email (mock)
  useEffect(() => {
    if (order) {
      // Mock email sending
      console.log('Order confirmation email sent for order:', order.orderNumber);
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
          <Link to={ROUTES.HOME}>
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS_CONFIG[order.status.toUpperCase() as keyof typeof ORDER_STATUS_CONFIG];
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <>
      <Helmet>
        <title>Order Confirmation - {order.orderNumber} - Misika</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Order #{order.orderNumber}</h2>
                  <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <Badge variant={statusConfig?.variant || 'default'}>
                  {statusConfig?.label || order.status}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.product.images?.[0] || 'https://via.placeholder.com/64'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                        <div className="text-sm text-gray-500">
                          {Object.entries(item.selectedVariants).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{formatPrice(item.totalPrice || item.price * item.quantity)}</p>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">{formatPrice(order.shippingCost || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">{formatPrice(order.tax)}</span>
                  </div>
                  {order.discount && order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600">-{formatPrice(order.discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                </div>
                <div className="text-gray-600">
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  {order.shippingAddress.phone && <p className="mt-2">{order.shippingAddress.phone}</p>}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                </div>
                <div className="text-gray-600">
                  <p className="capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                  <Badge variant={order.paymentStatus === 'completed' ? 'success' : 'warning'} className="mt-2">
                    {order.paymentStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex items-center mb-4">
                <Truck className="w-5 h-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-900 font-medium">Estimated Delivery</p>
                  <p className="text-gray-600">{formatDate(estimatedDelivery.toISOString())}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  leftIcon={<Download className="w-5 h-5" />}
                  onClick={() => window.print()}
                >
                  Download Invoice
                </Button>
                
                <Link to={ROUTES.ORDERS}>
                  <Button variant="outline" size="lg" className="w-full">
                    View All Orders
                  </Button>
                </Link>
                
                <Link to={ROUTES.PRODUCTS}>
                  <Button size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
