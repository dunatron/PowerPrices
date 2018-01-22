<?php
namespace MyOrg\Controller;
use MyOrg\Model\PowerNode;
use SilverStripe\Admin\ModelAdmin;
class PowerNodeAdmin extends ModelAdmin
{
    private static $managed_models = [
        PowerNode::class,
    ];
    private static $url_segment = 'powernodeapp';
    private static $menu_title = 'Power Node App';
}