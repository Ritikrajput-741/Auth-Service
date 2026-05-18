const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-950 p-5">
      {/* Glass Card */}
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-4xl shadow-lg shadow-blue-500/20">
            ✅
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-4">Check Your Mail</h1>

        {/* Paragraph */}
        <p className="text-gray-400 text-lg leading-8">
          We’ve sent a verification link to your email address. Please check
          your inbox and verify your account to continue.
        </p>

        {/* Extra text */}
        <p className="text-gray-500 text-sm mt-6">
          If you don’t see the email, check your spam or junk folder.
        </p>

        {/* Button */}
        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500 transition-all duration-300 text-center"
        >
          Open Gmail
        </a>
      </div>
    </div>
  );
};

export default Verify;
