"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(email, password);
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>{isLogin ? "Login" : "SignUp"}</h1>
            <form onSubmit={isLogin ? handleLogin : handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? "Login" : "SignUp"}</button>
            </form>
            <button className="google-button" onClick={handleGoogleLogin}>Login with Google</button>
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: "none", border: "none", color:"#0070f3", cursor: "pointer"}}>
                {isLogin ? "SignUp" : "Login"}
                </button>
            </p>
        </div>
    );
}