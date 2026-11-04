<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyNewEmail extends Notification
{
    use Queueable;

    public string $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verification new Email')
            ->line('You requested changing your email address for new one.')
            ->action('To verify new Email', $this->url)
            ->line('In case, you didn`t requested changind an email, ignore this letter.');
    }
}
