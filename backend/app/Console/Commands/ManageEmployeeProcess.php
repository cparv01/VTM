<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ManageEmployeeProcess extends Command
{
    protected $signature = 'employee:manage {action} {processId?}';
    protected $description = 'Manage employee processes (start, list, kill)';
    protected $tempProcessId = null;

    public function __construct()
    {
        parent::__construct();
        $this->loadTempProcessId();
    }

    protected function loadTempProcessId()
    {
        $filePath = storage_path('app/temp_process_id.txt');
        if (file_exists($filePath)) {
            $this->tempProcessId = file_get_contents($filePath);
        }
    }

    protected function saveTempProcessId($tempProcessId)
    {
        $filePath = storage_path('app/temp_process_id.txt');
        if ($tempProcessId) {
            file_put_contents($filePath, $tempProcessId);
        } else {
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }
    }

    public function handle()
    {
        $action = $this->argument('action');
        $processId = $this->argument('processId');

        switch ($action) {
            case 'start':
                return $this->startProcess();
            case 'list':
                return $this->listProcesses();
            case 'kill':
                if ($processId) {
                    return $this->killProcess($processId);
                } else {
                    $this->error("Please provide a process ID to kill.");
                    return 1;
                }
            default:
                $this->error("Invalid action. Use 'start', 'list', or 'kill'.");
                return 1;
        }
    }

    protected function startProcess()
    {
        $cmd = 'php artisan employee:manage run';

        $processId = null;

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $powershellCommand = "powershell -Command \"Start-Process -FilePath 'php' -ArgumentList 'artisan employee:manage run' -PassThru | Select-Object -ExpandProperty Id\"";
            $processId = trim(shell_exec($powershellCommand));
        } else {
            $process = exec($cmd . " > /dev/null 2>&1 & echo $!", $output);
            if (!empty($output)) {
                $processId = (int)$output[0];
            }
        }

        if ($processId) {
            Log::info('Background process started', ['process_id' => $processId, 'command' => $cmd]);
            $this->tempProcessId = $processId;
            $this->saveTempProcessId($this->tempProcessId);
            $this->info("Background process started with ID: " . $processId);

            // Hold the process for 5 minutes
            sleep(300);
        } else {
            $this->error("Failed to start background process.");
        }

        return 0;
    }

    protected function listProcesses()
    {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $command = "tasklist";
            exec($command, $output);
            $this->info("Running processes:\n" . implode("\n", $output));
        } else {
            $command = "ps -aux";
            exec($command, $output);
            $this->info("Running processes:\n" . implode("\n", $output));
        }

        return 0;
    }

    protected function killProcess($processId)
    {
        $status = 1;
        if ($processId != $this->tempProcessId) {
            $this->error("The provided process ID does not match the stored process ID.");
            return 1;
        }

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $killCommand = "taskkill /PID $processId /F";
        } else {
            $killCommand = "kill -9 $processId";
        }

        exec($killCommand, $output, $status);

        if ($status === 0) {
            $this->info("Process with ID $processId killed successfully.");
            $this->saveTempProcessId(null);
        } else {
            $this->error("Failed to kill process with ID $processId.");
        }
        return $status;
    }
}