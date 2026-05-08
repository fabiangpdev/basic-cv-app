'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  header: { marginBottom: 15, paddingBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  contact: { fontSize: 9, color: '#444', textAlign: 'center' },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 5, marginTop: 3 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#666', paddingBottom: 4 },
  jobTitle: { fontSize: 10, fontWeight: 'bold' },
  company: { fontSize: 10, color: '#444' },
  date: { fontSize: 9, color: '#666', marginBottom: 3 },
  description: { fontSize: 9, color: '#333', marginTop: 4 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skill: { fontSize: 9, backgroundColor: '#f0f0f0', padding: '4 10', borderRadius: 3 },
});

interface ResumePDFClassicProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFClassic({ data }: ResumePDFClassicProps) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen Profesional</Text>
            <Text style={styles.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 12 }}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={{ ...styles.company, marginTop: 2 }}>{exp.company}</Text>
                <Text style={{ ...styles.date, marginTop: 2 }}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                {exp.description && <Text style={{ ...styles.description, marginTop: 4 }}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 10 }}>
                <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                <Text style={{ ...styles.company, marginTop: 2 }}>{edu.institution}</Text>
                <Text style={{ ...styles.date, marginTop: 2 }}>{formatDate(edu.startDate, edu.endDate, false)}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>

      {skills.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        </Page>
      )}
    </Document>
  );
}