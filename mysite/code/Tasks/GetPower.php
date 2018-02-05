<?php
/**
 * Created by PhpStorm.
 * User: Heath
 * Date: 4/04/17
 * Time: 9:32 PM
 */

use SilverStripe\Dev\BuildTask;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\ArrayData;
use SilverStripe\Dev\Debug;
use SilverStripe\Assets\Image;
use GuzzleHttp\Psr7;
use MyOrg\Model\PowerNode;
use MyOrg\Model\NodeData;


class GetPower extends BuildTask
{

    public function run($request)
    {
        $client = new \GuzzleHttp\Client([
            'headers' => ['Ocp-Apim-Subscription-Key' => 'bee9281121354f0f97c948d4445e2c6b'],
        ]);

        $res = $client->request('GET', 'https://emi.azure-api.net/rtp/?'
        );


        echo $res->getStatusCode();

        echo $res->getHeaderLine('content-type');

        $body =  $res->getBody();

        echo $body;

        $decode = json_decode($body);

        foreach ($decode as $r){
            echo '===================';
            echo $r->interval;
            echo $r->interval_datetime;
            echo $r->five_min_period;
            echo $r->isDayLightSavingHR;
            echo $r->pnode;
            echo $r->load;
            echo $r->generation;
            echo $r->price;
            echo '<br/>';


            if (PowerNode::get_by_NodeID(PowerNode::class, $r->pnode) == false) {
                $PowerNode = PowerNode::create();
                $PowerNode->NodeID = $r->pnode;
                $PowerNode->write();
                echo '<p style="color:green;">' . $PowerNode->NodeID . ' created</p>';
            } else {
                //receive and update existing event
                $PowerNode = PowerNode::get_by_NodeID(PowerNode::class, $r->pnode);
                echo '<p style="color:orange;">' . $PowerNode->NodeID . ' updated</p>';

                $nodeData = NodeData::create();

                $nodeData->Interval = $r->interval;
                $nodeData->Interval_datetime = $r->interval_datetime;
                $nodeData->five_min_period = $r->five_min_period;
                $nodeData->isDayLightSavingHR = $r->isDayLightSavingHR;
                $nodeData->PowerNodeID = $PowerNode->ID;
                $nodeData->load = $r->load;
                $nodeData->generation = $r->generation;
                $nodeData->price = $r->price;

                $nodeData->write();


                $PowerNode->write();
            }




            $powerNode = PowerNode::get_by_NodeID(PowerNode::class, $r->pnode);



        }
//
//
//        $powerNode = PowerNode::get_by_NodeID(PowerNode::class, 'ABY0111');
//
//        error_log(var_export($powerNodes, true));




    }

}





