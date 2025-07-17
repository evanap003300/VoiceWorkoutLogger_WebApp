export default function HowToUse() {
    const steps = [
        {
          title: "Start Recording",
          description:
            "Click the start recording button and the AI will begin listening to your workout!",
        },
        {
          title: "Log workout",
          description:
            "Tell the AI about your workout. Give them your sets for each exercise as well as the weights and reps you did for each set!",
        },
        {
          title: "Stop recording",
          description:
            "Stop the recording and you’re almost done! In a couple seconds your excel file will be ready to download.",
        },
        {
          title: "Download Excel File",
          description:
            "Click the download excel file button and you’re done!",
        },
      ];

    return (
        <section className="bg-gray-50 py-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold">How To Use</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {steps.map((step, index) => (
            <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm text-left transition-transform duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer"
            >
                <h3 className="text-lg font-semibold mb-2">
                <span className="text-[#733AEE] font-bold mr-1">{index + 1}.</span>
                {step.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{step.description}</p>
            </div>
            ))}
        </div>
        </section>
    )
}