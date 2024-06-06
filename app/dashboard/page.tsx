"use client";
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <div className="flex flex-col space-y-4">
      <Link href="/dashboard/quizdeux" legacyBehavior>
        <a className="btn btn-primary">Start Quiz</a>
      </Link>
      <Link href="/dashboard/results" legacyBehavior>
        <a className="btn btn-secondary">View Results</a>
      </Link>
    </div></div></div>
  );
};

export default Dashboard;

