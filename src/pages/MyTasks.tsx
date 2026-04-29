import { useEffect, useState } from "react";
import { getMyTasks, updateTaskStatus } from "../api/taskApi";
import Navbar from "../components/Navbar";
import type { TaskResponse, TaskStatus } from "../types";

function MyTasks() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const fetchMyTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data);
    } catch {
      setError("Failed to fetch assigned tasks.");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    setError("");
    setSuccess("");

    try {
      await updateTaskStatus(taskId, { status });
      setSuccess("Task status updated.");
      fetchMyTasks();
    } catch {
      setError("Failed to update task status.");
    }
  };

  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2>My Tasks</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {tasks.length === 0 ? (
          <p>No assigned tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <p>
                <strong>Project:</strong> {task.projectId}
              </p>

              <p>
                <strong>Due:</strong> {task.dueDate}
              </p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <select
                value={task.status}
                onChange={(event) =>
                  handleStatusChange(task.id, event.target.value as TaskStatus)
                }
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default MyTasks;