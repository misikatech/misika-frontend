import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService, CheckoutData, CreateOrderData } from '../services/orders';
import toast from 'react-hot-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () => orderService.getOrders(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const checkoutMutation = useMutation({
    mutationFn: (data: CheckoutData) => orderService.initiateCheckout(data),
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderData) => orderService.createOrder(data),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ORDER_PLACED);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
    onSuccess: () => {
      toast.success('Order cancelled successfully');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  return {
    initiateCheckout: checkoutMutation.mutate,
    createOrder: createOrderMutation.mutate,
    cancelOrder: cancelOrderMutation.mutate,
    isCheckingOut: checkoutMutation.isPending,
    isCreatingOrder: createOrderMutation.isPending,
    isCancellingOrder: cancelOrderMutation.isPending,
    checkoutData: checkoutMutation.data?.data,
  };
};