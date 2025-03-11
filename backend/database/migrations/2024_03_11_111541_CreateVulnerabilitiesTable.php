<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVulnerabilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vulnerabilities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('client_id')->unsigned();
            $table->bigInteger('issue_category')->unsigned();
            $table->integer('assessment_type')->unsigned();
            $table->string('user_id', 255);
            $table->string('application_name', 255)->nullable();
            $table->string('title', 255)->nullable();
            $table->smallInteger('category');
            $table->string('ip', 255);
            $table->string('dns', 255)->nullable();
            $table->string('net_bios', 255)->nullable();
            $table->string('qid', 50);
            $table->string('type', 255)->nullable();
            $table->smallInteger('severity');
            $table->string('port', 255)->nullable();
            $table->string('protocol', 255)->nullable();
            $table->date('first_discovered')->nullable();
            $table->date('last_observed')->nullable();
            $table->text('cve_id')->nullable();
            $table->string('vendor_reference', 255)->nullable();
            $table->text('threat');
            $table->text('solution')->nullable();
            $table->text('exploitability')->nullable();
            $table->text('plugin_output')->nullable();
            $table->string('mac_address', 255)->nullable();
            $table->text('synopsis')->nullable();
            $table->string('risk_factor', 255)->nullable();
            $table->string('cvss_base_score', 255)->nullable();
            $table->string('cvss_temporal_score', 255)->nullable();
            $table->date('vuln_publication_date')->nullable();
            $table->date('patch_publication_date')->nullable();
            $table->string('exploit_ease', 255)->nullable();
            $table->string('exploit_frameworks', 255)->nullable();
            $table->string('agent_id', 255)->nullable();
            $table->string('host_id', 255)->nullable();
            $table->date('initial_closure_date')->nullable();
            $table->date('revised_closure_date')->nullable();
            $table->string('tester_status', 255)->nullable();
            $table->string('requestor_status', 50)->nullable();
            $table->string('issue_team', 50)->nullable();
            $table->string('l1_spoc_name', 255)->nullable();
            $table->string('l1_spoc_email', 255)->nullable();
            $table->string('l2_spoc_name', 255)->nullable();
            $table->string('l2_spoc_email', 255)->nullable();
            $table->string('requestor_remark', 255)->nullable();
            $table->string('tester_remark', 255)->nullable();
            $table->string('technology', 255)->nullable();
            $table->string('cisa_cve_id', 100)->nullable();
            $table->text('artifact')->nullable();
            $table->text('review_comment')->nullable();
            $table->string('asset_category', 255)->nullable();
            $table->string('asset_type', 20)->nullable();
            $table->enum('hosting_location', ['On Premise', 'Cloud'])->nullable();
            $table->enum('hosting_type', ['Internal', 'External'])->nullable();
            $table->tinyInteger('is_date_updated')->default(0);
            $table->tinyInteger('is_paused')->default(1);
            $table->tinyInteger('is_deleted')->default(1);
            $table->tinyInteger('is_repeated')->default(0);
            $table->enum('action_owner', ['1', '2', '3', '4', '5', '6'])->nullable();
            $table->date('raf_expiry_date')->nullable();
            $table->tinyInteger('issue_submitted')->default(0);
            $table->timestamps();
            $table->string('cwe_id', 100)->nullable();
            $table->integer('network_zone')->nullable();
            $table->integer('data_classification')->nullable();
            $table->string('epss_percentile', 100)->nullable();
            $table->integer('asset_criticality')->nullable();
            $table->integer('overall_risk_score',11)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vulnerabilities');
    }
}