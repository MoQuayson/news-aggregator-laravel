/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/auth/signup.tsx
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Loader2 } from "lucide-react";

type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
};

export function SignupPage() {
  const navigate = useNavigate();
  const { user, signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = ["Name is required"];
    }

    if (!formData.email) {
      newErrors.email = ["Email is required"];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = ["Please enter a valid email address"];
    }

    if (!formData.password) {
      newErrors.password = ["Password is required"];
    } else if (formData.password.length < 8) {
      newErrors.password = ["Password must be at least 8 characters"];
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = ["Please confirm your password"];
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = ["Passwords do not match"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) return;

    try {
      await signup(formData);
      navigate("/");
    } catch (error: any) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setGeneralError(error.message || "Failed to create account");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {generalError && (
              <Alert variant="destructive">
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} disabled={isLoading} aria-invalid={!!errors.name} />
              {errors.name?.map((error, i) => (
                <p key={i} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} disabled={isLoading} aria-invalid={!!errors.email} />
              {errors.email?.map((error, i) => (
                <p key={i} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} disabled={isLoading} aria-invalid={!!errors.password} />
              {errors.password?.map((error, i) => (
                <p key={i} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <Input
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={!!errors.password_confirmation}
              />
              {errors.password_confirmation?.map((error, i) => (
                <p key={i} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
