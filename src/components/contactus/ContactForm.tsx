import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

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

  
   const onSubmit = async (data: ContactInputs) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in to send a message");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/messages/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.error || "Failed to send message");
      return;
    }

    toast.success("Message sent successfully!");
    reset();
  } catch {
    toast.error("Server error. Please try again.");
  }
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
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("subject", { required: "Subject is required" })}
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            />
            {errors.subject && (
              <p className="text-red-600 text-sm">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={4}
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400"
            />
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
