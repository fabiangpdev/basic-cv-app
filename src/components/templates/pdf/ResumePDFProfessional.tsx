'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, resumeLabels } from '@/lib/resumeLabels';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', lineHeight: 1.3 },
  contactRight: { alignItems: 'flex-end' },
  contact: { fontSize: 9, color: '#64748b', marginBottom: 2 },
  twoCol: { flexDirection: 'row', gap: 24 },
  col: { flex: 1 },
  section: { borderLeftWidth: 2, borderLeftColor: '#3b82f6', paddingLeft: 10, marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e40af', textTransform: 'uppercase', marginBottom: 6 },
  jobTitle: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  meta: { fontSize: 9, color: '#64748b', marginTop: 2 },
  description: { fontSize: 9, color: '#475569', marginTop: 3, lineHeight: 1.6 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skill: { fontSize: 9, padding: '3 8', backgroundColor: '#eff6ff', color: '#1d4ed8', borderWidth: 1, borderColor: '#bfdbfe', borderRadius: 3 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFProfessional({ data, lang }: { data: ResumeData; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - ${L.docSubject}`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject={L.docSubject} language={lang}>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.headerRow} wrap={false}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contactRight}>
            {data.personalInfo.email    && <Text style={styles.contact}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone    && <Text style={styles.contact}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contact}>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Two columns */}
        <View style={styles.twoCol}>
          <View style={styles.col}>

            {/* Summary */}
            {data.personalInfo.summary && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>{L.summary}</Text>
                <Text style={styles.description}>{data.personalInfo.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {data.experiences.length > 0 && (
              <View style={styles.section}>
                {data.experiences.map((exp, index) => (
                  <View key={exp.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>{L.experience}</Text>}
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    <Text style={styles.meta}>{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</Text>
                    {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            )}

          </View>

          <View style={styles.col}>

            {/* Education */}
            {data.education.length > 0 && (
              <View style={styles.section}>
                {data.education.map((edu, index) => (
                  <View key={edu.id} wrap={false} style={{ marginBottom: 10 }}>
                    {index === 0 && <Text style={styles.sectionTitle}>{L.education}</Text>}
                    <Text style={styles.jobTitle}>{edu.degree}{edu.field && ` ${L.inField} ${edu.field}`}</Text>
                    <Text style={styles.meta}>{edu.institution} | {formatDate(edu.startDate, edu.endDate, false, L.present)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <View style={styles.section} wrap={false}>
                <Text style={styles.sectionTitle}>{L.skills}</Text>
                <View style={styles.skillsWrap}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
                  ))}
                </View>
              </View>
            )}

          </View>
        </View>

        {/* Projects — full width below columns */}
        {data.projects?.length > 0 && (
          <View style={{ ...styles.section, marginTop: 6 }}>
            {data.projects?.map((project, index) => (
              <View key={project.id} wrap={false} style={{ marginBottom: 8 }}>
                {index === 0 && <Text style={styles.sectionTitle}>{L.projects}</Text>}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                  <View style={{ flex: 1, minWidth: 200 }}>
                    <Text style={styles.jobTitle}>{project.name}</Text>
                    <Text style={styles.meta}>{project.technologies} | {formatDate(project.startDate, project.endDate, project.current, L.present)}</Text>
                    {project.description && <Text style={styles.description}>{project.description}</Text>}
                    {project.url && <Text style={{ ...styles.meta, marginTop: 2 }}>{project.url}</Text>}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
