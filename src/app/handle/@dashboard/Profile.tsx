"use client";

import { useState } from "react";
import { Camp, Profile } from "../../../../interface";

export default function Prof({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);

  const handleEdit = (camp: Camp) => {
    setIsEditing(true);
    setEditingCamp(camp);
  };

  return (
    <main className="m-8 p-6 bg-white rounded-xl shadow-xl">
      <div className="text-4xl font-semibold text-teal-700 mb-6">
        - {profile.data.name} -
      </div>
      <div className="bg-teal-50 p-4 rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-semibold text-teal-600"> Be Careful !!</h2>
        <p className="text-lg text-teal-500">Your action will effect the database</p>
      </div>
      <table className="table-auto w-full border-collapse border-separate border-spacing-3">
        <tbody>
          <tr className="border-b border-teal-200">
            <td className="font-medium text-emerald-600 py-2 px-4">Email : </td>
            <td className="text-emerald-800 py-2 px-4">{profile.data.email}</td>
          </tr>
          <tr className="border-b border-teal-200">
            <td className="font-medium text-emerald-600 py-2 px-4">Tel : </td>
            <td className="text-emerald-800 py-2 px-4">{profile.data.tel}</td>
          </tr>
          <tr>
            <td className="font-medium text-emerald-600 py-2 px-4">Member Since : </td>
            <td className="text-emerald-800 py-2 px-4">
              {new Date(profile.data.createdAt).toLocaleDateString()}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
