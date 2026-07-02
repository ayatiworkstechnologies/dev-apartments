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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25908.822089435347!2d80.2299377535103!3d13.007509636536266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e062999005%3A0xd986fb71dc835b1d!2sDev%20apartment!5e0!3m2!1sen!2sin!4v1782985424149!5m2!1sen!2sin%22"
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