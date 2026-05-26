'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, resumeLabels } from '@/lib/resumeLabels';

const styles = StyleSheet.create({
  page: { padding: 0, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  container: { flexDirection: 'row', height: '100%' },
  sidebar: { width: '28%', backgroundColor: '#0f172a', padding: 24 },
  name: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', lineHeight: 1.3, marginBottom: 20 },
  sidebarLabel: { fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  sidebarText: { fontSize: 9, color: '#e2e8f0', marginBottom: 3 },
  sidebarDivider: { height: 1, backgroundColor: '#1e293b', marginVertical: 16 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skill: { fontSize: 8, color: '#cbd5e1', backgroundColor: '#1e293b', padding: '3 6', borderRadius: 2 },
  main: { flex: 1, padding: 24, backgroundColor: '#ffffff' },
  summary: { fontSize: 10, color: '#475569', lineHeight: 1.6, marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#0f172a', marginBottom: 8, textTransform: 'uppercase' },
  jobTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  meta: { fontSize: 9, color: '#64748b', marginTop: 2 },
  description: { fontSize: 9, color: '#475569', marginTop: 2 },
  section: { marginBottom: 16 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFModern({ data, lang }: { data: ResumeData; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - ${L.docSubject}`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject={L.docSubject} language={lang}>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.container}>

          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.name}>{data.personalInfo.firstName}{'\n'}{data.personalInfo.lastName}</Text>

            <Text style={styles.sidebarLabel}>{L.contact}</Text>
            {data.personalInfo.email    && <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone    && <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>}

            {data.skills.length > 0 && (
              <>
                <View style={styles.sidebarDivider} />
                <Text style={styles.sidebarLabel}>{L.skills}</Text>
                <View style={styles.skillsWrap}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Main content */}
          <View style={styles.main}>
            {data.personalInfo.summary && (
              <Text style={styles.summary}>{data.personalInfo.summary}</Text>
            )}

            {/* Experience */}
            {data.experiences.length > 0 && (
              <View style={styles.section}>
                {data.experiences.map((exp, index) => (
                  <View key={exp.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>{L.experience}</Text>}
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.meta}>{exp.company} · {formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <View style={styles.section}>
                {data.education.map((edu, index) => (
                  <View key={edu.id} wrap={false} style={{ marginBottom: 8 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>{L.education}</Text>}
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` ${L.inField} ${edu.field}`}</Text>
                    <Text style={styles.meta}>{edu.institution}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
              <View style={styles.section}>
                {data.projects?.map((project, index) => (
                  <View key={project.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>{L.projects}</Text>}
                    <Text style={styles.jobTitle}>{project.name}</Text>
                    <Text style={styles.meta}>{project.technologies} · {formatDate(project.startDate, project.endDate, project.current, L.present)}</Text>
                    {project.description && <Text style={styles.description}>{project.description}</Text>}
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
