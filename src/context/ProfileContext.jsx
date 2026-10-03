import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, StorageKeys } from '../services/storageService';
import { STORE_CONFIG } from '../config/storeConfig';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  // User profile details
  const [profile, setProfile] = useState(() => {
    return storageService.get(StorageKeys.USER_PROFILE, STORE_CONFIG.demoUser);
  });

  // Orders placed (Pending WhatsApp confirmation)
  const [orders, setOrders] = useState(() => {
    return storageService.get(StorageKeys.ORDERS, [
      {
        orderId: 'ORD-8921',
        date: '2026-09-28',
        status: 'Pending WhatsApp confirmation',
        total: 546,
        itemsCount: 2,
        items: [
          { title: 'Jujutsu Kaisen Poster', size: 'A4', qty: 1, price: 299 },
          { title: 'Anime Laptop Sticker Pack', size: 'Pack of 15', qty: 1, price: 199 }
        ]
      }
    ]);
  });

  // Saved Addresses
  const [addresses, setAddresses] = useState(() => {
    return storageService.get(StorageKeys.ADDRESSES, [
      {
        id: 'addr-1',
        isDefault: true,
        fullName: 'Kavya Sharma',
        phone: '+91 98765 43210',
        addressLine: 'Flat 402, Skyline Residency, 100 Feet Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038'
      }
    ]);
  });

  // Custom designs saved by user
  const [customDesigns, setCustomDesigns] = useState(() => {
    return storageService.get(StorageKeys.CUSTOM_DESIGNS, [
      {
        id: 'design-1',
        name: 'Neo Samurai Wall Feature',
        type: 'Custom Poster',
        size: 'A3',
        layout: 'Bold',
        customText: 'STAY SHARP // NEVER COMPROMISE',
        createdAt: '2026-09-25',
        previewImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80'
      }
    ]);
  });

  useEffect(() => {
    storageService.set(StorageKeys.USER_PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    storageService.set(StorageKeys.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    storageService.set(StorageKeys.ADDRESSES, addresses);
  }, [addresses]);

  useEffect(() => {
    storageService.set(StorageKeys.CUSTOM_DESIGNS, customDesigns);
  }, [customDesigns]);

  const updateProfile = (updatedData) => {
    setProfile(prev => ({ ...prev, ...updatedData }));
  };

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
