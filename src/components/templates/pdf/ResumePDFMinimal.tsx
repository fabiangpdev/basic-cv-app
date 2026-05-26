'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  header: { marginBottom: 20, alignItems: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', letterSpacing: 1, textAlign: 'center' },
  contactRow: { flexDirection: 'row', gap: 24, marginTop: 25, justifyContent: 'center' },
  contact: { fontSize: 10, color: '#64748b' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginBottom: 25 },
  twoColumn: { flexDirection: 'row', gap: 30 },
  column: { flex: 1 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#475569', marginBottom: 8 },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 10, color: '#64748b', marginTop: 2 },
  date: { fontSize: 9, color: '#94a3b8', marginBottom: 4 },
  description: { fontSize: 9, color: '#475569', lineHeight: 1.6 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, backgroundColor: '#f1f5f9', padding: '3 8', borderRadius: 3, color: '#475569' },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFMinimal({ data }: { data: ResumeData }) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - Currículum Vitae`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject="Currículum Vitae" language="es">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Two-column body */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>

            {/* Summary */}
            {personalInfo.summary && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>Sobre mí</Text>
                <Text style={styles.description}>{personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <View style={styles.section}>
                {experiences.map((exp, index) => (
                  <View key={exp.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>Experiencia</Text>}
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={{ ...styles.description, marginTop: 3 }}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

          </View>

          <View style={styles.column}>

            {/* Education */}
            {education.length > 0 && (
              <View style={styles.section}>
                {education.map((edu, index) => (
                  <View key={edu.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>Educación</Text>}
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}

          </View>
        </View>

        {/* Projects — full width below columns */}
        {data.projects?.length > 0 && (
          <View style={{ marginTop: 16 }}>
            <View style={styles.twoColumn}>
              {data.projects?.map((project, index) => (
                <View key={project.id} wrap={false} style={{ flex: 1, marginBottom: 10 }}>
                  {index === 0 && (
                    <Text style={{ ...styles.sectionTitle, marginBottom: 12 }}>Proyectos</Text>
                  )}
                  <Text style={styles.jobTitle}>{project.name}</Text>
                  <Text style={styles.company}>{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</Text>
                  {project.description && <Text style={{ ...styles.description, marginTop: 3 }}>{project.description}</Text>}
                  {project.url && <Text style={{ ...styles.date, marginTop: 2 }}>{project.url}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}
