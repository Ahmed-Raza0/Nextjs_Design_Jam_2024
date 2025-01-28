import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full sm:w-[380px] h-auto flex flex-col justify-center items-center">
        {/* Header Section */}
        <div className="w-full sm:w-[324px] h-auto mt-7 sm:mt-7 flex flex-col gap-3 items-center justify-center">
          <Image
            src="/images/image.svg"
            alt="Nike Logo"
            width={324}
            height={17}
            className="w-full h-auto"
          />
          <h1 className={`${inter.className} text-center text-[#111111] text-[18px] font-bold`}>
            BECOME A NIKE MEMBER
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-full sm:w-[324px] h-auto mt-7 flex flex-col gap-4 items-center justify-center">
          <form action="/sign-in" method="POST">
            {/* Email Field */}
            <div className="w-full">
              <Label htmlFor="email" className="text-lg font-medium text-gray-800">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full h-[40px] pl-3 border border-[#E5E5E5] rounded-[3px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Field */}
            <div className="w-full">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-lg font-medium text-gray-800">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-xs underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
                className="w-full h-[40px] pl-3 border border-[#E5E5E5] rounded-[3px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Keep me signed in and Forget Password Links */}
            <div className="w-full flex justify-between items-center mt-3 px-3">
              <div className="flex items-center">
                <Image
                  src="/images/Rectangle.svg"
                  alt="checkbox"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
                <p className="text-[11px] text-[#8D8D8D] ml-2">Keep me signed in</p>
              </div>
              <p className="text-[11px] text-[#8D8D8D] underline">Forget Password</p>
            </div>

            {/* Privacy Policy */}
            <div className="w-full sm:w-[324px] h-auto flex justify-center mt-3">
              <p className="text-center text-[12px] text-[#8D8D8D]">
                By logging into your account, you agree to Nike&apos;s{" "}
                <span className="text-[#111111] font-medium underline">Privacy Policy</span> and Terms of Use.
              </p>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <SubmitButton
                formAction={signInAction}
                pendingText="Signing In..."
                className="w-full h-[40px] flex items-center justify-center border border-black bg-[#111111] rounded-[3px] mt-4"
              >
                Sign In
              </SubmitButton>
            </div>

            {/* Form Message */}
            <FormMessage message={searchParams} />

            {/* Sign Up Link */}
            <div className="w-full sm:w-[324px] h-[24px] flex flex-row items-center justify-center mt-4">
              <h1 className="text-center text-[15px] text-[#8D8D8D]">
                Don&apos;t have an account?{" "}
                <span className="text-[#111111] font-medium underline text-[15px]">
                  <Link href="/sign-up">Sign Up</Link>
                </span>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
