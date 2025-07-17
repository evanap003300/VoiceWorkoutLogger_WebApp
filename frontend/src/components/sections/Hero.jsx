import PrimaryButton from '../buttons/PrimaryButton.jsx'
import SpeechToTextImage from '../../assets/speach_to_text.jpg'
import { motion } from "framer-motion";

// Save Time Logging Your Workouts 

export default function Hero() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-16 bg-white">
                <div className="w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-0">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        <span className="text-gray-900">Save </span>
                        <span className="text-gray-900">Time </span>
                        <span className="text-[#BCB0FF]">Logging </span>
                        <span className="text-gray-900">Your </span>
                        <span className="text-[#D5CCFF]">Workouts</span>
                    </h1>

                    <h3 className="font-semibold sm:text-lg text-gray-700 mb-2">
                        Tracking your workouts made easy.
                    </h3>

                    <h3 className="font-semibold sm:text-lg text-gray-700 mb-6">
                        Powered by AI voice transcription for faster logging.
                    </h3>

                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center px-4 lg:px-0">
                    <img src={SpeechToTextImage} alt="Speech to text image" className="w-full h-auto max-w-md lg:max-w-xl"/>
                </div>
            </section>
        </motion.section>
    )
}