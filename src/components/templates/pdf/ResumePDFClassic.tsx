'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { Language, resumeLabels } from '@/lib/resumeLabels';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  name: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 10, marginBottom: 4 },
  contact: { fontSize: 9, color: '#64748b' },
  divider: { height: 1, backgroundColor: '#cbd5e1', marginVertical: 12 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, color: '#334155', borderBottomWidth: 1, borderBottomColor: '#cbd5e1', paddingBottom: 3, marginBottom: 8 },
  jobTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  meta: { fontSize: 9, color: '#64748b', marginTop: 2 },
  description: { fontSize: 9, color: '#475569', marginTop: 3, lineHeight: 1.6 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 9, backgroundColor: '#f1f5f9', color: '#475569', padding: '3 8', borderRadius: 3 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean, present: string): string {
  if (current) return `${startDate} - ${present}`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFClassic({ data, lang }: { data: ResumeData; lang: Language }) {
  const L = resumeLabels[lang];
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - ${L.docSubject}`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject={L.docSubject} language={lang}>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View wrap={false}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.contactRow}>
            {data.personalInfo.email    && <Text style={styles.contact}>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone    && <Text style={styles.contact}>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contact}>{data.personalInfo.location}</Text>}
          </View>
          <View style={styles.divider} />
        </View>

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
                <Text style={styles.meta}>{edu.institution} · {formatDate(edu.startDate, edu.endDate, edu.current, L.present)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{L.skills}</Text>
            <View style={styles.skillsContainer}>
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

      </Page>
    </Document>
  );
}
