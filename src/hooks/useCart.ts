import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartService, AddToCartData, UpdateCartData } from '../services/cart';
import toast from 'react-hot-toast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

export const useCart = () => {
  const queryClient = useQueryClient();

  // Get cart query
  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: (data: AddToCartData) => cartService.addToCart(data),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ITEM_ADDED_TO_CART);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartData }) =>
      cartService.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: string) => cartService.removeFromCart(itemId),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ITEM_REMOVED_FROM_CART);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      toast.success('Cart cleared successfully');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  return {
    cart: cartQuery.data?.data,
    isLoading: cartQuery.isLoading,
    error: cartQuery.error,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
};