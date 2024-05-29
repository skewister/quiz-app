import Link from "next/link";

const Dashboard = () => (
  <main className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <div className="flex flex-col space-y-4">
      <Link href="/dashboard/quiz" legacyBehavior>
        <a className="btn btn-primary">Start Quiz</a>
      </Link>
      <Link href="/dashboard/results" legacyBehavior>
        <a className="btn btn-secondary">View Results</a>
      </Link>
    </div>
  </main>
);

export default Dashboard;
