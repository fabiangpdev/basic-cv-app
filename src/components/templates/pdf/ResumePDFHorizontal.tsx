'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  header: { backgroundColor: '#0891b2', padding: 25, marginLeft: -25, marginTop: -25, marginBottom: 15, paddingRight: 25, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
  headerName: { fontSize: 26, fontWeight: 'bold', color: '#ffffff' },
  headerContact: { fontSize: 9, color: '#a5f3fc', marginTop: 4, flexDirection: 'row', gap: 15 },
  summaryBox: { padding: 10, backgroundColor: '#ecfeff', borderLeftWidth: 4, borderLeftColor: '#06b6d4', marginBottom: 15 },
  summaryText: { fontSize: 10, color: '#334155' },
  columns: { flexDirection: 'row', gap: 15 },
  column: { flex: 1 },
  colTitle: { fontSize: 11, fontWeight: 'bold', color: '#0e7490', marginBottom: 8, textTransform: 'uppercase' },
  colItem: { marginBottom: 8 },
  colItemTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  colItemMeta: { fontSize: 9, color: '#475569' },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skill: { fontSize: 8, padding: '2 6', backgroundColor: '#cffafe', color: '#0e7490', borderRadius: 3 },
  empty: { fontSize: 9, color: '#94a3b8' },
});

interface ResumePDFHorizontalProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFHorizontal({ data }: ResumePDFHorizontalProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.headerContact}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {data.personalInfo.summary && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
          </View>
        )}

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.colTitle}>Experiencia</Text>
            {data.experiences.length > 0 ? (
              data.experiences.slice(0, 3).map((exp) => (
                <View key={exp.id} style={styles.colItem}>
                  <Text style={styles.colItemTitle}>{exp.position}</Text>
                  <Text style={styles.colItemMeta}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.empty}>Sin experiencia</Text>
            )}
          </View>

          <View style={styles.column}>
            <Text style={styles.colTitle}>Educación</Text>
            {data.education.length > 0 ? (
              data.education.slice(0, 3).map((edu) => (
                <View key={edu.id} style={styles.colItem}>
                  <Text style={styles.colItemTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                  <Text style={styles.colItemMeta}>{edu.institution}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.empty}>Sin educación</Text>
            )}
          </View>

          <View style={styles.column}>
            <Text style={styles.colTitle}>Habilidades</Text>
            {data.skills.length > 0 ? (
              <View style={styles.skillsWrap}>
                {data.skills.slice(0, 8).map((skill) => (
                  <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.empty}>Sin habilidades</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}