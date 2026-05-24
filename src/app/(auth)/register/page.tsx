import RegisterForm from '@/components/auth/register/RegisterOverView';
export default function Register() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center ">
      <div className="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}
