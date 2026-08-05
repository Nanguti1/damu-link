import { Link, useForm } from '@inertiajs/react';
import { Hospital } from '@/types';
import HospitalForm, { HospitalFormData } from './Partials/HospitalForm';

interface Props { hospital: Hospital }

export default function EditHospital({ hospital }: Props) {
  const form = useForm<HospitalFormData>({
    name: hospital.name,
    county: hospital.county,
    sub_county: hospital.sub_county,
    total_icu_beds: hospital.total_icu_beds,
    available_icu_beds: hospital.available_icu_beds,
    _method: 'put',
  });

  return (
    <div className="max-w-2xl space-y-6 p-6">
      <Link href="/hospitals" className="text-sm text-rose-600">Back to hospitals</Link>
      <h1 className="text-2xl font-bold">Edit Hospital</h1>
      <HospitalForm form={form} onSubmit={() => form.post(`/hospitals/${hospital.id}`)} submitLabel="Save hospital" />
    </div>
  );
}
