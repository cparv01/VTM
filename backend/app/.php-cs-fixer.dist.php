<?php

$finder = PhpCsFixer\Finder::create()
    ->in([__DIR__ . '/vendor'])
    ->name('*.php');

return (new PhpCsFixer\Config())
    ->setFinder($finder)
    ->setRules([
        'nullable_type_declaration_for_default_null_value' => true,
    ]);
