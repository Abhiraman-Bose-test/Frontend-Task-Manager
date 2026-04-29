import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMember } from "../api/projectApi";
import {
    createTask,
    deleteTask,
    getProjectTasks,
    updateTaskStatus,
} from "../api/taskApi";
import Navbar from "../components/Navbar";
import type {
    AddMemberRequest,
    CreateTaskRequest,
    TaskResponse,
    TaskStatus
} from "../types";

function ProjectDetails() {
  const { projectId } = useParams();
  const parsedProjectId = Number(projectId);

  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [memberForm, setMemberForm] = useState<AddMemberRequest>({
    userId: 0,
    role: "MEMBER",
  });

  const [taskForm, setTaskForm] = useState<CreateTaskRequest>({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    assignedToUserId: 0,
  });

  const fetchTasks = async () => {
    try {
      const data = await getProjectTasks(parsedProjectId);
      setTasks(data);
    } catch {
      setError("Failed to fetch project tasks.");
    }
  };

  useEffect(() => {
    if (parsedProjectId) {
      fetchTasks();
    }
  }, [parsedProjectId]);

  const handleMemberChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setMemberForm((previous) => ({
      ...previous,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const handleTaskChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setTaskForm((previous) => ({
      ...previous,
      [name]: name === "assignedToUserId" ? Number(value) : value,
    }));
  };

  const normalizeDueDate = (dueDate: string) => {
    if (!dueDate) {
      return "";
    }

    return dueDate.length === 16 ? `${dueDate}:00` : dueDate;
  };

  const handleAddMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await addMember(parsedProjectId, memberForm);
      setSuccess("Member added successfully.");
      setMemberForm({ userId: 0, role: "MEMBER" });
    } catch {
      setError("Failed to add member. Make sure you are project admin.");
    }
  };

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createTask(parsedProjectId, {
        ...taskForm,
        dueDate: normalizeDueDate(taskForm.dueDate),
      });

      setSuccess("Task created successfully.");
      setTaskForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        assignedToUserId: 0,
      });

      fetchTasks();
    } catch {
      setError("Failed to create task. Make sure assigned user is a project member.");
    }
  };

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    setError("");
    setSuccess("");

    try {
      await updateTaskStatus(taskId, { status });
      setSuccess("Task status updated.");
      fetchTasks();
    } catch {
      setError("Failed to update task status.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    setError("");
    setSuccess("");

    try {
      await deleteTask(taskId);
      setSuccess("Task deleted successfully.");
      fetchTasks();
    } catch {
      setError("Failed to delete task. Only admin can delete tasks.");
    }
  };

  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2>Project Details</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <section
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h3>Add Member</h3>

          <form onSubmit={handleAddMember}>
            <input
              name="userId"
              type="number"
              placeholder="User ID"
              value={memberForm.userId || ""}
              onChange={handleMemberChange}
              style={{ marginRight: "8px" }}
            />

            <select
              name="role"
              value={memberForm.role}
              onChange={handleMemberChange}
              style={{ marginRight: "8px" }}
            >
              <option value="MEMBER">MEMBER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button type="submit">Add Member</button>
          </form>
        </section>

        <section
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        >
          <h3>Create Task</h3>

          <form onSubmit={handleCreateTask}>
            <input
              name="title"
              placeholder="Task title"
              value={taskForm.title}
              onChange={handleTaskChange}
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={taskForm.description}
              onChange={handleTaskChange}
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />

            <input
              name="dueDate"
              type="datetime-local"
              value={taskForm.dueDate}
              onChange={handleTaskChange}
              style={{ marginRight: "8px" }}
            />

            <select
              name="priority"
              value={taskForm.priority}
              onChange={handleTaskChange}
              style={{ marginRight: "8px" }}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>

            <input
              name="assignedToUserId"
              type="number"
              placeholder="Assigned User ID"
              value={taskForm.assignedToUserId || ""}
              onChange={handleTaskChange}
              style={{ marginRight: "8px" }}
            />

            <button type="submit">Create Task</button>
          </form>
        </section>

        <section>
          <h3>Project Tasks</h3>

          {tasks.length === 0 ? (
            <p>No tasks found.</p>
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
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  <strong>Due:</strong> {task.dueDate}
                </p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Assigned to user:</strong> {task.assignedToUserId}
                </p>
                <p>
                  <strong>Created by user:</strong> {task.createdByUserId}
                </p>

                <select
                  value={task.status}
                  onChange={(event) =>
                    handleStatusChange(task.id, event.target.value as TaskStatus)
                  }
                  style={{ marginRight: "8px" }}
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>

                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete Task
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default ProjectDetails;