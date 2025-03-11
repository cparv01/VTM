<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyCustomMail;
use App\Mail\ErrorNotificationMail;
use App\Models\Notification;

class SendEmails extends Command
{
    protected $signature = 'email:send';
    protected $description = 'Send scheduled emails';

    public function handle()
    {
        try {
     
            $simulateError = random_int(1, 2) === 2;
            if ($simulateError) {
                throw new \Exception('Simulated email sending error for testing purposes.');
            }

            Mail::to('parvc01@gmail.com')->send(new MyCustomMail());
            $this->info('Scheduled email sent successfully.');

            Notification::create([
                'message' => 'Scheduled email sent successfully.',
                'status' => '1',
            ]);

        } catch (\Exception $e) {
            $this->error('Failed to send scheduled email: ' . $e->getMessage());

            Notification::create([
                'message' => 'Failed to send scheduled email: ' . $e->getMessage(),
                'status' => '0',
            ]);

            try {
                
                Mail::to('parvc01@gmail.com')->send(new ErrorNotificationMail());
                $this->info('Error notification sent successfully.');

                Notification::create([
                    'message' => 'Error notification sent successfully.',
                    'status' => '1',
                ]);

            } catch (\Exception $e) {
                $this->error('Failed to send error notification: '. $e->getMessage());

                Notification::create([
                    'message' => 'Failed to send error notification: ' . $e->getMessage(),
                    'status' => '0',
                ]);
            }
        }
    }
}