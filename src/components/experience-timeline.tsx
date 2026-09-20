import { experiences } from "@/content/experience";

const monthYear = new Intl.DateTimeFormat("pt-BR", {
  month: "short", year: "numeric", timeZone: "UTC",
});

function formatDate(value: string) {
  return monthYear.format(new Date(`${value}-01T12:00:00Z`));
}

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {experiences.map((experience) => (
        <li key={`${experience.company}-${experience.startDate}`}>
          <p className="timeline-period">
            <time dateTime={experience.startDate}>{formatDate(experience.startDate)}</time>
            <span> — </span>
            {experience.endDate ? (
              <time dateTime={experience.endDate}>{formatDate(experience.endDate)}</time>
            ) : (
              <span>Atual</span>
            )}
          </p>
          <div>
            <h3>{experience.role}</h3>
            <p className="timeline-company">{experience.company}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
