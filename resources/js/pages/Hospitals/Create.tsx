import { Link, useForm } from '@inertiajs/react';
import HospitalForm, { HospitalFormData } from './Partials/HospitalForm';

export default function CreateHospital() {
  const form = useForm<HospitalFormData>({ name: '', county: '', sub_county: '', total_icu_beds: 0, available_icu_beds: 0 });

  return (
    <div className="max-w-2xl space-y-6 p-6">
      <Link href="/hospitals" className="text-sm text-rose-600">Back to hospitals</Link>
      <h1 className="text-2xl font-bold">Add Hospital</h1>
      <HospitalForm form={form} onSubmit={() => form.post('/hospitals')} submitLabel="Create hospital" />
    </div>
  );
}
