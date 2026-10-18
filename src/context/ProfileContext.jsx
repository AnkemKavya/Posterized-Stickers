import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, StorageKeys } from '../services/storageService';
import { STORE_CONFIG } from '../config/storeConfig';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  // Customer details loaded safely from localStorage (posterizedCustomer)
  const [customer, setCustomer] = useState(() => {
    return storageService.getCustomer();
  });

  // Orders placed (Pending WhatsApp confirmation)
  const [orders, setOrders] = useState(() => {
    return storageService.get(StorageKeys.ORDERS, []);
  });

  // Saved Addresses
  const [addresses, setAddresses] = useState(() => {
    return storageService.get(StorageKeys.ADDRESSES, []);
  });

  // Custom designs saved by user
  const [customDesigns, setCustomDesigns] = useState(() => {
    return storageService.get(StorageKeys.CUSTOM_DESIGNS, []);
  });

  useEffect(() => {
    storageService.set(StorageKeys.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    storageService.set(StorageKeys.ADDRESSES, addresses);
  }, [addresses]);

  useEffect(() => {
    storageService.set(StorageKeys.CUSTOM_DESIGNS, customDesigns);
  }, [customDesigns]);

  /**
   * Updates or saves customer details to localStorage (posterizedCustomer)
   * and synchronizes React state immediately.
   */
  const updateCustomer = (updatedData) => {
    const merged = customer ? { ...customer, ...updatedData } : { ...updatedData };
    const saved = storageService.saveCustomer(merged);
    if (saved) {
      setCustomer(saved);

      // If customer has delivery address, save to addresses list if not already present
      if (saved.address) {
        setAddresses(prev => {
          const exists = prev.some(
            a => a.addressLine === saved.address && a.pincode === saved.pincode
          );
          if (!exists) {
            return [
              {
                id: `addr-${Date.now()}`,
                isDefault: prev.length === 0,
                fullName: saved.name || '',
                phone: saved.phone || '',
                addressLine: saved.address,
                city: saved.city || '',
                state: saved.state || '',
                pincode: saved.pincode || ''
              },
              ...prev
            ];
          }
          return prev;
        });
      }
    }
    return saved;
  };

  /**
   * Clear saved customer details
   */
  const clearCustomer = () => {
    storageService.clearCustomer();
    setCustomer(null);
  };

  // Backwards-compatible profile object
  const profile = customer || {
    name: '',
    email: '',
    phone: '',
    avatar: null
  };

  const updateProfile = (data) => updateCustomer(data);

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const addAddress = (address) => {
    const newAddr = { ...address, id: `addr-${Date.now()}` };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
  };

  const updateAddress = (id, updated) => {
    setAddresses(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, ...updated };
      }
      if (updated.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    }));
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const saveCustomDesign = (design) => {
    const newDesign = {
      ...design,
      id: `design-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomDesigns(prev => [newDesign, ...prev]);
  };

  const deleteCustomDesign = (id) => {
    setCustomDesigns(prev => prev.filter(d => d.id !== id));
  };

  return (
    <ProfileContext.Provider
      value={{
        customer,
        updateCustomer,
        clearCustomer,
        profile,
        updateProfile,
        orders,
        addOrder,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        customDesigns,
        saveCustomDesign,
        deleteCustomDesign
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileContext');
  return context;
};
