'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  main: { flexDirection: 'row' },
  sidebar: { width: '30%', backgroundColor: '#1e293b', padding: 25, marginLeft: -25, marginTop: -25, marginBottom: -25, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  content: { width: '70%', paddingLeft: 20 },
  sidebarName: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginBottom: 20, lineHeight: 1.3 },
  sidebarSection: { marginBottom: 20 },
  sidebarLabel: { fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 },
  sidebarText: { fontSize: 9, color: '#cbd5e1' },
  sidebarSkills: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  sidebarSkill: { fontSize: 8, padding: '3 6', backgroundColor: '#334155', color: '#e2e8f0', borderRadius: 3 },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 4, marginBottom: 8, textTransform: 'uppercase' },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  company: { fontSize: 9, color: '#64748b' },
  date: { fontSize: 9, color: '#94a3b8', marginBottom: 3 },
  description: { fontSize: 9, color: '#475569', marginTop: 3 },
});

interface ResumePDFDarkSidebarProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFDarkSidebar({ data }: ResumePDFDarkSidebarProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View style={styles.sidebar}>
            <Text style={styles.sidebarName}>{data.personalInfo.firstName}{'\n'}{data.personalInfo.lastName}</Text>
            
            {data.personalInfo.email && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarLabel}>Email</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
              </View>
            )}
            {data.personalInfo.phone && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarLabel}>Teléfono</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
              </View>
            )}
            {data.personalInfo.location && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarLabel}>Ubicación</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>
              </View>
            )}

            {data.skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarLabel}>Habilidades</Text>
                <View style={styles.sidebarSkills}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.sidebarSkill}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.content}>
            {data.personalInfo.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumen</Text>
                <Text style={{ fontSize: 10, color: '#475569' }}>{data.personalInfo.summary}</Text>
              </View>
            )}

            {data.experiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiencia</Text>
                {data.experiences.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 10 }}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {data.education.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Educación</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 8 }}>
                    <Text style={styles.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                    <Text style={styles.company}>{edu.institution} · {formatDate(edu.startDate, edu.endDate, false)}</Text>
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