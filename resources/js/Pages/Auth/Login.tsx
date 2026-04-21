import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { LoginView } from "@/features/auth/login/components";

export default function Login({ status, canResetPassword }: { status: string; canResetPassword: boolean }) {
  
    return <LoginView status={status} canResetPassword={canResetPassword} />;
}
