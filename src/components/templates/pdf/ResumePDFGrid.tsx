'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
  page: { padding: 45, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  headerBar: { backgroundColor: '#e11d48', padding: 20, marginLeft: -25, marginTop: -25, marginBottom: 15, paddingRight: 25 },
  headerName: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  headerContact: { fontSize: 9, color: '#fda4af', marginTop: 4, flexDirection: 'row', gap: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cell: { width: '48%', padding: 10, borderRadius: 6 },
  summaryCell: { backgroundColor: '#fff1f2' },
  skillsCell: { backgroundColor: '#fff1f2' },
  expCell: { borderWidth: 2, borderColor: '#fecdd3', borderRadius: 6 },
  eduCell: { backgroundColor: '#fff1f2' },
  cellTitle: { fontSize: 11, fontWeight: 'bold', color: '#be123c', marginBottom: 6, textTransform: 'uppercase' },
  cellText: { fontSize: 9, color: '#475569' },
  expGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  expItem: { borderLeftWidth: 2, borderLeftColor: '#fda4af', paddingLeft: 6, width: '45%' },
  expTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  expCompany: { fontSize: 8, color: '#e11d48' },
  expDate: { fontSize: 7, color: '#94a3b8', marginTop: 2 },
  eduItem: { marginBottom: 6 },
  eduTitle: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  eduSchool: { fontSize: 8, color: '#e11d48' },
  eduDate: { fontSize: 7, color: '#94a3b8', marginTop: 2 },
  skillChip: { fontSize: 8, padding: '2 6', backgroundColor: '#ffffff', color: '#be123c', borderWidth: 1, borderColor: '#fecdd3', borderRadius: 3 },
});

interface ResumePDFGridProps {
  data: ResumeData;
}

function formatDate(startDate: string, endDate: string | undefined, current: boolean): string {
  if (current) return `${startDate} - Actual`;
  return endDate ? `${startDate} - ${endDate}` : startDate;
}

export function ResumePDFGrid({ data }: ResumePDFGridProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.headerName}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <View style={styles.headerContact}>
            {data.personalInfo.email && <Text>{data.personalInfo.email}</Text>}
            {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text>{data.personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={[styles.cell, styles.summaryCell]}>
            <Text style={styles.cellTitle}>Resumen</Text>
            {data.personalInfo.summary ? (
              <Text style={styles.cellText}>{data.personalInfo.summary}</Text>
            ) : (
              <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin resumen</Text>
            )}
          </View>

          <View style={[styles.cell, styles.skillsCell]}>
            <Text style={styles.cellTitle}>Habilidades</Text>
            {data.skills.length > 0 ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillChip}>{skill.name}</Text>
                ))}
              </View>
            ) : (
              <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin habilidades</Text>
            )}
          </View>

          <View style={[styles.cell, styles.expCell, { width: '100%' }]}>
            <Text style={styles.cellTitle}>Experiencia</Text>
            <View style={styles.expGrid}>
              {data.experiences.length > 0 ? (
                data.experiences.map((exp) => (
                  <View key={exp.id} style={styles.expItem}>
                    <Text style={styles.expTitle}>{exp.position}</Text>
                    <Text style={styles.expCompany}>{exp.company}</Text>
                    <Text style={styles.expDate}>{formatDate(exp.startDate, exp.endDate, exp.current)}</Text>
                    {exp.description && <Text style={{ ...styles.cellText, fontSize: 8, marginTop: 3 }}>{exp.description}</Text>}
                  </View>
                ))
              ) : (
                <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin experiencia</Text>
              )}
            </View>
          </View>

          <View style={[styles.cell, styles.eduCell, { width: '100%' }]}>
            <Text style={styles.cellTitle}>Educación</Text>
            <View style={styles.expGrid}>
              {data.education.length > 0 ? (
                data.education.map((edu) => (
                  <View key={edu.id} style={styles.expItem}>
                    <Text style={styles.eduTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                    <Text style={styles.eduSchool}>{edu.institution}</Text>
                    <Text style={styles.eduDate}>{formatDate(edu.startDate, edu.endDate, false)}</Text>
                  </View>
                ))
              ) : (
                <Text style={{ ...styles.cellText, color: '#94a3b8' }}>Sin educación</Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}