'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';
import { TemplateType } from '@/store/resumeStore';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' },
  ],
});

const baseStyles = {
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', lineHeight: 1.5 },
  name: { fontSize: 18, fontWeight: 'bold' as const, marginBottom: 5 },
  contact: { fontSize: 9, color: '#444' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold' as const, marginBottom: 8 },
  jobTitle: { fontSize: 10, fontWeight: 'bold' as const },
  company: { fontSize: 10, color: '#444' },
  date: { fontSize: 9, color: '#666', marginBottom: 3 },
  description: { fontSize: 9, color: '#333', marginTop: 2 },
  skill: { fontSize: 9, backgroundColor: '#f0f0f0', padding: '3 8', borderRadius: 3 },
};

const styles: Record<TemplateType, any> = {
  classic: StyleSheet.create({
    page: { ...baseStyles.page, padding: 45 },
    header: { marginBottom: 15, borderBottomWidth: 2, borderBottomColor: '#333', paddingBottom: 10 },
    name: { ...baseStyles.name, textAlign: 'center', fontSize: 20 },
    contact: { ...baseStyles.contact, textAlign: 'center' },
    contactRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 3 },
    section: { marginTop: 15 },
    sectionTitle: { ...baseStyles.sectionTitle, borderBottomWidth: 1, borderBottomColor: '#666', paddingBottom: 3 },
    jobTitle: baseStyles.jobTitle,
    company: baseStyles.company,
    date: baseStyles.date,
    description: baseStyles.description,
    skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
    skill: baseStyles.skill,
  }),
  modern: StyleSheet.create({
    page: { ...baseStyles.page },
    container: { flexDirection: 'row' },
    sidebar: { width: '30%', backgroundColor: '#1a1a2e', padding: 15, height: '100%' },
    sidebarText: { color: '#fff', fontSize: 9 },
    sidebarTitle: { color: '#888', fontSize: 8, textTransform: 'uppercase' as const, marginBottom: 5 },
    main: { width: '70%', padding: 15 },
    name: { ...baseStyles.name, color: '#fff', fontSize: 16, marginBottom: 10 },
    jobTitle: baseStyles.jobTitle,
    company: baseStyles.company,
    date: baseStyles.date,
    description: baseStyles.description,
    sectionTitle: { ...baseStyles.sectionTitle, color: '#1a1a2e' },
    skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
    skill: { fontSize: 8, color: '#ccc', backgroundColor: '#2a2a4a', padding: '2 6', borderRadius: 2 },
  }),
  minimal: StyleSheet.create({
    page: { ...baseStyles.page, padding: 50 },
    header: { marginBottom: 20 },
    name: { ...baseStyles.name, fontSize: 22, fontWeight: 'normal' as const, letterSpacing: 1 },
    contactRow: { flexDirection: 'row', gap: 15, marginTop: 5 },
    contact: { ...baseStyles.contact, fontSize: 10 },
    section: { marginBottom: 18 },
    sectionTitle: { fontSize: 10, fontWeight: 'bold' as const, textTransform: 'uppercase' as const, letterSpacing: 2, color: '#999', marginBottom: 8 },
    jobTitle: { fontSize: 10, fontWeight: 'bold' as const },
    company: { fontSize: 10, color: '#666' },
    date: { fontSize: 9, color: '#999', marginBottom: 2 },
    description: { ...baseStyles.description, lineHeight: 1.6 },
    skillsContainer: { flexDirection: 'row', gap: 8 },
    skill: { fontSize: 10, color: '#666' },
  }),
  professional: StyleSheet.create({
    page: { ...baseStyles.page, padding: 30 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    nameSection: {},
    name: { ...baseStyles.name, fontSize: 16 },
    contactSection: { alignItems: 'flex-end' },
    contact: { fontSize: 9, color: '#444' },
    divider: { height: 1, backgroundColor: '#2563eb', marginBottom: 12 },
    twoColumn: { flexDirection: 'row', gap: 20 },
    column: { flex: 1 },
    sectionTitle: { fontSize: 10, fontWeight: 'bold' as const, color: '#2563eb', marginBottom: 6, textTransform: 'uppercase' as const },
    jobTitle: { fontSize: 10, fontWeight: 'bold' as const },
    company: { fontSize: 9, color: '#444' },
    date: { fontSize: 8, color: '#666', marginBottom: 2 },
    description: { fontSize: 8, color: '#555', marginTop: 2 },
    skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
    skill: { fontSize: 8, backgroundColor: '#f3f4f6', padding: '2 6', borderRadius: 2 },
  }),
};

interface ResumePDFProps {
  data: ResumeData;
  template?: TemplateType;
}

export function ResumePDF({ data, template = 'classic' }: ResumePDFProps) {
  const { personalInfo, experiences, education, skills, certifications, languages } = data;
  const s = styles[template];

  if (template === 'modern') {
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={{ flexDirection: 'row', height: '100%' }}>
            <View style={s.sidebar}>
              <Text style={s.name}>{personalInfo.firstName}{' '}{personalInfo.lastName}</Text>
              <View style={{ marginTop: 20 }}>
                <Text style={s.sidebarTitle}>Contacto</Text>
                {personalInfo.email && <Text style={s.sidebarText}>{personalInfo.email}</Text>}
                {personalInfo.phone && <Text style={s.sidebarText}>{personalInfo.phone}</Text>}
                {personalInfo.location && <Text style={s.sidebarText}>{personalInfo.location}</Text>}
              </View>
              {skills.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <Text style={s.sidebarTitle}>Skills</Text>
                  <View style={s.skillsContainer}>
                    {skills.map((skill) => (
                      <Text key={skill.id} style={s.skill}>{skill.name}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
            <View style={s.main}>
              {personalInfo.summary && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ fontSize: 9, color: '#444' }}>{personalInfo.summary}</Text>
                </View>
              )}
              {experiences.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text style={s.sectionTitle}>Experiencia</Text>
                  {experiences.map((exp) => (
                    <View key={exp.id} style={{ marginBottom: 8 }}>
                      <Text style={s.jobTitle}>{exp.position}</Text>
                      <Text style={s.company}>{exp.company} | {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</Text>
                    </View>
                  ))}
                </View>
              )}
              {education.length > 0 && (
                <View>
                  <Text style={s.sectionTitle}>Educación</Text>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 8 }}>
                      <Text style={s.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                      <Text style={s.company}>{edu.institution}</Text>
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

  if (template === 'minimal') {
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={s.header}>
            <Text style={s.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
            <View style={s.contactRow}>
              {personalInfo.email && <Text style={s.contact}>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={s.contact}>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={s.contact}>{personalInfo.location}</Text>}
            </View>
          </View>

          {personalInfo.summary && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Sobre mí</Text>
              <Text style={s.description}>{personalInfo.summary}</Text>
            </View>
          )}

          {experiences.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Experiencia</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={{ marginBottom: 10 }}>
                  <Text style={s.jobTitle}>{exp.position}</Text>
                  <Text style={s.company}>{exp.company} · {exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</Text>
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Educación</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={s.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                  <Text style={s.company}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Habilidades</Text>
              <View style={s.skillsContainer}>
                {skills.map((skill) => (
                  <Text key={skill.id} style={s.skill}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}
        </Page>
      </Document>
    );
  }

  if (template === 'professional') {
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <View style={s.header}>
            <View style={s.nameSection}>
              <Text style={s.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
              <Text style={{ fontSize: 10, color: '#666' }}>{personalInfo.location}</Text>
            </View>
            <View style={s.contactSection}>
              {personalInfo.email && <Text style={s.contact}>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={s.contact}>{personalInfo.phone}</Text>}
            </View>
          </View>
          <View style={s.divider} />

          {personalInfo.summary && (
            <View style={{ marginBottom: 12 }}>
              <Text style={s.sectionTitle}>Resumen</Text>
              <Text style={{ fontSize: 9, color: '#444' }}>{personalInfo.summary}</Text>
            </View>
          )}

          <View style={s.twoColumn}>
            <View style={s.column}>
              {experiences.length > 0 && (
                <View>
                  <Text style={s.sectionTitle}>Experiencia</Text>
                  {experiences.map((exp) => (
                    <View key={exp.id} style={{ marginBottom: 8 }}>
                      <Text style={s.jobTitle}>{exp.position}</Text>
                      <Text style={s.company}>{exp.company}</Text>
                      <Text style={s.date}>{exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={s.column}>
              {education.length > 0 && (
                <View>
                  <Text style={s.sectionTitle}>Educación</Text>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 8 }}>
                      <Text style={s.jobTitle}>{edu.degree}</Text>
                      <Text style={s.company}>{edu.institution}</Text>
                      <Text style={s.date}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                  ))}
                </View>
              )}
              {skills.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={s.sectionTitle}>Skills</Text>
                  <View style={s.skillsContainer}>
                    {skills.map((skill) => (
                      <Text key={skill.id} style={s.skill}>{skill.name}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{personalInfo.firstName} {personalInfo.lastName}</Text>
          <View style={s.contactRow}>
            {personalInfo.email && <Text style={s.contact}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={s.contact}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={s.contact}>{personalInfo.location}</Text>}
          </View>
        </View>

        {personalInfo.summary && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Resumen Profesional</Text>
            <Text style={s.description}>{personalInfo.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Experiencia Laboral</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <Text style={s.jobTitle}>{exp.position}</Text>
                <Text style={s.company}>{exp.company}</Text>
                <Text style={s.date}>{exp.startDate} - {exp.current ? 'Actual' : exp.endDate}</Text>
                {exp.description && <Text style={s.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Educación</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <Text style={s.jobTitle}>{edu.degree} {edu.field && `en ${edu.field}`}</Text>
                <Text style={s.company}>{edu.institution}</Text>
                <Text style={s.date}>{edu.startDate} - {edu.current ? 'Actual' : edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Habilidades</Text>
            <View style={s.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={s.skill}>{skill.name}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}