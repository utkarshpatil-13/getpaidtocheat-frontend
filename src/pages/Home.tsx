import { Link } from "react-router-dom";
import home from "../assets/images/home.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      title: "Subscription Plans",
      description: "Flexible plans tailored to your needs.",
      icon: "💳", // Replace with an actual icon if needed
    },
    {
      title: "Content Upload",
      description: "Seamlessly upload and manage your content.",
      icon: "☁️", // Replace with an actual icon if needed
    },
    {
      title: "Payouts",
      description: "Get your earnings directly into your account with ease.",
      icon: "💰", // Replace with an actual icon if needed
    },
    {
      title: "Rewards Management",
      description: "Track engagement metrics and maximize rewards.",
      icon: "🏆", // Replace with an actual icon if needed
    },
  ];

  const steps = [
    {
      title: "Sign Up",
      description: "Create your account and set up your profile.",
      icon: "👤",
    },
    {
      title: "Upload Content",
      description: "Share your content and start building your audience.",
      icon: "📤",
    },
    {
      title: "Earn Rewards",
      description: "Get paid for your engagement and hard work.",
      icon: "💵",
    },
  ];

  const testimonials = [
    {
      name: "Jane Doe",
      feedback:
        "This platform has completely changed the way I earn money online. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      name: "John Smith",
      feedback:
        "Amazing features and a seamless experience. I love how easy it is to get started.",
      image: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      name: "Emily Johnson",
      feedback: "A game-changer for creators. The rewards system is fantastic!",
      image: "https://randomuser.me/api/portraits/men/79.jpg",
    },
  ];

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden mb-[-11px]">
        {/* Hero Section */}
        <div className="flex items-center max-md:flex-col max-md:w-full max-md:pt-10 bg-[#012F85]">
          <div className="flex flex-col items-center text-center gap-4 ml-20">
            <h1 className="text-5xl font-bold text-white">Get Paid for Your Hard Work</h1>
            <p className="max-md:text-lg text-xl text-white">
              Join our platform and start earning by creating and sharing
              amazing content.
            </p>
            <div className="flex gap-2">
              <Link
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-6 rounded-md text-lg transition-colors"
                to={"/learn-more"}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-[50vw]">
            <img src={home} className="object-cover aspect-square" alt="" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#012F85]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white h-72 p-6 flex flex-col justify-center rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-110 hover:duration-500"
              >
                <div className="text-4xl mb-4 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xl">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-600">
            How It Works
          </h2>
          <div className="flex flex-col items-center space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl shadow-lg">
                  {step.icon}
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-xl">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-600">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-600">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 text-xl">{testimonial.feedback}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-600">
            Premium Creator Plan
          </h2>

          {/* Plan Details */}
          <div className="text-center mb-12">
            <p className="text-xl font-semibold text-gray-600">$29.99/month</p>
            <p className="text-gray-600 mt-2">
              Unlock the full potential of your content creation journey.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Access to advanced content analytics",
              "Higher payouts for engagement metrics",
              "Exclusive tools for content optimization",
              "Early access to new features and updates",
              "Priority customer support",
              "Unlimited content uploads",
              "Access to rewards and bonus programs",
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-800 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </div>

          {/* Animated Metrics */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {/* Counter Example */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-blue-600">$10,000+</p>
              <p className="text-gray-600">Rewards Claimed</p>
            </motion.div>

            {/* Progress Bar Example */}
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100%" }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 text-center mb-2">
                Engagement Metrics Achieved
              </p>
              <div className="bg-gray-300 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </motion.div>

            {/* Counter Example */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl font-bold text-blue-600">10,000+</p>
              <p className="text-gray-600">Creators Using the Plan</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
