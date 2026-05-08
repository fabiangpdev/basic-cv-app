'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  container: { flexDirection: 'row', height: '100%' },
  sidebar: { width: '30%', backgroundColor: '#1a1a2e', padding: 20, height: '100%' },
  sidebarText: { color: '#fff', fontSize: 10 },
  sidebarTitle: { color: '#888', fontSize: 9, textTransform: 'uppercase', marginBottom: 8 },
  main: { width: '70%', padding: 20 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 10 },
  jobTitle: { fontSize: 10, fontWeight: 'bold' },
  company: { fontSize: 10, color: '#444', marginTop: 3 },
  description: { fontSize: 9, color: '#333', marginTop: 2 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, color: '#ccc', backgroundColor: '#2a2a4a', padding: '3 8', borderRadius: 2 },
});

interface ResumePDFModernProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFModern({ data }: ResumePDFModernProps) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <View style={styles.sidebar}>
            <Text style={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
            <View style={{ marginTop: 25 }}>
              <Text style={styles.sidebarTitle}>Contacto</Text>
              {personalInfo.email && <Text style={{ ...styles.sidebarText, marginBottom: 4 }}>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={{ ...styles.sidebarText, marginBottom: 4 }}>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={styles.sidebarText}>{personalInfo.location}</Text>}
            </View>
            {skills.length > 0 && (
              <View style={{ marginTop: 25 }}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {skills.map((skill) => (
                    <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
          <View style={styles.main}>
            {personalInfo.summary && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 10, color: '#444', lineHeight: 1.6 }}>{personalInfo.summary}</Text>
              </View>
            )}
            {experiences.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Experiencia</Text>
                {experiences.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 12 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                  </View>
                ))}
              </View>
            )}
            {education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Educación</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}