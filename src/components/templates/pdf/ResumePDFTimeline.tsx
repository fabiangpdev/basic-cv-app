'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  header: { marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#b45309', marginBottom: 8 },
  contactRow: { fontSize: 9, color: '#64748b', flexDirection: 'row', justifyContent: 'center', gap: 15 },
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

interface ResumePDFTimelineProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFTimeline({ data }: ResumePDFTimelineProps) {
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
            <Text style={{ fontSize: 10, color: '#475569' }}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia</Text>
            <View style={styles.timelineContainer}>
              {data.experiences.map((exp) => (
                <View key={exp.id} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                  {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educación</Text>
            <View style={styles.timelineContainer}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <Text style={styles.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                  <Text style={styles.company}>{edu.institution} · {formatDate(edu.startDate, edu.endDate, false)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
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