import React from "react";

const Pricing = () => {

  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      features: [
        "Send up to 2 transfers per month",
        "Basic transaction history",
        "Email support",
        "Limited currency support (USD, EUR, GBP)",
        "Basic security features"
      ],
      highlight: false
    },
    {
      name: "Standard Plan",
      price: "$9.99/m",
      features: [
        "Unlimited transfers",
        "Transaction history with export options",
        "Priority email support",
        "Expanded currency support",
        "Advanced security features"
      ],
      highlight: true
    },
    {
      name: "Pro Plan",
      price: "$19.99/m",
      features: [
        "Unlimited transfers with priority processing",
        "Comprehensive transaction analytics",
        "24/7 priority support",
        "Full currency support",
        "Enhanced security features"
      ],
      highlight: false
    }
  ];


  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* background heading */}
<div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gray-300/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full"></div>
      
      <h1 className="absolute top-15 left-1/2 -translate-x-1/2 text-[160px] font-bold text-white/10 pointer-events-none select-none">
        Pricing
      </h1>


      {/* pricing cards */}

      <div className="max-w-6xl mx-auto pt-56 px-6 grid md:grid-cols-3 gap-8 relative z-10">

        {plans.map((plan, index) => (

          <div
            key={index}
            className={`rounded-2xl border border-white/10 backdrop-blur-xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:border-white/30
            ${plan.highlight ? "bg-white/10 scale-105 shadow-xl" : "bg-white/5"}`}
          >

            <p className="text-sm text-zinc-400">
              {plan.name}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {plan.price}
            </h2>


            <div className="mt-8 space-y-4">

              {plan.features.map((feature, i) => (

                <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">

                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    ✓
                  </div>

                  <span>{feature}</span>

                </div>

              ))}

            </div>


            <button
              className={`mt-10 w-full py-3 rounded-full text-sm font-medium transition
              ${plan.highlight
                ? "bg-white text-black hover:bg-zinc-200"
                : "border border-white/20 hover:bg-white/10"}`}
            >
              Get Started
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Pricing;