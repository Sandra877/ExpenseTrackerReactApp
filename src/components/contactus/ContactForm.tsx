// src/components/contact/ContactForm.tsx
import { useForm } from "react-hook-form";

type ContactInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInputs>();

  const onSubmit = (data: ContactInputs) => {
    console.log("Message sent:", data);
    alert("Your message has been sent successfully!");
    reset();
  };

  return (
    <section className="py-16 px-6 md:px-20 flex justify-center bg-white">
      <div className="w-full max-w-2xl p-8 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Write your message..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
