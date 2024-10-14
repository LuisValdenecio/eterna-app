"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/../../routes";

const SocialBtns = () => {

    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => onClick("google")}
        >
            Sign in with Google
        </Button>
    )
}

export default SocialBtns;