import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDashboard } from "../api/projectApi";
import Navbar from "../components/Navbar";
import type { DashboardResponse, TaskStatus } from "../types";

function Dashboard() {
  const { projectId } = useParams();
  const parsedProjectId = Number(projectId);

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getProjectDashboard(parsedProjectId);
        setDashboard(data);
      } catch {
        setError("Failed to fetch dashboard.");
      }
    };

    if (parsedProjectId) {
      fetchDashboard();
    }
  }, [parsedProjectId]);

  const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2>Project Dashboard</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!dashboard ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <h3>Summary</h3>
              <p>
                <strong>Project ID:</strong> {dashboard.projectId}
              </p>
              <p>
                <strong>Total tasks:</strong> {dashboard.totalTasks}
              </p>
              <p>
                <strong>Overdue tasks:</strong> {dashboard.overdueTasks}
              </p>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <h3>Tasks by Status</h3>

              {statuses.map((status) => (
                <p key={status}>
                  <strong>{status}:</strong>{" "}
                  {dashboard.tasksByStatus?.[status] || 0}
                </p>
              ))}
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <h3>Tasks Per User</h3>

              {dashboard.tasksPerUser.length === 0 ? (
                <p>No task assignment data found.</p>
              ) : (
                dashboard.tasksPerUser.map((item) => (
                  <p key={item.userId}>
                    <strong>User {item.userId}:</strong> {item.taskCount} task(s)
                  </p>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;