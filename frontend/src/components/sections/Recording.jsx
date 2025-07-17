import DownloadButton from "../buttons/DownloadButton";
import { motion } from "framer-motion";

export default function Recording() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <section className="bg-gray-50 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold">Make recording page here (need to make a button for this)</h2>
                </div>
                <div className="flex align-center justify-center">
                    <DownloadButton />
                </div>
            </section>
        </motion.section>
    );
}