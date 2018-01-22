<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class NodeDataResolver implements ResolverInterface
{
    public function resolve($object, $args, $context, $info)
    {
        $comments = $object->NodeData();

//        if (isset($args['price']) && $args['price']) {
//            $comments = $comments->where('DATE(Created) = DATE(NOW())');
//        }

        return $comments;
    }
}