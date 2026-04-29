import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createProject, getMyProjects } from "../api/projectApi";
import Navbar from "../components/Navbar";
import type { CreateProjectRequest, ProjectResponse } from "../types";

function Projects() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);

  const [formData, setFormData] = useState<CreateProjectRequest>({
    name: "",
    description: "",
  });

  const [error, setError] = useState<string>("");

  const fetchProjects = async () => {
    try {
      const data = await getMyProjects();
      setProjects(data);
    } catch {
      setError("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await createProject(formData);
      setFormData({ name: "", description: "" });
      fetchProjects();
    } catch (error: any) {
  console.error("Create project failed:", error);
  console.error("Response:", error.response);
  setError(error.response?.data?.message || "Failed to create project.");
}
  };

  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2>Projects</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleCreateProject} style={{ marginBottom: "24px" }}>
          <input
            name="name"
            placeholder="Project name"
            value={formData.name}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
          />

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
          />

          <button type="submit">Create Project</button>
        </form>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: "1px solid #ddd",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Created by user:</strong> {project.createdByUserId}
              </p>

              <Link to={`/projects/${project.id}`}>Open Project</Link>

              <Link
                to={`/projects/${project.id}/dashboard`}
                style={{ marginLeft: "16px" }}
              >
                Dashboard
              </Link>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default Projects;