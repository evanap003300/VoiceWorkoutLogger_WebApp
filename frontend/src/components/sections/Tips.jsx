import { motion } from "framer-motion";

export default function Tips() {
    const tips = [
      {
        title: "Be Specific with Sets",
        description:
          "Break down the weight as well as the amount of reps you do for each set, ie. two sets of bench press, 155 for 5 and 135 for 7.",
      },
      {
        title: "Speak Briefly",
        description:
          "Talk like you’re logging notes. Skip filler words and just state what you did. This saves time and increases precision.",
      },
      {
        title: "Take Short Pauses",
        description:
          "After logging a set for an exercise take a short break and then log your next set or exercise. This increases the model’s accuracy.",
      },
    ];
  
    return (
      <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
        <section className="bg-gray-50 pt-20 pb-40">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold">Tips for Voice Logging</h2>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm text-left transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
                >
                  <h3 className="text-lg font-semibold mb-6">
                    <span className="text-[#733AEE] font-bold mr-1">{index + 1}.</span>
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.section>
    );
  }