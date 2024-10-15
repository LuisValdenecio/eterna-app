"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const NewVerificationHandler = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const onSubmit = useCallback(() => {

        if (success || error) return;

        if (!token) {
            setError("Missing token")
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong!");
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="text-center">
            {!success && !error && (
                <>
                    <BeatLoader />
                    <p className="block">Verifying your token...</p>
                </>
            )}
            {!success && (
                <FormError message={error} />
            )}
            <FormSuccess message={success} />
        </div>
    );
}

export default NewVerificationHandler;