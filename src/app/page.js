"use client"; // Indique que ce composant est un Client Component

import { auth } from "@/app/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Home() {
    const [user] = useAuthState(auth);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to My App</h1>
            {user ? (
                <>
                    <p>Hello, {user.email}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link href="/login">Go to Login</Link>
            )}
        </div>
    );
}