
import expenseImg from "../../assets/images/expense-dashboard.png"; 
import { Link } from "react-router-dom";


const Intro = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 bg-orange-50">
      {/* Left side image */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={expenseImg}
          alt="expense-tracker"
          className="w-full h-56 md:h-full object-cover rounded-xl shadow-lg border-4 border-orange-200"
        />
      </div>

      {/* Right side text */}
      <div className="w-full md:w-1/2 bg-white border-2 border-orange-300 rounded-xl p-6 md:p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-orange-600">
          About ExpenseMate
        </h1>
        <p className="mb-4 text-gray-700 text-base md:text-lg leading-relaxed">
          <strong>ExpenseMate</strong> helps you take control of your finances by
          tracking where your money goes — easily, visually, and securely.
        </p>
        <p className="mb-2 text-gray-700 text-base md:text-lg leading-relaxed">
          Add your daily expenses, categorize them, and get a clear picture of
          your spending habits. Whether you're budgeting for personal goals or
          managing family expenses, ExpenseMate keeps your records organized in
          one place.
        </p>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          With simple charts, daily summaries, and total expense insights,
          you'll always know where you stand — helping you make smarter financial
          decisions every day.
        </p>

        <div className="mt-6">
            <Link
            to="/register"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
            >
            Get Started
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Intro;
