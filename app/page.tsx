"use client"; 

import React from 'react';
import Header from './components/Header';
import TimeCard from './components/TimeCard';
import History from './components/History';
import ExportButtons from './components/ExportButtons';

const Home: React.FC = () => (
  <div className="container">
    <Header />
    <TimeCard />
    <History />
    <ExportButtons />
  </div>
);

export default Home;
