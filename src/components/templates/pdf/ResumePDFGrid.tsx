'use client';

import './pdfFonts';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Roboto', lineHeight: 1.5 },
  headerBar: { backgroundColor: '#e11d48', padding: 20, marginHorizontal: -45, marginTop: -45, marginBottom: 16 },
  headerName: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', paddingHorizontal: 45 },
  headerContact: { fontSize: 9, color: '#fda4af', marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 45 },
  grid2: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  cell: { flex: 1, padding: 10, borderRadius: 6 },
  roseBg: { backgroundColor: '#fff1f2', borderWidth: 1, borderColor: '#fecdd3' },
  whiteBorder: { backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#fecdd3' },
  cellTitle: { fontSize: 11, fontWeight: 'bold', color: '#be123c', marginBottom: 6, textTransform: 'uppercase' },
  cellText: { fontSize: 9, color: '#475569' },
  expGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expItem: { borderLeftWidth: 2, borderLeftColor: '#fda4af', paddingLeft: 6, width: '47%', marginBottom: 4 },
  expTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  expCompany: { fontSize: 8, color: '#e11d48' },
  expDate: { fontSize: 7, color: '#94a3b8', marginTop: 1 },
  expDesc: { fontSize: 8, color: '#475569', marginTop: 2 },
  eduTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  eduSchool: { fontSize: 8, color: '#e11d48' },
  skillChip: { fontSize: 8, padding: '2 6', backgroundColor: '#ffffff', color: '#be123c', borderWidth: 1, borderColor: '#fecdd3', borderRadius: 3 },
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  fullCell: { padding: 10, borderRadius: 6, marginBottom: 10 },
});

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFGrid({ data }: { data: ResumeData }) {
  return (
    <Document title={`${data.personalInfo.firstName} ${data.personalInfo.lastName} - Currículum Vitae`} author={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`} subject="Currículum Vitae" language="es">
      <Page size="A4" style={styles.page}>

        {/* Header — edge to edge using negative margins */}
        <View style={styles.headerBar} wrap={false}>
          <Text style={styles.headerName}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.headerContact}>
            {data.personalInfo.email    && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone    && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Summary + Skills row */}
        <View style={[styles.grid2]} wrap={false}>
          <View style={[styles.cell, styles.roseBg]}>
            <Text style={styles.cellTitle}>Resumen</Text>
            {data.personalInfo.summary
              ? <Text style={styles.cellText}>{data.personalInfo.summary}</Text>
              : <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin resumen</Text>}
          </View>
          <View style={[styles.cell, styles.roseBg]}>
            <Text style={styles.cellTitle}>Habilidades</Text>
            {data.skills.length > 0
              ? <View style={styles.skillsWrap}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillChip}>{skill.name}</Text>
                  ))}
                </View>
              : <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin habilidades</Text>}
          </View>
        </View>

        {/* Experience — full width */}
        <View style={[styles.fullCell, styles.whiteBorder]} wrap={false}>
          <Text style={styles.cellTitle}>Experiencia</Text>
          {data.experiences.length > 0
            ? <View style={styles.expGrid}>
                {data.experiences.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expTitle}>{exp.position}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <Text style={styles.expDate}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={styles.expDesc}>{exp.description}</Text>}
                  </View>
                ))}
              </View>
            : <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin experiencia</Text>}
        </View>

        {/* Education — full width */}
        <View style={[styles.fullCell, styles.roseBg]} wrap={false}>
          <Text style={styles.cellTitle}>Educación</Text>
          {data.education.length > 0
            ? <View style={styles.expGrid}>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.expItem}>
                    <Text style={styles.eduTitle}>{edu.degree}{edu.field && ` en ${edu.field}`}</Text>
                    <Text style={styles.eduSchool}>{edu.institution}</Text>
                    <Text style={styles.expDate}>{formatDate(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                ))}
              </View>
            : <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin educación</Text>}
        </View>

        {/* Projects — full width */}
        {data.projects?.length > 0 && (
          <View style={[styles.fullCell, styles.whiteBorder]} wrap={false}>
            <Text style={styles.cellTitle}>Proyectos</Text>
            <View style={styles.expGrid}>
              {data.projects?.map((project) => (
                <View key={project.id} style={styles.expItem}>
                  <Text style={styles.expTitle}>{project.name}</Text>
                  <Text style={styles.expCompany}>{project.technologies}</Text>
                  <Text style={styles.expDate}>{formatDate(project.startDate, project.endDate, project.current)}</Text>
                  {project.description && <Text style={styles.expDesc}>{project.description}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
}
