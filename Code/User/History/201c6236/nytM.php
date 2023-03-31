<?php

namespace Nebo\Logger;
ini_set('display_errors',0);
\Bitrix\Main\Loader::includeModule('nebo.telegram');

use \Bitrix\Main\Loader;
use \Nebo\Telegram\Helpers\Event;
use \Nebo\Telegram\Helpers\Helper;
use \Nebo\Telegram\Bot;

class OnPageStart {

    public function EventHandler($content = null) {
        if (!strpos($_SERVER['REQUEST_URI'], 'upload/')) {
            global $USER, $DB;
            if ($_SERVER['REQUEST_URI'] != null) {
                $res = \CEventLog::Add(
                    array(
                        'SEVERITY' => 'SECURITY',
                        'AUDIT_TYPE_ID' => 'NEBO_LOG',
                        'MODULE_ID' => 'main',
                        'ITEM_ID' => $USER->GetID(),
                        'DESCRIPTION' => json_encode([
                            'request_auth' => [
                                'auth' => $_REQUEST['auth'],
                                'access_token' => $_REQUEST['access_token'],
                            ],
                            'headers' => apache_request_headers()
                        ], JSON_UNESCAPED_UNICODE),
                    )
                );
            }
        }
        return true;
    }

}

?>
