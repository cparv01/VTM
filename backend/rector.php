use Rector\Config\RectorConfig;
use Rector\Php84\Rector\Param\ExplicitNullableParamTypeRector;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->paths([
        __DIR__ . '/app'
    ]);
    $rectorConfig->phpVersion(Rector\ValueObject\PhpVersion::PHP_84);
    $rectorConfig->rules([
        ExplicitNullableParamTypeRector::class,
    ]);
};
