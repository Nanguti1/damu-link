<?php

namespace App\Notifications;

use App\Models\DonationClaim;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ClaimExpiresSoonNotification extends Notification
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
            ->subject('Donation Claim Expiring Soon')
            ->line('Your donation claim is expiring soon.')
            ->line('Please arrive at the donation center to complete your donation.')
            ->line("Expires at: {$this->claim->expires_at->format('Y-m-d H:i')}")
            ->action('View Claim', url('/donation-claims/' . $this->claim->id))
            ->line('Thank you for using DamuLink!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'claim_id' => $this->claim->id,
            'expires_at' => $this->claim->expires_at,
            'blood_appeal_id' => $this->claim->blood_appeal_id,
        ];
    }
}
