export default function LocationSection() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b88a44]">
            Our Location
          </p>

          <h2 className="text-3xl font-semibold text-[#1f1f1f] sm:text-4xl">
            Visit Divya Desam
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Find us at Subramaniam Colony, Thiruvanmiyur, Chennai.
          </p>
        </div>

        {/* Map – Full width on mobile, 70% width from desktop */}
        <div className="mx-auto w-full overflow-hidden rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.10)] md:w-[85%] lg:w-[70%]">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d15549.755770299107!2d80.24085979904886!3d13.007696196973884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d13.0187264!2d80.2455552!4m5!1s0x3a5267f476ab2515%3A0x766a294abedec609!2sDev%20Apartment%2C%20Subramaniam%20Colony%2C%20Thiruvanmiyur%2C%20Chennai%2C%20Tamil%20Nadu%20600041!3m2!1d12.9959182!2d80.258246!5e0!3m2!1sen!2sin!4v1782899684383!5m2!1sen!2sin"
              title="Dev Apartment Location"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}