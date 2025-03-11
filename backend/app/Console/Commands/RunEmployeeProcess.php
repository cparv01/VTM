<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RunEmployeeProcess extends Command
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
        $cmd = 'employee:manage run';
        // $cmd = 'ollama run llama3';

        $processId = null;

        if (substr(php_uname(), 0, 7) == "Windows") {
            $process = popen("start /B " . $cmd, "r");
            if ($process) {
                $processId = getmypid();
                pclose($process);
            }
        } else {
            $process = exec($cmd . " > /dev/null & echo $!", $output);
            if (!empty($output)) {
                $processId = (int)$output[0];
            }
        }


        // if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        //     $powershellCommand = "powershell -Command \"Start-Process -FilePath 'php' -ArgumentList 'artisan employee:manage run' -PassThru | Select-Object -ExpandProperty Id\"";
        //     $processId = trim(shell_exec($powershellCommand));
        // } else {

        //     $process = popen($cmd . " > /dev/null 2>&1 & echo $!", "r");
        //     $processId = (int)fgets($process);
        //     pclose($process);
        // }

        // if (substr(php_uname(), 0, 7) == "Windows") {
        //     pclose(popen("start /B " . $cmd, "r"));
        // } else {
        //     $process = popen($cmd . " > /dev/null 2>&1 & echo $!", "r");
        //     $processId = (int)fgets($process);
        //     pclose($process);
        // }


        if ($processId) {
            Log::info('Background process started', ['process_id' => $processId, 'command' => $cmd]);
            $this->tempProcessId = $processId;
            $this->saveTempProcessId($this->tempProcessId);
            $this->info("Background process started with ID: " . $processId);

            // $endTime = time() + 300; // 300 seconds = 5 minutes
            // while (time() < $endTime) {
            //     for ($i = 1; $i < 4; $i++) {
            //         $result = sqrt($i);
            //         // print_r("hi");
            //     }
            // }

            $this->runProcess($processId);
            // $this->info("Process completed after 5 minutes.");
        } else {
            $this->error("Failed to start background process.");
        }

        return 0;
    }

    public function runProcess($processId)
    {
        Log::info('Process started');

        $endTime = time() + 180; // Set the end time to 3 minutes from now

        while (time() < $endTime) {
            if (!$this->isProcessRunning($processId)) {
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


    protected function listProcesses()
    {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $command = "tasklist";
            exec($command, $output);
            $this->info("Running processes:\n" . implode("\n", $output));

            // $tasklistCommand = "tasklist /FI \"PID eq $tempProcessId\" 2>NUL";
            // if($tasklistCommand){
            //     $this->info("Your processes is Running..");
            // }else{
            //     $this->info("Your processes is Not Running..");
            // }
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
