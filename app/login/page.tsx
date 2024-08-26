import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex items-center justify-center md:h-screen">
          <LoginForm />
      </div>
    </div>
  );
}
