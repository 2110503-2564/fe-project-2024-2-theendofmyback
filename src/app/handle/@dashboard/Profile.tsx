"use client";

import { useState } from "react";

interface Camp {
    name: string;
    address: string;
    tel: string;
    price: number;
    capacity: number;
    description: string;
    image: string;
  }

interface Profile {
  data: {
    name: string;
    email: string;
    tel: string;
    createdAt: string;
  };
}

export default function Prof({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);

  const handleEdit = (camp: Camp) => {
    setIsEditing(true);
    setEditingCamp(camp);
  };

  return (
    <main className="m-5 p-5">
      <div className="text-3xl font-semibold text-green-700">
        {profile.data.name}
      </div>
      <table className="table-auto border-separate border-spacing-4 mt-5">
        <tbody>
          <tr><td className="font-medium text-gray-600">Email</td><td>{profile.data.email}</td></tr>
          <tr><td className="font-medium text-gray-600">Tel</td><td>{profile.data.tel}</td></tr>
          <tr><td className="font-medium text-gray-600">Member Since</td><td>{new Date(profile.data.createdAt).toLocaleDateString()}</td></tr>
        </tbody>
      </table>
    </main>
  );
}
