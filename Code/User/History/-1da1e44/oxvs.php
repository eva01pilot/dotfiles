<?php
namespace Nebo\ClientData\Modules\Blacklist;
define("NOT_CHECK_PERMISSIONS", true);
\Bitrix\Main\Loader::includeModule('crm');
use CCrmDeal;
use CCrmContact;
use \Bitrix\Crm\Binding\DealContactTable as DealContactTable;
class BlackList{
    protected string $phoneNumber;
    protected string $fullname;
    public function __construct($params){
        $this->phoneNumber = $params['phone_number'] ?? '';
    }
    public function get(){
        $arFilter = [
            'ENTITY_ID'  => 'CONTACT',
            'TYPE_ID'    => 'PHONE',
            'VALUE' => $this->phoneNumber
        ];
        $contactID = \CCrmFieldMulti::GetListEx([],$arFilter,false,false,['ELEMENT_ID'])->Fetch()['ELEMENT_ID'];
        if(!$contactID){
            return [
                'result'=> [
                    'NAME' => 'Мастер не найден'
                    ]
                ];
            }
            $dealBinded = DealContactTable::getContactDealIDs($contactID);

            foreach ($dealBinded as $deal) {
                //var_dump($deal);
                $arFilter = [
                    'STAGE_ID'=>'C6:4',
                    'ID' => $deal,
                    'CHECK_PERMISSIONS'=>'N'
                ];
                $arSelect = [
                    'STAGE_ID', 'CONTACT_FULL_NAME'
                ];
                $dealRes = \CCrmDeal::GetListEx([], $arFilter, false, false, $arSelect)->Fetch();
                if($dealRes['ID']) return [
                    'result' => [
                        'NAME' => $dealRes['CONTACT_FULL_NAME'],
                        'PHONE' => $this->phoneNumber
                        ]
                    ];
                }
        return [
            'result'=> [
                'NAME' => 'Мастер не найден'
            ]
        ];
    }
}