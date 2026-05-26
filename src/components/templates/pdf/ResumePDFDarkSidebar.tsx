'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, resumeLabels } from '@/lib/resumeLabels';

const styles = StyleSheet.create({
  page: { padding: 0, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  container: { flexDirection: 'row', height: '100%' },
  sidebar: { width: '30%', backgroundColor: '#1e293b', padding: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  sidebarName: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', lineHeight: 1.3, marginBottom: 18 },
  sidebarLabel: { fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  sidebarText: { fontSize: 9, color: '#cbd5e1', marginBottom: 12 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  skill: { fontSize: 8, padding: '3 6', backgroundColor: '#334155', color: '#e2e8f0', borderRadius: 3 },
  content: { flex: 1, padding: 24 },
  section: { marginBottom: 14 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 3, marginBottom: 8, textTransform: 'uppercase' },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  meta: { fontSize: 9, color: '#64748b', marginTop: 2 },
  description: { fontSize: 9, color: '#475569', marginTop: 3 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFDarkSidebar({ data, lang }: { data: ResumeData; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - ${L.docSubject}`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject={L.docSubject} language={lang}>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.container}>

          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Text style={styles.sidebarName}>{data.personalInfo.firstName}{'\n'}{data.personalInfo.lastName}</Text>

            {data.personalInfo.email && (
              <>
                <Text style={styles.sidebarLabel}>Email</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
              </>
            )}
            {data.personalInfo.phone && (
              <>
                <Text style={styles.sidebarLabel}>{L.phone}</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
              </>
            )}
            {data.personalInfo.location && (
              <>
                <Text style={styles.sidebarLabel}>{L.location}</Text>
                <Text style={styles.sidebarText}>{data.personalInfo.location}</Text>
              </>
            )}

            {data.skills.length > 0 && (
              <>
                <Text style={{ ...styles.sidebarLabel, marginTop: 6 }}>{L.skills}</Text>
                <View style={styles.skillsWrap}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Main content */}
          <View style={styles.content}>
            {data.personalInfo.summary && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>{L.summary}</Text>
                <Text style={{ fontSize: 10, color: '#475569' }}>{data.personalInfo.summary}</Text>
              </View>
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
                    <Text style={styles.meta}>{edu.institution} · {formatDate(edu.startDate, edu.endDate, false, L.present)}</Text>
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
                    {project.url && <Text style={{ ...styles.meta, marginTop: 2 }}>{project.url}</Text>}
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
