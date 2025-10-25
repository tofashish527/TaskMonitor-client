import React, { useState } from "react";
import cloudy from "../assets/img/Cloudy.jpg";
import { useNavigate } from "react-router";
import { FaPaperPlane, FaRocket, FaBell, FaGift, FaCheck } from "react-icons/fa";

const Newsletter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const benefits = [
    { icon: <FaRocket className="text-emerald-400" />, text: "Early access to new features" },
    { icon: <FaBell className="text-emerald-400" />, text: "Weekly industry insights" },
    { icon: <FaGift className="text-emerald-400" />, text: "Exclusive offers & discounts" }
  ];

  return (
    <section className=" bg-emerald-950 relative py-20 px-4 text-white overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-in-out"
        style={{ backgroundImage: `url(${cloudy})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0  bg-emerald-950 z-0" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-700 mb-6">
            <FaPaperPlane className="text-emerald-300" />
            <span className="text-emerald-300 font-semibold">Stay Ahead of the Curve</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Join Our
            <span className="block text-emerald-300">Innovation Network</span>
          </h2>
          
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Get exclusive access to cutting-edge insights, early product releases, and transformative content delivered directly to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Benefits Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Why Join Our Community?</h3>
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-emerald-800/30 backdrop-blur-sm rounded-xl border border-emerald-700/50 hover:border-emerald-500 transition-all duration-300 hover:translate-x-2"
              >
                <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                  {benefit.icon}
                </div>
                <span className="text-emerald-100 font-medium">{benefit.text}</span>
              </div>
            ))}
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-emerald-800/40 rounded-xl border border-emerald-700/30">
                <div className="text-2xl font-bold text-emerald-300">10K+</div>
                <div className="text-emerald-200 text-sm">Subscribers</div>
              </div>
              <div className="text-center p-4 bg-emerald-800/40 rounded-xl border border-emerald-700/30">
                <div className="text-2xl font-bold text-emerald-300">98%</div>
                <div className="text-emerald-200 text-sm">Open Rate</div>
              </div>
              <div className="text-center p-4 bg-emerald-800/40 rounded-xl border border-emerald-700/30">
                <div className="text-2xl font-bold text-emerald-300">Weekly</div>
                <div className="text-emerald-200 text-sm">Updates</div>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="bg-emerald-800/50 backdrop-blur-sm rounded-2xl mt-12 p-8 border border-emerald-700 shadow-2xl">
            {isSubscribed ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard! 🎉</h3>
                <p className="text-emerald-100">
                  Thank you for subscribing! Check your email for a special welcome gift.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey</h3>
                <p className="text-emerald-100 mb-6">Enter your email to unlock exclusive content</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email"
                      className="w-full px-4 py-4 bg-emerald-900/50 border border-emerald-600 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Subscribe Now
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-emerald-700/50">
                  <button
                    onClick={handleSignIn}
                    className="w-full bg-transparent border-2 border-emerald-600 text-emerald-300 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Already a member? Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-emerald-200 text-sm">
            🔒 We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;