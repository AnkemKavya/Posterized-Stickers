import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { Home } from './pages/Home/Home';
import { Posters } from './pages/Posters/Posters';
import { Stickers } from './pages/Stickers/Stickers';
import { Custom } from './pages/Custom/Custom';
import { Collections } from './pages/Collections/Collections';
import { CollectionDetails } from './pages/CollectionDetails/CollectionDetails';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { Profile } from './pages/Profile/Profile';
import { Orders } from './pages/Orders/Orders';
import { Addresses } from './pages/Addresses/Addresses';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { RecentlyViewed } from './pages/RecentlyViewed/RecentlyViewed';
import { CustomDesigns } from './pages/CustomDesigns/CustomDesigns';
import { Settings } from './pages/Settings/Settings';
import { Search } from './pages/Search/Search';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* 1. All / Home Storefront */}
        <Route index element={<Home />} />

        {/* 2. Catalogues */}
        <Route path="posters" element={<Posters />} />
        <Route path="stickers" element={<Stickers />} />

        {/* 3. Custom Print Studio */}
        <Route path="custom" element={<Custom />} />

        {/* 4. Themed Collections */}
        <Route path="collections" element={<Collections />} />
        <Route path="collection/:slug" element={<CollectionDetails />} />

        {/* 5. Product Details */}
        <Route path="product/:id" element={<ProductDetails />} />

        {/* 6. Cart & WhatsApp Checkout */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />

        {/* 7. Profile & Sub-routes */}
        <Route path="profile" element={<Profile />} />
        <Route path="profile/orders" element={<Orders />} />
        <Route path="profile/addresses" element={<Addresses />} />
        <Route path="profile/wishlist" element={<Wishlist />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile/recently-viewed" element={<RecentlyViewed />} />
        <Route path="profile/designs" element={<CustomDesigns />} />

        {/* 8. Store Settings & Search */}
        <Route path="settings" element={<Settings />} />
        <Route path="search" element={<Search />} />

        {/* 9. Catch-all Fallback */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
