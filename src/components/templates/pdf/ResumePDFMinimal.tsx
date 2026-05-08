'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
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

interface ResumePDFMinimalProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFMinimal({ data }: ResumePDFMinimalProps) {
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

        <View style={styles.divider} />

        <View style={styles.twoColumn}>
          <View style={styles.column}>
            {personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sobre mí</Text>
                <Text style={styles.description}>{personalInfo.summary}</Text>
              </View>
            )}

            {experiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiencia</Text>
                {experiences.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={{ ...styles.description, marginTop: 3 }}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.column}>
            {education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Educación</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            )}

            {skills.length > 0 && (
              <View style={styles.section}>
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
      </Page>
    </Document>
  );
}