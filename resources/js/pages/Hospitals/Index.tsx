import { Link, router, useForm } from '@inertiajs/react';
import HospitalCard from '@/components/Hospital/HospitalCard';
import { Hospital } from '@/types';
import { Button } from '@/components/ui/button';

interface Props { hospitals: Hospital[] }

export default function HospitalsIndex({ hospitals }: Props) {
  const { patch, processing, setData } = useForm({ increment: 1 });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hospitals</h1>
          <p className="text-muted-foreground">Manage facilities and ICU availability.</p>
        </div>
        <Button asChild><Link href="/hospitals/create">Add hospital</Link></Button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="space-y-3">
            <HospitalCard hospital={hospital} />
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary"><Link href={`/hospitals/${hospital.id}/edit`}>Edit</Link></Button>
              <Button disabled={processing} variant="secondary" onClick={() => { setData('increment', 1); patch(`/hospitals/${hospital.id}/beds/increment`); }}>+1 bed</Button>
              <Button disabled={processing} variant="secondary" onClick={() => { setData('increment', 1); patch(`/hospitals/${hospital.id}/beds/decrement`); }}>-1 bed</Button>
              <Button variant="destructive" onClick={() => router.delete(`/hospitals/${hospital.id}`)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
