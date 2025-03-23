import React, { useState } from "react";
import { AccountCardProps } from "../../interface";

export default function AccountCard({ name, email }: AccountCardProps) {
    return (
        <div className="group duration-500 hover:-skew-x-0 skew-x-6 hover:translate-x-2">
            <div className="group-hover:duration-400 relative rounded-2xl w-80 h-36 bg-emerald-800 text-gray-50 flex flex-col justify-center items-center gap-1 before:-skew-x-12  before:rounded-2xl  before:absolute before:content['']  before:bg-green-700 before:right-3 before:top-0 before:w-80 before:h-32 before:-z-10">
                <span className="text-3xl font-bold">{name}</span>
                <p className="text-amber-100 font-thin">- {email} -</p>
            </div>
        </div>

    );
}
