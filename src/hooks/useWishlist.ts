import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { wishlistService } from '../services/wishlist.service';
import { QUERY_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import { useAuth } from '../context/AuthContext';

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  // Get wishlist query - only fetch if authenticated
  const wishlistQuery = useQuery({
    queryKey: QUERY_KEYS.WISHLIST.LIST,
    queryFn: () => wishlistService.getWishlist(),
    enabled: isAuthenticated, // Only run query if user is authenticated
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.addToWishlist(Number(productId)),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ITEM_ADDED_TO_WISHLIST);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WISHLIST.LIST });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.removeFromWishlist(Number(productId)),
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.ITEM_REMOVED_FROM_WISHLIST);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WISHLIST.LIST });
    },
    onError: (error: any) => {
      toast.error(error.message || ERROR_MESSAGES.SERVER_ERROR);
    },
  });

  const addToWishlist = (productId: string) => {
    return addToWishlistMutation.mutateAsync(productId);
  };

  const removeFromWishlist = (productId: string) => {
    return removeFromWishlistMutation.mutateAsync(productId);
  };

  const isInWishlist = (productId: string): boolean => {
    if (!isAuthenticated) return false;
    return wishlistQuery.data?.some((item: any) => item.productId === Number(productId)) || false;
  };

  return {
    wishlist: wishlistQuery.data,
    isLoading: wishlistQuery.isLoading || addToWishlistMutation.isPending || removeFromWishlistMutation.isPending,
    error: wishlistQuery.error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
