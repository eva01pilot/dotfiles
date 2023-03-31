<?php
use \Bitrix\Main\Localization\Loc as Loc;
use Bitrix\Main\HttpApplication;
use \Bitrix\Main\Config\Option as Option;
use Bitrix\Main\EventManager;
$request = HttpApplication::getInstance()->getContext()->getRequest();

if($request->isPost()) {
    $dateFrom = $request['dateFrom'];
    $dateTo =  $request['dateTo'];
    
    Option::set('nebo.logger', 'timeFrom', $dateFrom);
    Option::set('nebo.logger', 'timeTo', $dateTo);
    Option::set('nebo.logger', 'isOn', $request['logging']);
    
    $eventManager = \Bitrix\Main\EventManager::getInstance();
    if($request['logging']=='true'){
        $eventManager->registerEventHandler('main', 'OnProlog', 'nebo.logger', 'Nebo\\Logger\\OnPageStart', 'EventHandler');
    } else if($request['logging']=='false'){
        $eventManager->unRegisterEventHandler('main', 'OnProlog', 'nebo.logger', 'Nebo\\Logger\\OnPageStart', 'EventHandler');
    }

    // $eventManager->unRegisterEventHandler('main', 'OnEndBufferContent', $this->MODULE_ID, 'Nebo\\Logger\\OnPageStart', 'EventHandler');
    
}
?>
<form method="POST">
    <div class="timewrapper">
        <div class="timecontainer">
            <label for="dateFrom">
                Выберите время начала логирования
            </label>
            <input id="dateFrom" value=<?=Option::get('nebo.logger', 'timeFrom') ?? '00:00:00'?> type="text" name="dateFrom">
        </div>
        <div class="timecontainer">
            <label for="dateTo">
                Выберите время конца логирования
            </label>
            <input id="dateTo" value=<?
            echo Option::get('nebo.logger', 'timeTo') ?? '01:00:00';
            ?> type="text" name="dateTo">
        </div>
    </div>
    <input id="logOn" style=<?
        if(Option::get('nebo.logger', 'isOn')=='false'){
            echo "display:block; margin-bottom:1rem;";
        } else {
            echo "display:none; margin-bottom:1rem;";
        }
        ?> type="button" value="Включить логирование событий">
    <input id="logOff" style=<?
        if(Option::get('nebo.logger', 'isOn')=='false'){
            echo "display:none; margin-bottom:1rem;";
        } else {
            echo "display:block; margin-bottom:1rem;";
        }
        ?> type="button" value="Выключить логирование событий">

    <input id="logging" style="display:none;" name="logging">
    <input type="submit" name="Update" class="adm-btn-save" value=<?=Loc::getMessage('NEBO_LOGGER_SAVE')?>>

</form>
<script>
document.getElementById('logOn').addEventListener('click',()=>{
    document.getElementById('logging').value = 'true'
    document.getElementById('logOn').style.display = 'none'
    document.getElementById('logOff').style.display = 'block'

})
document.getElementById('logOff').addEventListener('click',()=>{
    document.getElementById('logging').value = 'false'
    document.getElementById('logOff').style.display = 'none'
    document.getElementById('logOn').style.display = 'block'
})
</script>
<style>
    .timewrapper{
        display: flex;
        flex-direction: column;
    }
    .timecontainer{
        display: grid;
        margin-bottom: 1rem;
        grid-template-columns: 10rem 10rem;
        gap: 1rem;
    }
</style>