import { ResumeData } from '@/types/resume';

// Perfil temporal de prueba — médica. Revertir imports a testData.ts cuando sea necesario.
export const testResumeData: ResumeData = {
  personalInfo: {
    firstName: 'Laura',
    lastName: 'Martínez Solano',
    email: 'laura.martinez@clinicasalud.com',
    phone: '+57 310 456 7890',
    location: 'Bogotá, Colombia',
    linkedin: 'linkedin.com/in/lauramartinezmd',
    summary:
      'Médica general con 7 años de experiencia en atención primaria y urgencias. Especialización en medicina interna con enfoque en pacientes crónicos. Habilidades sólidas en diagnóstico clínico, trabajo bajo presión y comunicación asertiva con pacientes y equipos multidisciplinarios.',
  },
  experiences: [
    {
      id: '1',
      company: 'Clínica San Rafael',
      position: 'Médica Internista',
      startDate: '2021',
      endDate: '',
      current: true,
      description:
        'Atención de pacientes hospitalizados con enfermedades crónicas y agudas. Coordinación con especialistas para planes de tratamiento integrales. Reducción del tiempo de estancia hospitalaria en un 20% mediante protocolos de alta temprana.',
    },
    {
      id: '2',
      company: 'Hospital Universitario de La Samaritana',
      position: 'Médica Residente — Medicina Interna',
      startDate: '2018',
      endDate: '2021',
      current: false,
      description:
        'Rotación por servicios de cardiología, neumología, nefrología y endocrinología. Participación en rondas académicas y presentación de casos clínicos. Atención de urgencias de alta complejidad.',
    },
    {
      id: '3',
      company: 'Centro de Salud El Tintal',
      position: 'Médica General',
      startDate: '2016',
      endDate: '2018',
      current: false,
      description:
        'Consulta de medicina general, control de enfermedades crónicas (hipertensión, diabetes) y atención materno-infantil. Participación en jornadas de vacunación y campañas de salud pública.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Universidad Nacional de Colombia',
      degree: 'Especialización',
      field: 'Medicina Interna',
      startDate: '2018',
      endDate: '2021',
      current: false,
    },
    {
      id: '2',
      institution: 'Universidad del Rosario',
      degree: 'Pregrado',
      field: 'Medicina',
      startDate: '2009',
      endDate: '2016',
      current: false,
      gpa: '4.2/5.0',
    },
  ],
  skills: [
    { id: '1', name: 'Diagnóstico clínico', level: 'expert', category: 'technical' },
    { id: '2', name: 'Medicina de urgencias', level: 'advanced', category: 'technical' },
    { id: '3', name: 'Electrocardiografía', level: 'advanced', category: 'technical' },
    { id: '4', name: 'Historia clínica electrónica (HCE)', level: 'advanced', category: 'tool' },
    { id: '5', name: 'Comunicación con pacientes', level: 'expert', category: 'soft' },
    { id: '6', name: 'Trabajo en equipo', level: 'expert', category: 'soft' },
    { id: '7', name: 'Gestión del tiempo bajo presión', level: 'advanced', category: 'soft' },
    { id: '8', name: 'SPSS (análisis estadístico)', level: 'intermediate', category: 'tool' },
  ],
  certifications: [
    {
      id: '1',
      name: 'ACLS — Advanced Cardiovascular Life Support',
      issuer: 'American Heart Association',
      date: '2023',
    },
    {
      id: '2',
      name: 'BLS — Basic Life Support',
      issuer: 'American Heart Association',
      date: '2023',
    },
    {
      id: '3',
      name: 'Certificado en Farmacovigilancia',
      issuer: 'INVIMA',
      date: '2020',
    },
  ],
  languages: [
    { id: '1', language: 'Español', level: 'native' },
    { id: '2', language: 'Inglés', level: 'advanced' },
    { id: '3', language: 'Portugués', level: 'basic' },
  ],
  projects: [
    {
      id: '1',
      name: 'Protocolo de Control de Diabetes tipo 2',
      description:
        'Diseño e implementación de un protocolo de seguimiento para pacientes diabéticos en atención primaria. Redujo las hospitalizaciones por descompensación en un 30% en 12 meses.',
      technologies: 'Investigación clínica, Excel, SPSS',
      startDate: '2022',
      endDate: '2023',
      current: false,
    },
    {
      id: '2',
      name: 'Campaña de Salud Preventiva — Barrio El Tintal',
      description:
        'Organización de jornadas de tamizaje de hipertensión y diabetes para más de 500 personas. Coordinación con secretaría distrital de salud y trabajo comunitario.',
      technologies: 'Salud pública, trabajo comunitario',
      startDate: '2017',
      endDate: '2017',
      current: false,
    },
  ],
};
