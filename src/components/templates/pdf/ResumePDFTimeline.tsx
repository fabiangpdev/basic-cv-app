'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  header: { marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#b45309', marginBottom: 8 },
  contactRow: { fontSize: 9, color: '#64748b', flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 10 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#b45309', marginBottom: 8, textTransform: 'uppercase' },
  timelineContainer: { borderLeftWidth: 2, borderLeftColor: '#f59e0b', marginLeft: 10, paddingLeft: 15 },
  timelineItem: { marginBottom: 12, position: 'relative' },
  timelineDot: { position: 'absolute', left: -19, top: 3, width: 8, height: 8, borderRadius: 4, backgroundColor: '#fef3c7', borderWidth: 2, borderColor: '#f59e0b' },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 10, color: '#b45309', marginTop: 2 },
  date: { fontSize: 9, color: '#94a3b8', marginTop: 2 },
  description: { fontSize: 9, color: '#475569', marginTop: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, backgroundColor: '#fffbeb', padding: '3 8', borderRadius: 3, color: '#b45309', borderWidth: 1, borderColor: '#fde68a' },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFTimeline({ data }: { data: ResumeData }) {
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - Currículum Vitae`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject="Currículum Vitae" language="es">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Resumen</Text>
            <Text style={{ fontSize: 10, color: '#475569' }}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience — timeline items, title inside first */}
        {data.experiences.length > 0 && (
          <View style={styles.section}>
            {data.experiences.map((exp, index) => (
              <View key={exp.id} wrap={false}>
                {index === 0 && <Text style={styles.sectionTitle}>Experiencia</Text>}
                <View style={styles.timelineContainer}>
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            {data.education.map((edu, index) => (
              <View key={edu.id} wrap={false}>
                {index === 0 && <Text style={styles.sectionTitle}>Educación</Text>}
                <View style={styles.timelineContainer}>
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution} · {formatDate(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            {data.projects?.map((project, index) => (
              <View key={project.id} wrap={false}>
                {index === 0 && <Text style={styles.sectionTitle}>Proyectos</Text>}
                <View style={styles.timelineContainer}>
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    <Text style={styles.jobTitle}>{project.name}</Text>
                    <Text style={styles.company}>{project.technologies} · {formatDate(project.startDate, project.endDate, project.current)}</Text>
                    {project.description && <Text style={styles.description}>{project.description}</Text>}
                    {project.url && <Text style={styles.date}>{project.url}</Text>}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
