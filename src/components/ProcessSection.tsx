import type { ProcessStep, SectionHeader } from '../lib/types';

interface ProcessSectionProps {
  steps: ProcessStep[];
  header: SectionHeader;
}

export default function ProcessSection({ steps, header }: ProcessSectionProps) {
  return (
    <section id="process" className="process section">
      <div className="container section-inner">
        <div className="section-header reveal">
          <h2>{header.title}</h2>
          <p>{header.subtitle}</p>
        </div>
        <div className="process-timeline">
          <div className="timeline-line" />
          {steps.map((step) => (
            <div key={step.id} className="process-step reveal">
              <div className="step-icon">
                <i className={step.icon} />
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
