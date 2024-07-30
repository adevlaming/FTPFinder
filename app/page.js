"use client"

import Link from "next/link";
// Import the useUserAuth hook
import { useUserAuth } from "./_utils/auth-context";


export default function SignInPage(){
    //calls custom hook
    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();

    //have to use function to handle the sign in and sign out
    async function handleSignIn(){
        try {
            await gitHubSignIn()
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut(){
        try {
            await firebaseSignOut()
        } catch (error) {
            console.log(error);
        }
    }

    //console.dir(user);

    //"{user ? () : () }" single line if statement essentially (if user exists "user ?"" then "()" if not (:), then the second "()")
    return(
        <main className="flex flex-col items-center justify-center min-h-screen bg-black text-center text-orange-500">  
            <header className="text-center mb-5 text-orange-500">
                <h1 className="text-6xl font-mono mb-10">Free-To-Play Finder</h1>
                <p className="text-xl font-mono">
                    <Link href="./finder" className="text-2xl hover:underline"> Click Here To View Game List</Link>
                </p>
            </header>
            {user ? (
                //user IS logged in
                <div className="text-center font-mono text-orange-500">
                    <p>Welcome {user.displayName}</p>
                    <p>{user.email}</p>
                    <img className="w-8 h-8 mx-auto" src={user.photoURL} />
                    <button onClick={()=> handleSignOut(firebaseSignOut)} className="text-2xl font-mono m-2 hover:underline">Sign Out</button>
                </div>
            ) : (
                //user IS NOT logged in
                <div className="text-orange-500">
                    <p className="text-xl font-mono mb-5">Please Sign In To View All Of The Sites Features!</p>
                    <button onClick={() => handleSignIn(gitHubSignIn)} className="text-2xl font-mono m-2 hover:underline">Sign In</button>
                </div>
            ) }

        </main>

    );
}

