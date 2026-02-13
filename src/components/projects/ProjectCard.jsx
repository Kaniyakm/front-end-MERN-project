/* ============================================================
   PHASE 3-4: PROJECT CARD COMPONENT
   ============================================================ */

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;
