import Link from "next/link";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <Link href="/dashboard/quiz">
      <a>Start Quiz</a>
    </Link>
    <Link href="/dashboard/results">
      <a>View Results</a>
    </Link>
  </div>
);

export default Dashboard;
