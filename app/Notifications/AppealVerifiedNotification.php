<?php

namespace App\Notifications;

use App\Models\BloodAppeal;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppealVerifiedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public BloodAppeal $appeal
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Blood Appeal Verified')
            ->line("Your blood appeal for {$this->appeal->patient_initials} has been verified.")
            ->line("Blood Type: {$this->appeal->blood_type}")
            ->line("Pints Required: {$this->appeal->pints_required}")
            ->action('View Appeal', url('/blood-appeals/' . $this->appeal->id))
            ->line('Thank you for using DamuLink!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'appeal_id' => $this->appeal->id,
            'patient_initials' => $this->appeal->patient_initials,
            'blood_type' => $this->appeal->blood_type,
            'pints_required' => $this->appeal->pints_required,
        ];
    }
}
