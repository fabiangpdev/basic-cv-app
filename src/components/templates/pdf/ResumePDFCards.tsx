'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  header: { textAlign: 'center', marginBottom: 20 },
  name: { fontSize: 26, fontWeight: 'bold', color: '#047857', marginBottom: 6 },
  contactRow: { fontSize: 9, color: '#64748b', flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 10 },
  summaryBox: { backgroundColor: '#ecfdf5', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d1fae5', marginBottom: 15 },
  summaryTitle: { fontSize: 11, fontWeight: 'bold', color: '#065f46', marginBottom: 4, textTransform: 'uppercase' },
  summaryText: { fontSize: 10, color: '#475569' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#047857', marginBottom: 10, textTransform: 'uppercase' },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { width: '48%', borderWidth: 1, borderColor: '#a7f3d0', borderRadius: 6, padding: 10, backgroundColor: '#ffffff' },
  cardTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  cardCompany: { fontSize: 9, color: '#047857', marginTop: 2 },
  cardDate: { fontSize: 8, color: '#94a3b8', marginTop: 2 },
  cardDesc: { fontSize: 9, color: '#475569', marginTop: 4 },
  skillsBox: { backgroundColor: '#ecfdf5', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d1fae5', marginBottom: 15 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, padding: '4 10', backgroundColor: '#ffffff', color: '#047857', borderWidth: 1, borderColor: '#d1fae5', borderRadius: 12 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFCards({ data }: { data: ResumeData }) {
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
          <View style={styles.summaryBox} wrap={false}>
            <Text style={styles.summaryTitle}>Resumen Profesional</Text>
            <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience — cards in rows of 2, title with first row */}
        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
              <View style={styles.cardGrid}>
                {data.experiences.slice(0, 2).map((exp) => (
                  <View key={exp.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{exp.position}</Text>
                    <Text style={styles.cardCompany}>{exp.company}</Text>
                    <Text style={styles.cardDate}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={styles.cardDesc}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            </View>
            {data.experiences.length > 2 && (
              <View wrap={false} style={{ marginTop: 8 }}>
                <View style={styles.cardGrid}>
                  {data.experiences.slice(2).map((exp) => (
                    <View key={exp.id} style={styles.card}>
                      <Text style={styles.cardTitle}>{exp.position}</Text>
                      <Text style={styles.cardCompany}>{exp.company}</Text>
                      <Text style={styles.cardDate}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                      {exp.description && <Text style={styles.cardDesc}>{exp.description}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Educación</Text>
              <View style={styles.cardGrid}>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                    <Text style={styles.cardCompany}>{edu.institution}</Text>
                    <Text style={styles.cardDate}>{formatDate(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.skillsBox} wrap={false}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Proyectos</Text>
              <View style={styles.cardGrid}>
                {data.projects?.slice(0, 2).map((project) => (
                  <View key={project.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{project.name}</Text>
                    <Text style={styles.cardCompany}>{project.technologies}</Text>
                    <Text style={styles.cardDate}>{formatDate(project.startDate, project.endDate, project.current)}</Text>
                    {project.description && <Text style={styles.cardDesc}>{project.description}</Text>}
                    {project.url && <Text style={{ ...styles.cardDate, marginTop: 3 }}>{project.url}</Text>}
                  </View>
                ))}
              </View>
            </View>
            {(data.projects?.length ?? 0) > 2 && (
              <View wrap={false} style={{ marginTop: 8 }}>
                <View style={styles.cardGrid}>
                  {data.projects?.slice(2).map((project) => (
                    <View key={project.id} style={styles.card}>
                      <Text style={styles.cardTitle}>{project.name}</Text>
                      <Text style={styles.cardCompany}>{project.technologies}</Text>
                      <Text style={styles.cardDate}>{formatDate(project.startDate, project.endDate, project.current)}</Text>
                      {project.description && <Text style={styles.cardDesc}>{project.description}</Text>}
                      {project.url && <Text style={{ ...styles.cardDate, marginTop: 3 }}>{project.url}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

      </Page>
    </Document>
  );
}
