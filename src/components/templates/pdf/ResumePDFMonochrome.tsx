'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, resumeLabels } from '@/lib/resumeLabels';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  header: { borderBottomWidth: 2, borderBottomColor: '#0f172a', paddingBottom: 12, marginBottom: 15 },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, color: '#0f172a' },
  contactRow: { fontSize: 9, color: '#475569', marginTop: 10, flexDirection: 'row', gap: 15 },
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

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFMonochrome({ data, lang }: { data: ResumeData; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - ${L.docSubject}`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject={L.docSubject} language={lang}>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{L.summary}</Text>
            <Text style={styles.content}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <View style={styles.section}>
            {data.experiences.map((exp, index) => (
              <View key={exp.id} wrap={false} style={styles.jobRow}>
                {index === 0 && <Text style={styles.sectionTitle}>{L.experience}</Text>}
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.jobMeta}>{exp.company} | {formatDate(exp.startDate, exp.endDate, exp.current, L.present)}</Text>
                {exp.description && <Text style={styles.jobDesc}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            {data.education.map((edu, index) => (
              <View key={edu.id} wrap={false} style={styles.eduRow}>
                {index === 0 && <Text style={styles.sectionTitle}>{L.education}</Text>}
                <Text style={styles.eduTitle}>{edu.degree} {edu.field && `${L.inField} ${edu.field}`}</Text>
                <Text style={styles.eduMeta}>{edu.institution} | {formatDate(edu.startDate, edu.endDate, false, L.present)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{L.skills}</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            {data.projects?.map((project, index) => (
              <View key={project.id} wrap={false} style={styles.jobRow}>
                {index === 0 && <Text style={styles.sectionTitle}>{L.projects}</Text>}
                <Text style={styles.jobTitle}>{project.name}</Text>
                <Text style={styles.jobMeta}>{project.technologies} | {formatDate(project.startDate, project.endDate, project.current, L.present)}</Text>
                {project.description && <Text style={styles.jobDesc}>{project.description}</Text>}
                {project.url && <Text style={{ ...styles.jobMeta, marginTop: 2 }}>{project.url}</Text>}
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
