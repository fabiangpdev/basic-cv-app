'use client';

import { useLoadTestData } from '@/hooks/useLoadTestData';
import { Button } from '@/components/ui/button';

export function TestDataLoader() {
  const { loadTestData, clearData } = useLoadTestData();

  return (
    <div className="flex gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
      <Button size="sm" onClick={loadTestData}>
        Cargar datos de prueba
      </Button>
      <Button size="sm" variant="outline" onClick={clearData}>
        Limpiar datos
      </Button>
    </div>
  );
}