import { FormEvent } from 'react';
import { InertiaFormProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type HospitalFormData = {
  name: string;
  county: string;
  sub_county: string;
  total_icu_beds: number;
  available_icu_beds: number;
  _method?: string;
};

interface Props {
  form: InertiaFormProps<HospitalFormData>;
  submitLabel: string;
  onSubmit: () => void;
}

export default function HospitalForm({ form, submitLabel, onSubmit }: Props) {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border p-6">
      {(['name', 'county', 'sub_county'] as const).map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{field.replace('_', ' ')}</Label>
          <Input id={field} value={form.data[field]} onChange={(event) => form.setData(field, event.target.value)} />
          {form.errors[field] && <p className="text-sm text-destructive">{form.errors[field]}</p>}
        </div>
      ))}
      {(['total_icu_beds', 'available_icu_beds'] as const).map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>{field.replaceAll('_', ' ')}</Label>
          <Input id={field} type="number" min={0} value={form.data[field]} onChange={(event) => form.setData(field, Number(event.target.value))} />
          {form.errors[field] && <p className="text-sm text-destructive">{form.errors[field]}</p>}
        </div>
      ))}
      <Button type="submit" disabled={form.processing}>{submitLabel}</Button>
    </form>
  );
}
