<?php
namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\Type;
use SilverStripe\Assets\Image;
use SilverStripe\ORM\FieldType\DBDecimal;
use SilverStripe\ORM\FieldType\DBDatetime;
use SilverStripe\Security\Member;
use MyOrg\Model\PowerNode;


class NodeData extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'Interval' => 'Varchar(255)',
        'Interval_datetime' => 'DBDatetime',
        'five_min_period' => 'Varchar(255)',
        'isDayLightSavingHR' => 'Boolean',
        'load' => 'Decimal',
        'generation' => 'Decimal',
        'price' => 'Decimal',
    ];

    private static $has_one = [
        'PowerNode' => PowerNode::class,
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('NodeDataByDate', __CLASS__)
            ->addArgs([
                'Interval_datetime' => 'String!',
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $powerNode = self::get()->filter([
                    'Interval_datetime:GreaterThan' => $args['Interval_datetime']
                ]);
                if (!$powerNode) {
                    throw new \InvalidArgumentException(sprintf(
                        'Data Nodes #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'Interval_datetime' => $powerNode->Interval_datetime
                ];
                return $powerNode;
            })->setUsePagination(false);
        return $scaffolder;
    }
}