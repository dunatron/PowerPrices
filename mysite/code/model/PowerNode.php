<?php
namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;
use MyOrg\Model\NodeData;

class PowerNode extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'NodeID'=> 'Varchar(50)',
        'BgColor' => 'TractorCow\Colorpicker\Color'
    ];

    private static $has_many = [
        'NodeData' => NodeData::class,
    ];

    private static $default_sort = 'Created ASC';

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
            ->type(PowerNode::class)
            ->addAllFields()
            ->nestedQuery('NodeData')
            ->addArgs([
                'BeforeDate' => 'String!',
                'AfterDate' => 'String!'
            ])
            ->setResolver(function($obj, $args, $context) {
                $data = $obj->NodeData();

                if (isset($args['BeforeDate']) && $args['BeforeDate']) {
                    $data = $obj->NodeData()->filter([
                        'Interval_datetime:LessThan' => $args['BeforeDate'],
                        'Interval_datetime:GreaterThan' => $args['AfterDate'],
                    ]);
                }

                return $data;
            })
            ->end();
        return $scaffolder;
    }

    public static function get_by_NodeID($callerClass, $id, $cache = true) {
        // Check filter column
        if(is_subclass_of($callerClass, DataObject::class)) {
            $baseClass = DataObject::getSchema()->baseDataClass($callerClass);
            $column = "\"$baseClass\".\"NodeID\"";
        } else{
            // This simpler code will be used by non-DataObject classes that implement DataObjectInterface
            $column = '"NodeID"';
        }
        $column = '"NodeID"';
        // Relegate to get_one
        return DataObject::get_one($callerClass, array($column => $id), $cache);
    }
}