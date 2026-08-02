<?php

namespace App\Notifications;

use App\Models\DonationClaim;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DonationCompletedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public DonationClaim $claim
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Donation Completed')
            ->line('Thank you for completing your blood donation.')
            ->line('Your contribution helps save lives.')
            ->action('View Claim', url('/donation-claims/' . $this->claim->id))
            ->line('Thank you for using DamuLink!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'claim_id' => $this->claim->id,
            'blood_appeal_id' => $this->claim->blood_appeal_id,
            'completed_at' => $this->claim->updated_at,
        ];
    }
}
