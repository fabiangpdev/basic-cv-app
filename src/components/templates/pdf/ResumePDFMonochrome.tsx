'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  header: { borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 12, marginBottom: 15 },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#0f172a' },
  contactRow: { fontSize: 9, color: '#475569', marginTop: 6, flexDirection: 'row', gap: 15 },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#0f172a', marginBottom: 6 },
  content: { fontSize: 10, color: '#334155', lineHeight: 1.6 },
  jobRow: { marginBottom: 8 },
  jobTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  jobMeta: { fontSize: 9, color: '#475569' },
  jobDesc: { fontSize: 9, color: '#475569', marginTop: 2 },
  eduRow: { marginBottom: 6 },
  eduTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  eduMeta: { fontSize: 9, color: '#475569' },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, padding: '3 8', backgroundColor: '#e2e8f0', color: '#1e293b', borderRadius: 2 },
});

interface ResumePDFMonochromeProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFMonochrome({ data }: ResumePDFMonochromeProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumen</Text>
            <Text style={styles.content}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia</Text>
            {data.experiences.map((exp) => (
              <View key={exp.id} style={styles.jobRow}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobMeta}>{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                {exp.description && <Text style={styles.jobDesc}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.eduRow}>
                <Text style={styles.eduTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                <Text style={styles.eduMeta}>{edu.institution} | {formatDate(edu.startDate, edu.endDate, false)}</Text>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}