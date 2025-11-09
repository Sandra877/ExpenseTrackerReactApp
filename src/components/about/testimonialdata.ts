import story1 from '../../assets/images/story1.webp';
import story2 from '../../assets/images/story2.webp';

type Testimonial = {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
};

export const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Freelancer',
        image: story1,
        content: 'ExpenseMate has completely changed how I handle my money. I can now track every shilling and see where my income actually goes each month.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'University Student',
        image: story2,
        content: 'Before ExpenseMate, I used to overspend without realizing it. Now I budget easily and stay within my limits — I even started saving more!',
    },
    {
        id: 3,
        name: 'Michael Brown',
        role: 'Small Business Owner',
        image: story1,
        content: 'ExpenseMate helps me separate personal and business expenses. The daily summaries and totals keep my cash flow organized effortlessly.',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'Working Professional',
        image: story2,
        content: 'I love how simple ExpenseMate is. Adding and editing expenses is quick, and I can see my monthly spending breakdown in seconds.',
    },
    {
        id: 5,
        name: 'David Wilson',
        role: 'Finance Manager',
        image: story1,
        content: 'ExpenseMate’s clean design makes expense tracking so easy. It’s like having a personal accountant, but without the stress!',
    },
    {
        id: 6,
        name: 'Sophia Lee',
        role: 'Teacher',
        image: story2,
        content: 'I use ExpenseMate to plan for family expenses. It’s helped me understand where we can cut back and how to save smarter.',
    },
    {
        id: 7,
        name: 'Chris Martin',
        role: 'Software Developer',
        image: story1,
        content: 'I track all my daily expenses with ExpenseMate — from coffee to bills. It’s satisfying to see exactly where my money goes!',
    },
    {
        id: 8,
        name: 'Olivia Taylor',
        role: 'Entrepreneur',
        image: story2,
        content: 'ExpenseMate gives me full control of my finances and helps me make better spending decisions. Highly recommended!',
    },
];
