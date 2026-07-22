import { MoveLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#131313] px-6 py-16 text-white">
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
                <h1 className="mb-6 text-3xl font-semibold">Privacy Policy</h1>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    This Privacy Policy explains how our movie discovery application
                    collects, uses, and protects your information when you use our
                    service.
                </p>

                <h2 className="mb-3 text-xl font-medium">1. Information We Collect</h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    We may collect basic information such as your device type, browser
                    details, app usage activity, and any information you voluntarily
                    provide while using the app.
                </p>

                <h2 className="mb-3 text-xl font-medium">
                    2. How We Use Your Information
                </h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    The information collected is used to improve app performance,
                    personalize your experience, analyze usage trends, and provide better
                    movie-related recommendations.
                </p>

                <h2 className="mb-3 text-xl font-medium">3. Cookies and Tracking</h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    Our app may use cookies or similar technologies to remember your
                    preferences and improve overall functionality. You can manage cookies
                    through your browser settings if available.
                </p>

                <h2 className="mb-3 text-xl font-medium">4. Third-Party Services</h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    The app may use third-party APIs or services to display movie
                    information, posters, and related metadata. These services may collect
                    data according to their own privacy policies.
                </p>

                <h2 className="mb-3 text-xl font-medium">5. Data Security</h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    We take reasonable steps to protect your information, but no method of
                    transmission over the internet is completely secure. Please use the
                    app at your own discretion.
                </p>

                <h2 className="mb-3 text-xl font-medium">6. Your Rights</h2>
                <p className="mb-4 text-sm leading-7 text-[#e5e2e1]/80">
                    You may contact us if you wish to learn more about the personal
                    information we hold or request updates to your data, subject to
                    applicable law.
                </p>
            </div>
            <Link to="/">
                <Button
                    className={`text-black text-lg font-medium flex items-center justify-evenly border border-black/10 px-5 py-2.5 cursor-pointer fixed bottom-1 right-2`}
                >
                    <MoveLeft className="size-6" /> Back
                </Button>
            </Link>
        </div>
    );
}
