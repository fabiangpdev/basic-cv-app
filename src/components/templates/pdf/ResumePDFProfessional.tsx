'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  nameContainer: { width: '30%' },
  name: { fontSize: 22, fontWeight: 'bold', lineHeight: 1.3 },
  contactContainer: { width: '30%', alignItems: 'flex-end' },
  contact: { fontSize: 10, color: '#64748b', marginBottom: 2 },
  twoColumn: { flexDirection: 'row', gap: 30 },
  column: { flex: 1 },
  section: { borderLeftWidth: 2, borderLeftColor: '#2563eb', paddingLeft: 12, marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e40af', marginBottom: 8, textTransform: 'uppercase' },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 10, color: '#64748b', marginTop: 2 },
  date: { fontSize: 9, color: '#94a3b8', marginBottom: 4 },
  description: { fontSize: 10, color: '#475569', marginTop: 4, lineHeight: 1.6 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 10, backgroundColor: '#dbeafe', padding: '3 8', borderRadius: 3, color: '#1e40af', borderWidth: 1, borderColor: '#bfdbfe' },
});

interface ResumePDFProfessionalProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFProfessional({ data }: ResumePDFProfessionalProps) {
  const { personalInfo, experiences, education, skills } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
          </View>
          <View style={styles.contactContainer}>
            {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.column}>
            {personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumen</Text>
                <Text style={styles.description}>{personalInfo.summary}</Text>
              </View>
            )}

            {experiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiencia</Text>
                {experiences.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 12 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.date}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={{ ...styles.description, marginTop: 4 }}>{exp.description}</Text>}
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
                  <View key={edu.id} style={{ marginBottom: 12 }}>
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution}</Text>
                    <Text style={styles.date}>{formatDate(edu.startDate, edu.endDate, false)}</Text>
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