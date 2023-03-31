<?php

// namespace \Nebo\Modules\LOGGER;

\Bitrix\Main\Loader::includeModule('crm');

use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;
use Bitrix\Main\EventManager;
use Bitrix\Main\Application;
use Bitrix\Main\IO\Directory;

Loc::loadMessages(__FILE__);

class nebo_logger extends CModule {

    public function __construct() {
        if (is_file(__DIR__.'/version.php')) {
            include_once(__DIR__.'/version.php');
            $this->MODULE_ID           = 'nebo.logger';
            $this->MODULE_VERSION      = $arModuleVersion['VERSION'];
            $this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
            $this->MODULE_NAME         = 'Nebo Logger';
            $this->MODULE_DESCRIPTION  = Loc::getMessage('NEBO_LOGGER_DESCRIPTION');
        } else {
            CAdminMessage::showMessage(
                Loc::getMessage('NEBO_LOGGER_FILE_NOT_FOUND').' version.php'
            );
        }
    }

    public function doInstall() {

        global $APPLICATION;

        // мы используем функционал нового ядра D7 — поддерживает ли его система?
        if (CheckVersion(ModuleManager::getVersion('main'), '14.00.00')) {
            // регистрируем модуль в системе
            ModuleManager::registerModule($this->MODULE_ID);
            // регистрируем обработчики событий
            $eventManager = \Bitrix\Main\EventManager::getInstance();
            $eventManager->registerEventHandler('main', 'OnProlog', $this->MODULE_ID, 'Nebo\\Logger\\OnPageStart', 'EventHandler');
            Option::set('nebo.logger', 'isOn', 'true');


        } else {
            CAdminMessage::showMessage(
                Loc::getMessage('NEBO_LOGGER_INSTALL_ERROR')
            );
            return;
        }

        $APPLICATION->includeAdminFile(
            Loc::getMessage('NEBO_LOGGER_INSTALL_TITLE').' «'.Loc::getMessage('NEBO_LOGGER_NAME').'»',
            __DIR__.'/step.php'
        );
    }

    public function doUninstall() {
        global $APPLICATION;
        
        ModuleManager::unRegisterModule($this->MODULE_ID);
        $eventManager = \Bitrix\Main\EventManager::getInstance();
        $eventManager->unRegisterEventHandler('main', 'OnProlog', $this->MODULE_ID, 'Nebo\\Logger\\OnPageStart', 'EventHandler');
        Option::set('nebo.logger', 'isOn', 'false');
        // $eventManager->unRegisterEventHandler('main', 'OnEndBufferContent', $this->MODULE_ID, 'Nebo\\Logger\\OnPageStart', 'EventHandler');
        $APPLICATION->includeAdminFile(
            Loc::getMessage('NEBO_LOGGER_UNINSTALL_TITLE').' «'.Loc::getMessage('NEBO_LOGGER_NAME').'»',
            __DIR__.'/unstep.php'
        );

    }
    
}