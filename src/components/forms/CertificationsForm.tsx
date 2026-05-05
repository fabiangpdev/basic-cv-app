'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Certification } from '@/types/resume';

export function CertificationsForm() {
  const { resumeData, setResumeData } = useResumeStore();

  const addCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    setResumeData({
      certifications: [...resumeData.certifications, newCert],
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData({
      certifications: resumeData.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    setResumeData({
      certifications: resumeData.certifications.filter((cert) => cert.id !== id),
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Certificaciones</CardTitle>
        <Button onClick={addCertification} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.certifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay certificaciones agregadas</p>
        ) : (
          resumeData.certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <Label>Nombre</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Solutions Architect"
                  />
                </div>
                <div>
                  <Label>Emisor</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <Label>Fecha</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-500 hover:text-red-700 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}