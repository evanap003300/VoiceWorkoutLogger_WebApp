import { motion } from "framer-motion";
import VoiceTranscriptionButton from "../buttons/TranscribeVoiceButton";

export default function Recording() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <section className="bg-gray-50 py-20">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-semibold">Log Your Workout</h2>
                </div>
                <div className="text-center mb-18">
                    <h3 className="font-medium sm:text-md text-gray-600 mb-6">
                        Get Your Excel File for Free! 
                    </h3>
                </div> 
                <div className="flex align-center justify-center">
                    <VoiceTranscriptionButton />
                </div>
            </section>
        </motion.section>
    );
}