import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { DisplayRawData } from './DisplayRawData';

export const CustomRouter = () => {
  return (
    <Routes>
      <Route path="/user/:id" element={<Home />} />
      <Route path="/user/:id/activity" element={<DisplayRawData />} />
      <Route path="/user/:id/average-sessions" element={<DisplayRawData />} />
      <Route path="/user/:id/performance" element={<DisplayRawData />} />
    </Routes>
  );
}