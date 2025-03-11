<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CreateEmployeeAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:employee {action=start} {processId?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create new employee account and manage processes';

    /**
     * Temporary variable to store the process ID.
     *
     * @var int|null
     */
    protected $tempProcessId = null;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->loadTempProcessId();
    }

    /**
     * Load the temp process ID from a temporary storage (e.g., file).
     *
     * @return void
     */
    protected function loadTempProcessId()
    {
        $filePath = storage_path('app/temp_process_id.txt');
        if (file_exists($filePath)) {
            $this->tempProcessId = file_get_contents($filePath);
        }
    }

    /**
     * Save the temp process ID to a temporary storage (e.g., file).
     *
     * @return void
     */
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

    /**
     * Execute the console command.
     *
     * @return int
     */
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

    /**
     * Start a background process.
     *
     * @return int
     */
    protected function startProcess()
    {
        $cmd = 'php artisan create:employee run';

        // Initialize the process variable
        $processId = null;

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $powershellCommand = "powershell -Command \"Start-Process -FilePath 'php' -ArgumentList 'artisan create:employee run' -PassThru | Select-Object -ExpandProperty Id\"";
            $processId = trim(shell_exec($powershellCommand));
        } else {
            // Unix-based systems
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
            $this->runProcess($processId);
        } else {
            $this->error("Failed to start background process.");
        }

        return 0;
    }

    /**
     * Run the actual process.
     *
     * @param int $processId
     * @return int
     */
    public function runProcess($processId)
    {
        Log::info('Process started');

        $endTime = time() + 180; // Set the end time to 3 minutes from now

        while (time() < $endTime) {
            if ($this->isProcessRunning($processId)) {
                $this->info("Process with ID $processId has ended.");
                break;
            } else {
                $this->info("Process with ID $processId is still running...");
            }
            sleep(2); // Sleep for 2 seconds
        }

        Log::info('Process ended');

        return 0;
    }

    /**
     * Check if a process is running.
     *
     * @param int $processId
     * @return bool
     */
    protected function isProcessRunning($processId)
    {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $tasklistCommand = "tasklist /FI \"PID eq $processId\" 2>NUL";
            exec($tasklistCommand, $output, $status);
            return $status === 0 && count($output) > 1;
        } else {
            // Unix-based systems
            $psCommand = "ps -p $processId -o pid=";
            exec($psCommand, $output, $status);
            return $status === 0 && !empty($output);
        }
    }

    /**
     * List running processes.
     *
     * @return int
     */
    protected function listProcesses()
    {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $command = "tasklist";
            exec($command, $output);
            $this->info("Running processes:\n" . implode("\n", $output));
        } else {
            // Unix-based systems
            $command = "ps -aux";
            exec($command, $output);
            $this->info("Running processes:\n" . implode("\n", $output));
        }

        return 0;
    }

    /**
     * Kill a background process.
     *
     * @param int $processId
     * @return int
     */
    protected function killProcess($processId)
    {
        $status = 1;
        // if ($processId != $this->tempProcessId) {
        //     $this->error("The provided process ID does not match the stored process ID.");
        //     return 1;
        // }

        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Windows
            $killCommand = "taskkill /PID $processId /F";
        } else {
            // Unix-based systems
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
