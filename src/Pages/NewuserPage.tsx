import { Link } from "react-router-dom";


const NewUserPage = () => {
  return (
    <div className="min-h-screen bg-orange-50 text-gray-900 flex flex-col">
     

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-16">
        {/* Left: Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-600 leading-tight">
            Take Control of Your Finances <br />
            <span className="text-gray-800">with ExpenseMate</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Track your expenses effortlessly, visualize your spending, and
            achieve your financial goals — all in one beautiful dashboard.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-100 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/logo.png"
            alt="ExpenseMate Dashboard"
            className="rounded-2xl shadow-xl w-[85%] border-4 border-orange-200"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-orange-600 text-white py-6 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} ExpenseMate — Smart Budgeting Simplified.
        </p>
      </footer>
    </div>
  );
};

export default NewUserPage;
