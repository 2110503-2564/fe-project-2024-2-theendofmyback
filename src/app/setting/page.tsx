'use client'
import Switch from "@/components/mode";
import { useState } from 'react';

export default function Setting() {
    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    }

    const [isNightMode, setIsNightMode] = useState(false);

    return  <Switch checked={isNightMode} onChange={toggleNightMode} />;
}