'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5, backgroundColor: '#ffffff' },

  header: { backgroundColor: '#0891b2', paddingHorizontal: 40, paddingVertical: 22 },
  headerName: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  headerContact: { fontSize: 9, color: '#cffafe', marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

  summaryBand: { backgroundColor: '#ecfeff', borderBottomColor: '#a5f3fc', borderBottomWidth: 1, paddingHorizontal: 40, paddingVertical: 12 },
  summaryText: { fontSize: 10, color: '#475569', lineHeight: 1.6 },

  band: { paddingHorizontal: 40, paddingVertical: 14, borderBottomColor: '#f1f5f9', borderBottomWidth: 1 },
  bandAlt: { paddingHorizontal: 40, paddingVertical: 14, backgroundColor: '#f8fafc', borderBottomColor: '#f1f5f9', borderBottomWidth: 1 },

  sectionTitle: { fontSize: 9, fontWeight: 'bold', color: '#0e7490', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  gridItem: { width: '50%', paddingRight: 20, marginBottom: 8 },
  itemTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  itemSub: { fontSize: 9, color: '#0891b2', fontWeight: 'bold' },
  itemMeta: { fontSize: 9, color: '#94a3b8' },
  itemDesc: { fontSize: 9, color: '#64748b', marginTop: 2, lineHeight: 1.5 },

  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skill: { fontSize: 9, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#cffafe', color: '#0e7490', borderRadius: 10 },

  langWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  lang: { fontSize: 9, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: '#a5f3fc', color: '#475569', borderRadius: 10 },

  bottomGrid: { flexDirection: 'row', gap: 20 },
  bottomCol: { flex: 1 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFHorizontal({ data }: { data: ResumeData }) {
  const hasBottom = data.certifications.length > 0 || data.languages.length > 0;

  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - Currículum Vitae`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject="Currículum Vitae" language="es">
      <Page size="A4" style={styles.page}>

        {/* Header band */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.headerName}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.headerContact}>
            {data.personalInfo.email    && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone    && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
            {data.personalInfo.linkedin && <Text>{data.personalInfo.linkedin}</Text>}
          </View>
        </View>

        {/* Summary band */}
        {data.personalInfo.summary && (
          <View style={styles.summaryBand} wrap={false}>
            <Text style={styles.summaryText}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience band — rows of 2 kept together */}
        {data.experiences.length > 0 && (
          <View style={styles.band}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Experiencia</Text>
              <View style={styles.grid2}>
                {data.experiences.slice(0, 2).map((exp) => (
                  <View key={exp.id} style={styles.gridItem}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSub}>{exp.company}</Text>
                    <Text style={styles.itemMeta}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
            {data.experiences.length > 2 && (
              <View wrap={false} style={{ marginTop: 4 }}>
                <View style={styles.grid2}>
                  {data.experiences.slice(2).map((exp) => (
                    <View key={exp.id} style={styles.gridItem}>
                      <Text style={styles.itemTitle}>{exp.position}</Text>
                      <Text style={styles.itemSub}>{exp.company}</Text>
                      <Text style={styles.itemMeta}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                      {exp.description ? <Text style={styles.itemDesc}>{exp.description}</Text> : null}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Education band */}
        {data.education.length > 0 && (
          <View style={styles.bandAlt} wrap={false}>
            <Text style={styles.sectionTitle}>Educación</Text>
            <View style={styles.grid2}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.gridItem}>
                  <Text style={styles.itemTitle}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</Text>
                  <Text style={styles.itemSub}>{edu.institution}</Text>
                  <Text style={styles.itemMeta}>{formatDate(edu.startDate, edu.endDate, edu.current)}</Text>
                  {edu.gpa ? <Text style={styles.itemMeta}>GPA: {edu.gpa}</Text> : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills band */}
        {data.skills.length > 0 && (
          <View style={styles.band} wrap={false}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsWrap}>
              {data.skills.map((skill) => (
                <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects band */}
        {data.projects?.length > 0 && (
          <View style={styles.bandAlt}>
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Proyectos</Text>
              <View style={styles.grid2}>
                {data.projects?.slice(0, 2).map((project) => (
                  <View key={project.id} style={styles.gridItem}>
                    <Text style={styles.itemTitle}>{project.name}</Text>
                    <Text style={styles.itemSub}>{project.technologies}</Text>
                    <Text style={styles.itemMeta}>{formatDate(project.startDate, project.endDate, project.current)}</Text>
                    {project.description ? <Text style={styles.itemDesc}>{project.description}</Text> : null}
                    {project.url ? <Text style={{ ...styles.itemMeta, marginTop: 2 }}>{project.url}</Text> : null}
                  </View>
                ))}
              </View>
            </View>
            {(data.projects?.length ?? 0) > 2 && (
              <View wrap={false} style={{ marginTop: 4 }}>
                <View style={styles.grid2}>
                  {data.projects?.slice(2).map((project) => (
                    <View key={project.id} style={styles.gridItem}>
                      <Text style={styles.itemTitle}>{project.name}</Text>
                      <Text style={styles.itemSub}>{project.technologies}</Text>
                      <Text style={styles.itemMeta}>{formatDate(project.startDate, project.endDate, project.current)}</Text>
                      {project.description ? <Text style={styles.itemDesc}>{project.description}</Text> : null}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Certifications + Languages band */}
        {hasBottom && (
          <View style={styles.band} wrap={false}>
            <View style={styles.bottomGrid}>
              {data.certifications.length > 0 && (
                <View style={styles.bottomCol}>
                  <Text style={styles.sectionTitle}>Certificaciones</Text>
                  {data.certifications.map((cert) => (
                    <View key={cert.id} style={{ marginBottom: 6 }}>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      <Text style={styles.itemMeta}>{cert.issuer} · {cert.date}</Text>
                    </View>
                  ))}
                </View>
              )}
              {data.languages.length > 0 && (
                <View style={styles.bottomCol}>
                  <Text style={styles.sectionTitle}>Idiomas</Text>
                  <View style={styles.langWrap}>
                    {data.languages.map((lang) => (
                      <Text key={lang.id} style={styles.lang}>{lang.language} · {lang.level}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}
