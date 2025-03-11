<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Issues extends Model
{
    use HasFactory;

    protected $table = 'va_issues';
    protected $fillable=[

    'id',
    'client_id',
    'issue_category',
    'assessment_type',
    'user_id',
    'application_name',
    'title',
    'category',
    'ip',
    'dns',
    'net_bios',
    'qid',
    'type',
    'severity',
    'port',
    'protocol',
    'first_discovered',
    'last_observed',
    'cve_id',
    'vendor_reference',
    'threat',
    'solution',
    'exploitability',
    'plugin_output',
    'mac_address',
    'synopsis',
    'risk_factor',
    'cvss_base_score',
    'cvss_temporal_score',
    'vuln_publication_date',
    'patch_publication_date',
    'exploit_ease',
    'exploit_frameworks',
    'agent_id',
    'host_id',
    'initial_closure_date',
    'revised_closure_date',
    'tester_status',
    'requestor_status',
    'issue_team',
    'l1_spoc_name',
    'l1_spoc_email',
    'l2_spoc_name',
    'l2_spoc_email',
    'requestor_remark',
    'tester_remark',
    'technology',
    'cisa_cve_id',
    'artifact',
    'review_comment',
    'asset_category',
    'asset_type',
    'hosting_location',
    'hosting_type',
    'is_date_updated',
    'is_paused',
    'is_deleted',
    'is_repeated',
    'action_owner',
    'raf_expiry_date',
    'issue_submitted',
    'created_at',
    'updated_at',
    'cwe_id',
    'network_zone',
    'data_classification',
    'epss_percentile',
    'asset_criticality'

        // 'issue_category',
        // 'client_id',
        // 'title',
        // 'assessment_type',
        // 'ip',
        // 'category',
        // 'initial_closure_date',
        // 'action_owner',
        // 'tester_status',
        // 'overall_risk_score',
        // 'severity'
    ];


    // protected static function booted()
    // {
    //     $issue = Issues::get();

    //     static::saving(function ($issue) {
    //         dd($issue);
    //         $average = ($issue->asset_criticality + $issue->network_zone + $issue->env_type + $issue->data_classification) / 4;
    //         $exploitability = $average * $issue->severity;

    //         $issue->exploitability = $exploitability;

    //         $issue->save();
    //     });
    // }


}
