"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const AuthButton = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
            {session ? (
                <Link href="/api/auth/signout">
                    Sign-Out of {session.user?.name}
                </Link>
            ) : (
                <Link href="/api/auth/signin">Sign-In</Link>
            )}
        </div>
    );
};

export default AuthButton;
