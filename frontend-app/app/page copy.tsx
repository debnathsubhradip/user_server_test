'use client';

import Image from "next/image";
import {useState} from 'react';
import { useEffect } from "react";





export default function Home() {
  const [data, setData] = useState("");
  const getData = async () => {
  
    try {
      const resp = await fetch('https://api.sampleapis.com/codingresources/codingResources');
      const json = await resp.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setData(err.message);
      } else {
        setData('An unknown error occurred');
      }
    }
  }
    

  useEffect(() => {
    getData();
  }, []);

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};
