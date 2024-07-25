'use client';
import { Coin, useCoinStore } from '@/lib/store';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragDropWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setCoins } = useCoinStore();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('/api/search');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const transformedCoins = data.coins.map(
          (item: { item: Coin }) => item.item
        );

        setCoins(transformedCoins); // Set the transformed coins in the store
      } catch (err) {
        console.error('Error fetching coin data:', err);
      }
    };

    fetchCoins(); // Fetch data immediately on component mount

    const intervalId = setInterval(fetchCoins, 30000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [setCoins]); // Empty dependency array means this effect runs once on mount

  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DragDropWrapper;
